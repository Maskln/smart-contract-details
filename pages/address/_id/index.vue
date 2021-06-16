<template>
  <div class="md-app" v-if="!isLoading">
    <div class="md-layout">
      <div class="md-layout-item">
        <contract-address-input />
      </div>
    </div>
    <div v-if="smContracktDetails" class="md-layout">
      <div class="md-layout-item">
        <span class="md-title">Contract</span>
        <span class="md-subheading">{{ smContracktDetails.address }}</span>
      </div>
    </div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-35 md-small-size-50 md-xsmall-size-100">
        <md-card v-if="smContracktDetails">
          <md-card-header>
            <div class="md-title">Contract Overview</div>
          </md-card-header>
          <md-card-content>
            <!-- Address -->
            <div class="md-layout">
              <div
                class="md-layout-item md-size-40 md-medium-size-100 md-small-size-100 md-xsmall-size-100"
              >
                <span>Address:</span>
              </div>
              <div
                class="md-layout-item md-size-60 md-medium-size-100 md-small-size-100 md-xsmall-size-100"
              >
                <span>{{smContracktDetails.address}}</span>
              </div>
            </div>
            <!-- Owners -->
            <div class="md-layout">
              <div
                class="md-layout-item md-size-40 md-medium-size-100 md-small-size-100 md-xsmall-size-100"
              >
                <span>Owners:</span>
              </div>
              <div
                class="md-layout-item md-size-60 md-medium-size-100 md-small-size-100 md-xsmall-size-100"
              >
                <ul>
                  <li v-for="item in smContracktDetails.ownersAddresses" :key="item.index">{{item}}</li>
                </ul>
              </div>
            </div>
            <!-- Daily limit -->
            <div class="md-layout">
              <div
                class="md-layout-item md-size-40 md-medium-size-100 md-small-size-100 md-xsmall-size-100"
              >
                <span>Daily limit:</span>
              </div>
              <div
                class="md-layout-item md-size-60 md-medium-size-100 md-small-size-100 md-xsmall-size-100"
              >
                <span>{{smContracktDetails.dailyLimit}}</span>
              </div>
            </div>
            <!-- Confirmation number -->
            <div class="md-layout">
              <div
                class="md-layout-item md-size-40 md-medium-size-100 md-small-size-100 md-xsmall-size-100"
              >
                <span>Confirmation number:</span>
              </div>
              <div
                class="md-layout-item md-size-60 md-medium-size-100 md-small-size-100 md-xsmall-size-100"
              >
                <span>{{smContracktDetails.numberOfOwnerSigConfirmTrans}}</span>
              </div>
            </div>
            <!-- Balance -->
            <div class="md-layout">
              <div
                class="md-layout-item md-size-40 md-medium-size-100 md-small-size-100 md-xsmall-size-100"
              >
                <span>Balance:</span>
              </div>
              <div
                class="md-layout-item md-size-60 md-medium-size-100 md-small-size-100 md-xsmall-size-100"
              >
                <span>{{smContracktDetails.balance}} Ether</span>
              </div>
            </div>
            <!-- Value -->
            <div class="md-layout">
              <div
                class="md-layout-item md-size-40 md-medium-size-100 md-small-size-100 md-xsmall-size-100"
              >
                <span>Value:</span>
              </div>
              <div
                class="md-layout-item md-size-60 md-medium-size-100 md-small-size-100 md-xsmall-size-100"
              >
                <ul>
                  <li>{{getValue('EUR')}}</li>
                  <li>{{getValue('USD')}}</li>
                </ul>
                
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
    <div v-if="transtactions.length" class="md-layout md-size-100 md-gutter">
      <div class="md-layout-item">
        <md-table md-card>
          <md-table-toolbar>
            <h1 class="md-title">Latest 10 Transactions</h1>
          </md-table-toolbar>

          <md-table-row>
            <md-table-head>Hash</md-table-head>
            <md-table-head>Status</md-table-head>
            <md-table-head>Block Number</md-table-head>
            <md-table-head>Timestamp</md-table-head>
            <md-table-head>From</md-table-head>
            <md-table-head>To</md-table-head>
            <md-table-head>Value</md-table-head>
          </md-table-row>

          <md-table-row v-for="item in transtactions" :key="item.key">
            <md-table-cell>{{item.hash}}</md-table-cell>
            <md-table-cell>
              <md-chip class="success" v-if="item.status === 1">Success</md-chip>
              <md-chip class="failed" v-else>Failed</md-chip>
              </md-table-cell>
            <md-table-cell>{{item.blockNumber}}</md-table-cell>
            <md-table-cell>{{convertTimestamp(item.timestamp)}}</md-table-cell>
            <md-table-cell>{{item.from}}</md-table-cell>
            <md-table-cell>{{item.to}}</md-table-cell>
            <md-table-cell>{{item.value}} Ether</md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
  </div>
  <div v-else class="md-layout md-alignment-center-center" style="min-height: 90vh;">
    <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import ContractAddressInput from '~/components/ContractAddressInput.vue'
