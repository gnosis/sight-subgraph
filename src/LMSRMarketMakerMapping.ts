import { BigInt, log } from "@graphprotocol/graph-ts"
import {
  LMSRMarketMaker,
  AMMCreated,
  AMMPaused,
  AMMResumed,
  AMMClosed,
  AMMFundingChanged,
  AMMFeeChanged,
  AMMFeeWithdrawal,
  AMMOutcomeTokenTrade,
  OwnershipTransferred
} from "../generated/templates/LMSRMarketMaker/LMSRMarketMaker"
import { OutcomeTokenTrade } from "../generated/schema"

export function handleAMMCreated(event: AMMCreated): void {}

export function handleAMMPaused(event: AMMPaused): void {}

export function handleAMMResumed(event: AMMResumed): void {}

export function handleAMMClosed(event: AMMClosed): void {}

export function handleAMMFundingChanged(event: AMMFundingChanged): void {}

export function handleAMMFeeChanged(event: AMMFeeChanged): void {}

export function handleAMMFeeWithdrawal(event: AMMFeeWithdrawal): void {}

export function handleAMMOutcomeTokenTrade(event: AMMOutcomeTokenTrade): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = OutcomeTokenTrade.load(event.transaction.hash.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new OutcomeTokenTrade(event.transaction.hash.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)

    log.info('Outcome Token trade indexed. Tx_hash: {}',
      [
        event.transaction.hash.toHex()
      ]
     )
  } else {
        // Show an error if there is already an AMMOutcomeTokenTrade with the same ID
        log.error('Trying to index a "Outcome Token trade" that is already indexed. Tx_hash: {}',
          [
            event.transaction.hash.toHex()
          ]
         )
  }

  entity.count = entity.count + BigInt.fromI32(1)

  entity.transactor = event.params.transactor
  entity.outcomeTokenAmounts = event.params.outcomeTokenAmounts
  entity.outcomeTokenNetCost = event.params.outcomeTokenNetCost
  entity.marketFees = event.params.marketFees

  let lmsrMarketMakercontract = LMSRMarketMaker.bind(event.address)
  // Get the outcome slots quantity
  entity.outcomeSlotCount = lmsrMarketMakercontract.atomicOutcomeSlotCount()
  // Use outcomeSlotCountI32:
  // Array constructor uses i32 type instead of BigInt
  // Operator '<' cannot be applied to types 'i32' and '~lib/@graphprotocol/graph-ts/index/BigInt
  let outcomeSlotCountI32 = entity.outcomeSlotCount.toI32()
  let marketMakerMarginalPrices = new Array<BigInt>(outcomeSlotCountI32);
  for (let outcomeSlotIndex = 0; outcomeSlotIndex < outcomeSlotCountI32; ++outcomeSlotIndex) {
    marketMakerMarginalPrices[outcomeSlotIndex] = lmsrMarketMakercontract.calcMarginalPrice(outcomeSlotIndex);
  }
  entity.marketMakerMarginalPrices = marketMakerMarginalPrices

  // Market maker address
  entity.marketMaker = event.transaction.to
  // Market maker owner
  entity.marketMakerOwner = lmsrMarketMakercontract.owner()

  // To be easier to sort trades
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}
