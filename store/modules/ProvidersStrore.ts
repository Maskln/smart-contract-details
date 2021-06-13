import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { store } from '../../store'
import TransactionDto from '~/models/dtos/TransactionDto'
import { ethers, BigNumber } from 'ethers'
import { sortBy } from 'lodash'
import { PROVIDER_NETWORK, INFURA_PROJECT_ID, INFURA_PROJECT_SECRET } from '~/constants/constants'

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

		const provider = ethers.getDefaultProvider(PROVIDER_NETWORK, {
			infura: {
				projectId: INFURA_PROJECT_ID,
				projectSecret: INFURA_PROJECT_SECRET
			}
		})

		for (let i = 0; i < result.length; i += 1) {
			let test: [Promise<any>, Promise<any>] = [
				provider.getTransactionReceipt(result[i].hash),
				provider.getTransaction(result[i].hash)
			]

			Promise.all(test).then((results: any[]) => {
				if (typeof results[0].status !== "undefined") {
					result[i].status = results[0].status;
				}

				result[i].value = BigNumber.from(results[1].value).toString()
			})
		}

		return result
	}
}

const ProvidersModule = getModule(ProvidersStore)

export default ProvidersModule