<template>
  <div>
    <div class="row">
      <div>0x3EB01B3391EA15CE752d01Cf3D3F09deC596F650</div>
    </div>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <contract-address-input @okBtnClicked="smartContractAddressClicked" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import ContractAddressInput from "./ContractAddressInput.vue";
import SmartContractDetailsDto from "../models/dtos/SmartContractDetailsDto";
import SmartContractModule from "../store/modules/SmartContractStore";
import {
  PROVIDER_NETWORK,
  INFURA_PROJECT_ID,
  INFURA_PROJECT_SECRET
} from "~/constants/constants"
import { ethers, utils } from "ethers"
import Abi from "../constants/abi/Abi.json"
import { sortBy } from 'lodash'
import ProvidersModule from "../store/modules/ProvidersStrore"
import TransactionDto from "~/models/dtos/TransactionDto"

@Component({
  components: {
    ContractAddressInput
  }
})
export default class SmartContractDetails extends Vue {
  provider!: any
  isLoading: boolean = false
  smartContractDetails: SmartContractDetailsDto | null = null
  latestTenTransactions: TransactionDto[] = []

  get smContracktDetails(): SmartContractDetailsDto | null {
    return this.smartContractDetails;
  }

  get transtactions(): TransactionDto[] {
    return this.latestTenTransactions
  }

  async smartContractAddressClicked(address: string) {
    this.$router.push({
      path: `/address/${address}`
    })
  }

  async mounted() {}
}
</script>
<style></style>