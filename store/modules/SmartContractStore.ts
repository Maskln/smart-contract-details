import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { store } from '../../store'
import SmartContractDetailsDto from '~/models/dtos/SmartContractDetailsDto'
import { ethers, BigNumber } from 'ethers'
import { PROVIDER_NETWORK, INFURA_PROJECT_ID, INFURA_PROJECT_SECRET } from '~/constants/constants'
import Abi from "../../constants/abi/Abi.json"

@Module({
  dynamic: true,
  store,
  name: 'SmartContractStore',
  namespaced: true,
  preserveState: true
})

class SmartContractStore extends VuexModule {
  @Action
  public async getDetails(smartContractAddress: string,): Promise<SmartContractDetailsDto> {
    const provider = ethers.getDefaultProvider(PROVIDER_NETWORK, {
      infura: {
        projectId: INFURA_PROJECT_ID,
        projectSecret: INFURA_PROJECT_SECRET
      }
    })

    const readOnlyContract = new ethers.Contract(smartContractAddress, Abi, provider)
    const contractAddress = readOnlyContract.address
    const owners = await readOnlyContract.getOwners()
    const dailyLimit = await readOnlyContract.dailyLimit()
    const required = await readOnlyContract.required()
    const balance = await provider.getBalance(contractAddress)
    const smartContractDetails = new SmartContractDetailsDto()

    smartContractDetails.address = contractAddress
    smartContractDetails.ownersAddresses = owners
    smartContractDetails.dailyLimit = BigNumber.from(dailyLimit).toString()
    smartContractDetails.numberOfOwnerSigConfirmTrans = BigNumber.from(required).toString()
    smartContractDetails.balance = ethers.utils.formatEther(balance)

    return smartContractDetails
  }
}

const SmartContractModule = getModule(SmartContractStore)

export default SmartContractModule