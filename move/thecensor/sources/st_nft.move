module thecensor::st_nft;

use std::string;
use sui::{event, url::{Self, Url}};

public struct ST_NFT has key, store {
    id: UID,
    name: string::String,
    description: string::String,
    url: Url,
    stakingpool_id: ID,
    stake_amount: u64,
}

public struct NFTMinted has copy, drop {
    object_id: ID,
    creator: address,
    name: string::String,
}

public fun name(nft: &ST_NFT): &string::String {
    &nft.name
}

public fun description(nft: &ST_NFT): &string::String {
    &nft.description
}

public fun url(nft: &ST_NFT): &Url {
    &nft.url
}

#[allow(lint(self_transfer))]
public fun mint_to_sender(
    name: vector<u8>,
    description: vector<u8>,
    url: vector<u8>,
    stakingpool_id: ID,
    stake_amount: u64,
    ctx: &mut TxContext,
) {
    let sender = ctx.sender();
    let nft = ST_NFT {
        id: object::new(ctx),
        name: string::utf8(name),
        description: string::utf8(description),
        url: url::new_unsafe_from_bytes(url),
        stakingpool_id: stakingpool_id,
        stake_amount: stake_amount,
    };

    event::emit(NFTMinted {
        object_id: object::id(&nft),
        creator: sender,
        name: nft.name,
    });

    transfer::public_transfer(nft, sender);
}

public fun transfer(nft: ST_NFT, recipient: address, _: &mut TxContext) {
    transfer::public_transfer(nft, recipient)
}

public fun update_description(
    nft: &mut ST_NFT,
    new_description: vector<u8>,
    _: &mut TxContext,
) {
    nft.description = string::utf8(new_description)
}

public fun burn(nft: ST_NFT, _: &mut TxContext) {
    let ST_NFT { id, name: _, description: _, url: _, stakingpool_id: _, stake_amount: _ } = nft;
    id.delete()
}