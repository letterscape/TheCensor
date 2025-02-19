module thecensor::censor_tests;

use thecensor::{Self, censor}

use sui::{
  test_scenario as ts
  random::{Self, update_randomness_state_for_testing, Random},
};


#[test_only]
public fun test_register() {
  let initial_owner = @0xCAFE;
  let mut scenario = ts::begin(initial_owner);
  
    thecensor::censor::init_contents(scenario.ctx());
    let mut contents = scenario.take_shared<thecensor::censor::Contents>();
    thecensor::censor::register(b"coin", @0x1, b"coin.xyz", b"mirror", b"mirror.xyz", &mut contents, scenario.ctx());
    let contentVector = thecensor::censor::censor_page(&mut contents);
    assert!(contentVector.length() > 0, 1);
    scenario.return_to_sender(contents);
  
  scenario.end();
}

#[test_only]
public fun test_vote_checker_rule() {
  let user1 = @0x0;
  let user2 = @0x1;
  let mut ts = ts::begin(user1);
  random::create_for_testing(ts.ctx());
  ts.next_tx(user1);
  let mut random_state: Random = ts.take_shared();
  random_state.update_randomness_state_for_testing(
    0,
    x"1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F",
    ts.ctx(),
  );
  censor::get_vote_rule(&random_state, ts.ctx())
}