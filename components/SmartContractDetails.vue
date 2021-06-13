<template>
  <div>
    <div class="row">
      <div>0x3EB01B3391EA15CE752d01Cf3D3F09deC596F650</div>
    </div>
    <div class="row">
      <contract-address-input @okBtnClicked="smartContractAddressClicked" />
    </div>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <b-card-text v-if="smContracktDetails">
          Address:
          <div>{{smContracktDetails.address}}</div>
          Owners:
          <ul>
            <li v-for="item in smContracktDetails.ownersAddresses" :key="item.index">{{item}}</li>
          </ul>
          Daily limit:
          <div>{{smContracktDetails.dailyLimit}}</div>
          Confirmation number:
          <div>{{smContracktDetails.numberOfOwnerSigConfirmTrans}}</div>
          Balance:
          <div>{{smContracktDetails.balance}}</div>
        </b-card-text>
        <div v-else>
          <div v-if="isLoading" class="m-4">
            <b-spinner label="Loading..." />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-if="transtactions.length" class="coll-12">
        <b-table responsive hover :items="transtactions"></b-table>
      </div>
       <div v-else>
          <div v-if="isLoading" class="m-4">
            <b-spinner label="Loading..." />
          </div>
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
} from "~/constants/constants";
import { ethers, utils } from "ethers";
import Abi from "../constants/abi/Abi.json";
import { sortBy } from 'lodash'
import ProvidersModule from '../store/modules/ProvidersStrore'
import TransactionDto from '~/models/dtos/TransactionDto'

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
    this.isLoading = true
    this.smartContractDetails = await SmartContractModule.getDetails(address)
    this.latestTenTransactions = await ProvidersModule.getLatestTenTransactions(address)
    this.isLoading = false
  }

  async mounted() {
    // const provider = ethers.getDefaultProvider(PROVIDER_NETWORK, {
    //   infura: {
    //     projectId: INFURA_PROJECT_ID,
    //     projectSecret: INFURA_PROJECT_SECRET
    //   }
    // });

    // const address = "0x3EB01B3391EA15CE752d01Cf3D3F09deC596F650";
    
    
  }
}
</script>

<style>
.table td,
.table th {
  white-space: nowrap;
}

.table td,
.table th {
  padding: 0.625rem;
  vertical-align: top;
  border-top: 1px solid #e7eaf3;
}

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>