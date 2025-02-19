module thecensor::censor;

use std::string::{Self, String, utf8};
use sui::coin::Coin;
use sui::sui::SUI;
use thecensor::stakingpool;
use sui::clock::{Self, Clock};
use sui::random::{Random, new_generator};

const GUARANTEE_STAKINGPOOL: u8 = 1;
const CHALLENGE_STAKINGPOOL: u8 = 2;

const GUARANTOR_COUNTER: u8 = 1;
const CHALLENGER_COUNTER: u8 = 2;
const VOTER_APPROVE_COUNTER: u8 = 3;
const VOTER_DISAPPROVE_COUNTER: u8 = 3;

// censor process status
const GUARANTEEING: u8 = 1;
const CHALLENGING: u8 = 2;
const VOTING: u8 = 3;
const CLOSED: u8 = 4;
const FINISHED: u8 = 5;

// censor result status
const DISAPPROVED: u8 = 0;
const APPROVED: u8 = 1;

const RULE_LENGTH: u64 = 1;


public struct Configuration has key, store {
  id: UID,
  project_name: string::String,
  project_homepage: string::String,
  guarantee_deadline: u64,
  guarantor_number_total: u64,
  guarantee_staking_total: u64,
  challenge_deadline: u64,
  challenge_number_total: u64,
  challenge_staking_total: u64,
  vote_deadline: u64,
  minimum_vote_number: u64,
  forfeit_rate: u64,
}

public struct Content has key, store {
  id: UID,
  title: vector<u8>,
  creator: address,
  url: vector<u8>,
  project_name: vector<u8>,
  project_homepage: vector<u8>,
  guarantee_stakingpool: stakingpool::Stakingpool,
  challenge_stakingpool: stakingpool::Stakingpool,
  guarantor_counter: u64,
  challenger_counter: u64,
  voter_approve_counter: u64,
  voter_disapprove_counter: u64,
  vote_check_rule: vector<u8>,
  vote_deadline: u64,
  process_status: u8,
  result_status: u8,
}

public struct Contents has key, store {
  id: UID,
  data: vector<Content>,
}

public fun init_contents(ctx: &mut TxContext) {
  transfer::share_object(Contents {
    id: object::new(ctx),
    data: vector::empty<Content>()
  })
}

public fun submit_config(
  project_name: vector<u8>,
  project_homepage: vector<u8>,
  guarantee_deadline: u64,
  guarantor_number_total: u64,
  guarantee_staking_total: u64,
  challenge_deadline: u64,
  challenge_number_total: u64,
  challenge_staking_total: u64,
  vote_deadline: u64,
  minimum_vote_number: u64,
  forfeit_rate: u64,
  ctx: &mut TxContext
) {
  transfer::share_object(Configuration {
    id: object::new(ctx),
    project_name: string::utf8(project_name),
    project_homepage: string::utf8(project_homepage),
    guarantee_deadline: guarantee_deadline,
    guarantor_number_total: guarantor_number_total,
    guarantee_staking_total: guarantee_staking_total,
    challenge_deadline: challenge_deadline,
    challenge_number_total: challenge_number_total,
    challenge_staking_total: challenge_staking_total,
    vote_deadline: vote_deadline,
    minimum_vote_number: minimum_vote_number,
    forfeit_rate: forfeit_rate,
  })
}

public fun register(
  clock: &Clock,
  config: &Configuration, 
  title: vector<u8>, 
  creator: address,
  url: vector<u8>,
  project_name: vector<u8>,
  project_homepage: vector<u8>,
  _contents: &mut Contents,
  ctx: &mut TxContext
) {
  let content = Content {
    id: object::new(ctx),
    title: title,
    creator: creator,
    url: url,
    project_name: project_name,
    project_homepage: project_homepage,
    guarantee_stakingpool: stakingpool::create_stakingpool(ctx),
    challenge_stakingpool: stakingpool::create_stakingpool(ctx),
    guarantor_counter: 0,
    challenger_counter: 0,
    voter_approve_counter: 0,
    voter_disapprove_counter: 0,
    vote_check_rule: b"",
    vote_deadline: get_current_timestamp(clock) + config.vote_deadline * 3600 * 1000,
    process_status: GUARANTEEING,
    result_status: 0,
  };
  vector::push_back(&mut _contents.data, content);
}

