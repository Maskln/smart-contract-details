import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { store } from '../../store'
import TransactionDto from '~/models/dtos/TransactionDto'
import { $axios } from '~/utils/axios'
import { processResponse, createFailResponse } from '../helpers/ResponseHelper'
import IStoreResult from '../IStoreResult'

@Module({
	dynamic: true,
	store,
	name: 'ProvidersStore',
	namespaced: true,
	preserveState: true
})

class ProvidersStore extends VuexModule {
	@Action
	public async getLatestTenTransactions(smartContractAddress: string): Promise<IStoreResult<TransactionDto[]>> {
		try {
			const url = `http://localhost:8000/provider/${smartContractAddress}`
			const response = await $axios.get(url)

			return processResponse<TransactionDto[]>(response)
		} catch (error) {
			return createFailResponse(error)
		}
	}
}

const ProvidersModule = getModule(ProvidersStore)

export default ProvidersModule