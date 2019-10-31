import { BigInt } from "@graphprotocol/graph-ts"
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
} from "../generated/LMSRMarketMaker/LMSRMarketMaker"
import { OutcomeTokenTrade } from "../generated/schema"

export function handleAMMCreated(event: AMMCreated): void {}

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
