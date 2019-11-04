import { BigInt, log } from "@graphprotocol/graph-ts"
import {
  LMSRMarketMakerFactory,
  LMSRMarketMakerCreation,
  OwnershipTransferred,
  AMMCreated,
  CloneCreated
} from "../generated/LMSRMarketMakerFactory/LMSRMarketMakerFactory"
import { MarketMaker } from "../generated/schema"
import { LMSRMarketMaker } from '../generated/templates'

export function handleLMSRMarketMakerCreation(event: LMSRMarketMakerCreation): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = MarketMaker.load(event.params.lmsrMarketMaker.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new MarketMaker(event.params.lmsrMarketMaker.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
    log.info('Market maker indexed: {}',
          [
            event.params.lmsrMarketMaker.toHexString()
          ]
         )
  } else {
    // Show an error if there is already an indexed Market Maker with the same ID
    log.error('We are trying to index a "LMSR Market Maker" address that is already indexed: {}',
              [
                event.params.lmsrMarketMaker.toHexString()
              ]
             )
  }

  entity.count = entity.count + BigInt.fromI32(1)

  entity.creator = event.params.creator
  entity.lmsrMarketMaker = event.params.lmsrMarketMaker

  entity.save()

  // Start indexing the LMSRMarketMaker; `event.params.lmsrMarketMaker` is the
  // address of the new LMSRMarketMaker contract
  LMSRMarketMaker.create(event.params.lmsrMarketMaker)
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleAMMCreated(event: AMMCreated): void {}

export function handleCloneCreated(event: CloneCreated): void {}
