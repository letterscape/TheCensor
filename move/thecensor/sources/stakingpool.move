module thecensor::stakingpool;

use sui::coin::{Self, Coin, TreasuryCap};
use sui::sui::SUI;

use thecensor::st_nft;
use thecensor::cns_token::{Self, CNS_TOKEN};

const NOT_CLAIM: u8 = 0;
const CLAIM: u8 = 1;

public struct Stakingpool has key, store {
  id: UID,
  coin: Coin<SUI>,
  status: u8, // 0 can't claim, 1 can claim
}

public fun create_stakingpool(ctx: &mut TxContext): Stakingpool {
  Stakingpool {
    id: object::new(ctx),
    coin: coin::zero(ctx),
    status: NOT_CLAIM,
  }
}

public fun stake(self: &mut Stakingpool, coin: Coin<SUI>, ctx: &mut TxContext) {
  st_nft::mint_to_sender(b"stNFT", b"TheCensor Stake NFT", b"https://the-censor.vercel.app", object::uid_to_inner(&self.id), (&coin).value(), ctx);
  self.coin.join(coin);
}

public fun claim_page(_: &mut TxContext) {

}

public fun claim(treasury_cap: &mut TreasuryCap<CNS_TOKEN>, pool: &mut Stakingpool, ctx: &mut TxContext, amount: u64) {
  assert!(pool.status == CLAIM, 0);
  let coin = get_coin(pool).split(amount, ctx);
  transfer::public_transfer(coin, ctx.sender());
  // token reward
  cns_token::mint(treasury_cap, 10, ctx.sender(), ctx);
}

public fun set_claim_status(pool: &mut Stakingpool, status: u8) {
  pool.status = status;
}

public fun get_coin(pool: &mut Stakingpool): &mut Coin<SUI> {
  &mut pool.coin
}