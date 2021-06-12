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
      <div class="coll-12"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import ContractAddressInput from "./ContractAddressInput.vue";
import SmartContractDetailsDto from "../models/dtos/SmartContractDetailsDto";
import SmartContractModule from "../store/modules/SmartContractStore";

@Component({
  components: {
    ContractAddressInput
  }
})
export default class SmartContractDetails extends Vue {
  smartContractDetails: SmartContractDetailsDto | null = null;
  provider!: any
  isLoading: boolean = false

  get smContracktDetails(): SmartContractDetailsDto | null {
    return this.smartContractDetails;
  }

  async smartContractAddressClicked(address: string) {
    this.isLoading = true
    this.smartContractDetails = await SmartContractModule.getDetails(address);
    this.isLoading = false
  }

  async mounted() {
    // this.smartContractDetails = new SmartContractDetailsDto();
    //   const address = "0x3EB01B3391EA15CE752d01Cf3D3F09deC596F650"
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