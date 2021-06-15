import { VuexModule, Module, Action, getModule } from 'vuex-module-decorators'
import { store } from '../../store'
import SmartContractDetailsDto from '~/models/dtos/SmartContractDetailsDto'
import { processResponse, createFailResponse } from '../helpers/ResponseHelper'
import IStoreResult from '../IStoreResult'
import { $axios } from '~/utils/axios'

@Module({
  dynamic: true,
  store,
  name: 'SmartContractStore',
  namespaced: true,
  preserveState: true
})

class SmartContractStore extends VuexModule {
  @Action
  public async getDetails(smartContractAddress: string, ): Promise<IStoreResult<SmartContractDetailsDto>> {
    try {
      const url = `http://localhost:8000/contract/${smartContractAddress}`
      const response = await $axios.get(url)

      return processResponse<SmartContractDetailsDto[]>(response)
    } catch (error) {
      return createFailResponse(error)
    }
  }
}

const SmartContractModule = getModule(SmartContractStore)

export default SmartContractModule