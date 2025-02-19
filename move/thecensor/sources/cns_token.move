module thecensor::cns_token;

use sui::coin::{Self, TreasuryCap};

public struct CNS_TOKEN has drop {}

fun init(witness: CNS_TOKEN, ctx: &mut TxContext) {
    let (treasury, metadata) = coin::create_currency(
        witness,
        6,
        b"CNS_TOKEN",
        b"",
        b"",
        option::none(),
        ctx,
    );
    transfer::public_freeze_object(metadata);
    transfer::public_transfer(treasury, ctx.sender())
}

public fun mint(
    treasury_cap: &mut TreasuryCap<CNS_TOKEN>,
    amount: u64,
    recipient: address,
    ctx: &mut TxContext,
) {
    let coin = coin::mint(treasury_cap, amount, ctx);
    transfer::public_transfer(coin, recipient)
}