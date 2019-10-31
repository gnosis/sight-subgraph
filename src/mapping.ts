import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  AMMCreated,
  AMMPaused,
  AMMResumed,
  AMMClosed,
  AMMFundingChanged,
  AMMFeeChanged,
  AMMFeeWithdrawal,
  AMMOutcomeTokenTrade,
  OwnershipTransferred
} from "../generated/Contract/Contract"
import { ExampleEntity } from "../generated/schema"
import { OutcomeTokenTrade } from "../generated/schema"

export function handleAMMCreated(event: AMMCreated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.initialFunding = event.params.initialFunding

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.supportsInterface(...)
  // - contract.pmSystem(...)
  // - contract.trade(...)
  // - contract.withdrawFees(...)
  // - contract.owner(...)
  // - contract.isOwner(...)
  // - contract.whitelist(...)
  // - contract.calcMarketFee(...)
  // - contract.collateralToken(...)
  // - contract.onERC1155BatchReceived(...)
  // - contract.stage(...)
  // - contract.funding(...)
  // - contract.conditionIds(...)
  // - contract.atomicOutcomeSlotCount(...)
  // - contract.fee(...)
  // - contract.onERC1155Received(...)
  // - contract.FEE_RANGE(...)
  // - contract.calcNetCost(...)
  // - contract.calcMarginalPrice(...)
}

export function handleAMMPaused(event: AMMPaused): void {}

export function handleAMMResumed(event: AMMResumed): void {}

export function handleAMMClosed(event: AMMClosed): void {}

export function handleAMMFundingChanged(event: AMMFundingChanged): void {}

export function handleAMMFeeChanged(event: AMMFeeChanged): void {}

export function handleAMMFeeWithdrawal(event: AMMFeeWithdrawal): void {}

export function handleAMMOutcomeTokenTrade(event: AMMOutcomeTokenTrade): void {
  // Todo change ID
  let outcomeTokenTrade = new OutcomeTokenTrade(event.params.outcomeTokenNetCost.toHex())
  outcomeTokenTrade.transactor = event.params.transactor
  outcomeTokenTrade.outcomeTokenAmounts = event.params.outcomeTokenAmounts
  outcomeTokenTrade.outcomeTokenNetCost = event.params.outcomeTokenNetCost
  outcomeTokenTrade.marketFees = event.params.marketFees
  outcomeTokenTrade.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
