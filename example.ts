import { agent } from './setup'

async function main() {
  const identity = await agent.didManagerGetOrCreate({
    alias: 'bob',
  })

  console.log()
  console.log(`Get identity`)
  console.log(identity.did)
  let did = await agent.resolveDid({ didUrl: identity.did })
  console.log(did)
  console.log('-------------Create Key--------------------')
  const key = await agent.keyManagerCreate({
    kms: 'local',
    type: 'Secp256k1',
  })
  console.log(key)
  console.log('-------------Finish Key--------------------')
  console.log('-------------Add Key to DID --------------------')
  const result = await agent.didManagerAddKey({
    did: identity.did,
    key,
    options: {
      gas: 100000
    }
  })

  console.log('-------------Key Add Result--------------------')
  console.log(result)
  console.log('-------------Key Add Result--------------------')

  console.log('Finish')
}

main().catch(console.log)