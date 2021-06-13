import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { store } from '../../store'
import TransactionDto from '~/models/dtos/TransactionDto'
import { ethers, BigNumber } from 'ethers'

import { sortBy } from 'lodash'

@Module({
	dynamic: true,
	store,
	name: 'ProvidersStore',
	namespaced: true,
	preserveState: true
})

class ProvidersStore extends VuexModule {
	@Action
	public async getLatestTenTransactions(smartContractAddress: string): Promise<TransactionDto[]> {
		let etherscanProvider = new ethers.providers.EtherscanProvider()
		let latestTenTransactions: any = []
		let result: TransactionDto[] = []
		let history = await etherscanProvider.getHistory(smartContractAddress)

		latestTenTransactions = sortBy(history, [(e: any) => {
			return e.blockNumber
		}]).reverse().slice(0, 10)
		
		latestTenTransactions.forEach((item: any) => {
			let transaction = new TransactionDto()
			transaction.hash = item.hash
			transaction.from = item.from
			transaction.to = item.to
			transaction.blockNumber = item.blockNumber
			transaction.timestamp = item.timestamp

			result.push(transaction)

		})

		return result
	}
}

const ProvidersModule = getModule(ProvidersStore)

export default ProvidersModule