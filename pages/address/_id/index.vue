<template>
  <div v-if="!isLoading">
    <div class="container">
      <div class="row">
        <button type="button" @click="$router.back()">X</button>
      </div>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
          <b-card title="Contract Details" tag="article" class="mb-2">
            <b-card-text v-if="smContracktDetails">
              <div class="row">
                <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <label for>Address:</label>
                </div>
                <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                  <span>{{smContracktDetails.address}}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <label for>Owners:</label>
                </div>
                <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                  <ul>
                    <li
                      v-for="item in smContracktDetails.ownersAddresses"
                      :key="item.index"
                    >{{item}}</li>
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <label for>Daily limit:</label>
                </div>
                <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                  <span>{{smContracktDetails.dailyLimit}}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <label for>Confirmation number:</label>
                </div>
                <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                  <span>{{smContracktDetails.numberOfOwnerSigConfirmTrans}}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <label for>Balance:</label>
                </div>
                <div class="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8">
                  <span>{{smContracktDetails.balance}}</span>
                </div>
              </div>
            </b-card-text>
          </b-card>
        </div>
      </div>
      <div class="row">
        <div v-if="transtactions.length" class="coll-12">
          <b-table responsive hover :items="transtactions"></b-table>
        </div>
      </div>
    </div>
  </div>
  <div v-else style="width: 100%; height: 100vh; margin: 0 auto;">
    <b-spinner
      style="width: 10rem; height: 10rem;"
      label="Large Spinner"
      :variant="'info'"
      type="grow"
    ></b-spinner>
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