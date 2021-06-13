<template>
  <div v-if="!isLoading">
    <div class="container">
      <div class="row">
        <div class="col-1">
        <button type="button" @click="$router.back()">X</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 mb-3 mb-md-0">
          <b-card title="Contract Details" tag="article" class="mb-2">
            <b-card-text v-if="smContracktDetails">
              <div class="row align-items-center">
                <div class="col-md-4 mb-1 mb-md-0">
                  <label for>Address:</label>
                </div>
                <div class="col-md-8">
                  <span>{{smContracktDetails.address}}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 mb-1 mb-md-0">
                  <label for>Owners:</label>
                </div>
                <div class="col-md-8">
                  <ul>
                    <li
                      v-for="item in smContracktDetails.ownersAddresses"
                      :key="item.index"
                    >{{item}}</li>
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 mb-1 mb-md-0">
                  <label for>Daily limit:</label>
                </div>
                <div class="col-md-8">
                  <span>{{smContracktDetails.dailyLimit}}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 mb-1 mb-md-0">
                  <label for>Confirmation number:</label>
                </div>
                <div class="col-md-8">
                  <span>{{smContracktDetails.numberOfOwnerSigConfirmTrans}}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 mb-1 mb-md-0">
                  <label for>Balance:</label>
                </div>
                <div class="col-md-8">
                  <span>{{smContracktDetails.balance}}</span>
                </div>
              </div>
            </b-card-text>
          </b-card>
        </div>
      </div>
      <div class="row">
        <div v-if="transtactions.length" class="col-12">
          <md-table md-card>
            <md-table-toolbar>
              <h1 class="md-title">Latest 10 Transactions</h1>
            </md-table-toolbar>

            <md-table-row>
              <md-table-head md-numeric>Hash</md-table-head>
              <md-table-head>Status</md-table-head>
              <md-table-head>Block Number</md-table-head>
              <md-table-head>Timestamp</md-table-head>
              <md-table-head>From</md-table-head>
              <md-table-head>To</md-table-head>
              <md-table-head>Value</md-table-head>
            </md-table-row>

            <md-table-row v-for="item in transtactions" :key="item.key">
              <md-table-cell>{{item.hash}}</md-table-cell>
              <md-table-cell>{{item.status}}</md-table-cell>
              <md-table-cell>{{item.blockNumber}}</md-table-cell>
              <md-table-cell>{{item.timestamp}}</md-table-cell>
              <md-table-cell>{{item.from}}</md-table-cell>
              <md-table-cell>{{item.to}}</md-table-cell>
              <md-table-cell>{{item.value}} Ethers</md-table-cell>
            </md-table-row>
          </md-table>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import SmartContractDetailsDto from "~/models/dtos/SmartContractDetailsDto";
import SmartContractModule from "~/store/modules/SmartContractStore";
import ProvidersModule from "~/store/modules/ProvidersStrore";
import TransactionDto from "~/models/dtos/TransactionDto";

@Component({})
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
      });

      this.$router.push({ path: "/" })
      return
    }
  }
}
</script>
<style></style>