<template>
  <div>
    <div class="row">
      <contract-address-input @okBtnClicked="test" />
    </div>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <b-card-text>
          <logo />
        </b-card-text>
      </div>
      <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <logo />
      </div>
    </div>
    <div class="row">
      <div class="coll-12">
        <Form v-slot="{ errors }">
          <Field name="field" :rules="isRequired|email" />

          <span>{{ errors.field }}</span>
        </Form>
        <!-- <table class="table">
          <thead>
            <th>Txn Hash</th>
            <th>From</th>
            <th>To</th>
            <th>Status and Value</th>
            <th>Block</th>
            <th>Timestamp</th>
          </thead>
          <tbody>
            <td class="text-truncate">
              <span>0x8cd024768e96b5bc5c5c26c4a5add12d1a3f26742b87127eb45fe8906f39df6b</span>
            </td>
            <td>0x449bAf9413C60cd24a8C1c6010729c84B9D5139B</td>
            <td>Kyber: MultiSig</td>
            <td>0 Ether</td>
            <td>12599142</td>
            <td>8 hrs 33 mins ago</td>
          </tbody>
        </table>-->
        <!-- <b-table striped hover :items="items" :fields="fields"></b-table> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ethers } from "ethers";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Logo from "./Logo.vue";
import Abi from "../constants/abi/Abi.json";
import ContractAddressInput from "./ContractAddressInput.vue";
import {
  PROVIDER_NETWORK,
  INFURA_PROJECT_ID,
  INFURA_PROJECT_SECRET
} from "../constants/constants";

@Component({
  components: {
    ContractAddressInput
  }
})
export default class SmartContractDetails extends Vue {
  test(address: string) {
    console.log("inputAddress");
    console.log(address);
  }

  async mounted() {
    const provider = ethers.getDefaultProvider(PROVIDER_NETWORK, {
      infura: {
        projectId: INFURA_PROJECT_ID,
        projectSecret: INFURA_PROJECT_SECRET
      }
    });
    // Remove harcoded address, use the address from the input
    const address = "0x3EB01B3391EA15CE752d01Cf3D3F09deC596F650";
    const abi = Abi;

    // The Contract object
    const readOnlyContract = new ethers.Contract(address, abi, provider);
    const contractAddress = readOnlyContract.address;
    const owners = await readOnlyContract.getOwners();
    const dailyLimit = await readOnlyContract.dailyLimit();
    const required = await readOnlyContract.required();
    const transactions = await readOnlyContract.transactions(contractAddress);
    const transactionsCount = await readOnlyContract.transactionCount();

    const balance = await provider.getBalance(contractAddress);

    // 1. Smart contract address;
    console.log("contractAddress");
    console.log(contractAddress);
    // 2. Addresses of the owners;
    console.log("owners");
    console.log(owners);
    // 3. Daily limit
    console.log("dailyLimit");
    console.log(dailyLimit.toString());
    // 4. Required signitures to cpmfirm;
    console.log("transactionsIds");
    console.log(required.toString());

    console.log("transactionsCount");
    console.log(transactionsCount.toString());
    // 5. Current Amount of Ethers
    console.log("balance");
    console.log(ethers.utils.formatEther(balance));

    console.log(transactions);
    console.log(transactions);
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