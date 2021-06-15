import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { store } from '../../store'
import { $axios } from '~/utils/axios'
import { processResponse, createFailResponse } from '../helpers/ResponseHelper'
import CurrencyDto from '~/models/dtos/CurrencyDto'

@Module({
	dynamic: true,
	store,
	name: 'CoinMarketCapStore',
	namespaced: true,
	preserveState: true
})

class CoinMarketCapStore extends VuexModule {

	//The FREE accounts in Coin Market Place is not allowed to pass more than 1 convert option! 
	//The error message is: "Your plan is limited to 1 convert options".
	@Action
	public async getLatestEtherPriceForGivenCurrency(currencySymbol: string): Promise<any> {
		currencySymbol = currencySymbol.toLowerCase()
		try {
			const url = `http://localhost:8000/coin-market-cap/ether-price-${currencySymbol}`
			const response = await $axios.get(url)	
			
			return processResponse<CurrencyDto>(response)
		} catch (error) {
			return createFailResponse(error)
		}
	}
}

const CoinMarketCapModule = getModule(CoinMarketCapStore)

export default CoinMarketCapModule