public fun censor_page(self: &Contents): &vector<Content> {
  &self.data
}

public fun guarantee_stake(config: &Configuration, content: &mut Content, coin: Coin<SUI>, ctx: &mut TxContext) {
  get_stakingpool(content, GUARANTEE_STAKINGPOOL).stake(coin, ctx);
  increment_counter(content, GUARANTOR_COUNTER);
  // process condition check
  if (content.guarantor_counter >= config.guarantor_number_total) {
    content.process_status = CHALLENGING;
  }
}

public fun challenge_stake(config: &Configuration, content: &mut Content, coin: Coin<SUI>, ctx: &mut TxContext) {
  get_stakingpool(content, CHALLENGE_STAKINGPOOL).stake(coin, ctx);
  increment_counter(content, CHALLENGER_COUNTER);
  // process condition check
  if (content.challenger_counter >= config.challenge_number_total) {
    content.process_status = VOTING;
  }
}

public fun vote(config: &Configuration, content: &mut Content, isApproval: bool, _: &mut TxContext) {
  if (isApproval) {
    increment_counter(content, VOTER_APPROVE_COUNTER);
  } else {
    increment_counter(content, VOTER_DISAPPROVE_COUNTER);
  };

  vote_count(config, content);
  
  get_stakingpool(content, GUARANTEE_STAKINGPOOL).set_claim_status(1);
  get_stakingpool(content, CHALLENGE_STAKINGPOOL).set_claim_status(1);
}

public fun get_stakingpool(content: &mut Content, pool_type: u8): &mut stakingpool::Stakingpool {
  if (pool_type == GUARANTEE_STAKINGPOOL) {
    &mut content.guarantee_stakingpool
  } else {
    &mut content.challenge_stakingpool
  }
}

fun increment_counter(content: &mut Content, counter_type: u8) {
  if (counter_type == GUARANTOR_COUNTER) {
    content.guarantor_counter = content.guarantor_counter + 1;
  } else if (counter_type == CHALLENGER_COUNTER) {
    content.challenger_counter = content.challenger_counter + 1;
  } else if (counter_type == VOTER_APPROVE_COUNTER) {
    content.voter_approve_counter = content.voter_approve_counter + 1;
  } else if (counter_type == VOTER_DISAPPROVE_COUNTER) {
    content.voter_disapprove_counter = content.voter_disapprove_counter + 1;
  }
}

public fun vote_count(config: &Configuration, content: &mut Content) {
  if (config.vote_deadline >= content.vote_deadline) {
    if (content.voter_approve_counter > content.voter_disapprove_counter) {
      content.process_status = FINISHED;
      content.result_status = APPROVED;
    } else if (content.voter_approve_counter < content.voter_disapprove_counter) {
      content.process_status = FINISHED;
      content.result_status = DISAPPROVED;
    } else {
      content.process_status = CLOSED;
      content.result_status = DISAPPROVED;
    }
  }
}

// todo generate vote rule
public fun get_vote_rule(random: &Random, ctx: &mut TxContext): string::String {
  let mut generator = random.new_generator(ctx);
  // while (i <= RULE_LENGTH) {
    // i = i + 1;
    let cursor = generator.generate_u64_in_range(0, rule_table().length());
    rule_table()[cursor]
  // }
}

public fun get_current_timestamp(clock: &Clock): u64 {
  clock::timestamp_ms(clock)
}

public fun rule_table(): vector<String> {
  vector<String>[utf8(b"a"), utf8(b"b"), utf8(b"c")]
}