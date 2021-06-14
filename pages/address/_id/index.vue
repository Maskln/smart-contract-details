<template>
  <div v-if="!isLoading">
    <div v-if="smContracktDetails" class="md-layout">
      <div class="md-layout-item">
        <span class="md-title">Contract</span>
        <span class="md-subheading">{{ smContracktDetails.address }}</span>
      </div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item">
        <md-button class="md-raised md-primary" @click="$router.back()">Home</md-button>
      </div>
    </div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-55 md-small-size-100 md-xsmall-size-100">
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
          </md-card-content>
        </md-card>
      </div>
    </div>
    <div v-if="transtactions.length" class="md-layout md-gutter">
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
  <div v-else class="md-layout md-alignment-center-center">
    <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import SmartContractDetailsDto from "~/models/dtos/SmartContractDetailsDto"
import SmartContractModule from "~/store/modules/SmartContractStore"
import ProvidersModule from "~/store/modules/ProvidersStrore"
import TransactionDto from "~/models/dtos/TransactionDto"
import moment from 'moment'

@Component({
  head(this: SmartContractDetailsPage): object {
    return {
      title: "Contract - " + this.$route.params["id"]
    }
  }
})
export default class SmartContractDetailsPage extends Vue {
  isLoading: boolean = false
  smartContractDetails: SmartContractDetailsDto | null = null
  latestTenTransactions: TransactionDto[] = []

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

  async mounted() {
    let address = this.$route.params["id"]

    this.isLoading = true
    try {
      this.smartContractDetails = await SmartContractModule.getDetails(address)
      this.latestTenTransactions = await ProvidersModule.getLatestTenTransactions(
        address
      )

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
<style></style>