import SmartContractDetailsDto from "~/models/dtos/SmartContractDetailsDto"
import SmartContractModule from "~/store/modules/SmartContractStore"
import ProvidersModule from "~/store/modules/ProvidersStrore"
import TransactionDto from "~/models/dtos/TransactionDto"
import moment from 'moment'
import CoinMarketCapModule from '~/store/modules/CoinMarketCapStore'
import { EUR_SYMBOL, USD_SYMBOL, ETH_SYMBOL } from '~/constants/constants'
import CurrencyDto from '~/models/dtos/CurrencyDto'

@Component({
  head(this: SmartContractDetailsPage): object {
    return {
      title: "Contract - " + this.$route.params["id"]
    }
  },
  components: {
    ContractAddressInput
  }
})
export default class SmartContractDetailsPage extends Vue {
  isLoading: boolean = false
  smartContractDetails: SmartContractDetailsDto | null = null
  latestTenTransactions: TransactionDto[] = []
  etherUsdPrice: CurrencyDto | null = null
  etherEurPrice: CurrencyDto | null = null

  get smContracktDetails(): SmartContractDetailsDto | null {
    return this.smartContractDetails
  }

  get transtactions(): TransactionDto[] {
    return this.latestTenTransactions
  }

  convertTimestamp(timestamp: number): string {  
    let convertedTimestamp = moment.unix(timestamp).startOf('minute').fromNow()  

    return convertedTimestamp
  }

  getValue(currency: string): string {
    let price: number = -1
    let totalValue = -1
    let currencySymb = currency === EUR_SYMBOL ? '€' : '$'
    let totalValueWithCommas = ''
    let priceValueWithCommas = ''
    let priceValueWithcCommas = ''

    if(currency === EUR_SYMBOL) {
      if (this.etherEurPrice) {
        price = this.etherEurPrice.data[ETH_SYMBOL].quote[currency].price
      }
    } else {
      if (this.etherUsdPrice) {
        price = this.etherUsdPrice.data[ETH_SYMBOL].quote[currency].price
      }
    }

    let priceTwoDigitAfterDecimal = price.toFixed(2)
    priceValueWithCommas = this.numberWithCommas(parseFloat(priceTwoDigitAfterDecimal))

    if (price && this.smContracktDetails) {
      totalValue = parseFloat(this.smContracktDetails.balance) * price
      let twoDigitAfterDecimal = totalValue.toFixed(2)
      totalValueWithCommas = this.numberWithCommas(parseFloat(twoDigitAfterDecimal))
    }

    return `${currencySymb} ${totalValueWithCommas} (@ ${currencySymb}${priceValueWithCommas}/ETH)`
  }

  numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  async mounted() {
    let address = this.$route.params["id"]

    this.isLoading = true
    try {
      const [smDetailsResp, latestTransResp, eurPriceResp, usdPriceResp ] = await Promise.all([
        SmartContractModule.getDetails(address), 
        ProvidersModule.getLatestTenTransactions(address),
        CoinMarketCapModule.getLatestEtherPriceForGivenCurrency(EUR_SYMBOL),
        CoinMarketCapModule.getLatestEtherPriceForGivenCurrency(USD_SYMBOL)
       ])

      this.smartContractDetails = smDetailsResp.isSuccess ? smDetailsResp.data : null
      this.latestTenTransactions = latestTransResp.isSuccess ? latestTransResp.data : []
      this.etherEurPrice = eurPriceResp.isSuccess ? eurPriceResp.data : null
      this.etherUsdPrice = usdPriceResp.isSuccess ? usdPriceResp.data : null
      
      this.isLoading = false
    } catch (error) {
      this.$notify({
        group: "foo",
        type: "error",
        duration: 2000,
        title: "Wrong address",
        text: "The address is not valid Multisig contract!"
      })

      this.$router.push({ path: "/" })
      return
    }
  }
}
</script>
<style scoped>
.md-app {
  padding: 20px;
  flex-direction: column;
}
</style>