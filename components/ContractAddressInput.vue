<template>
  <form
    method="POST"
    id="ContractAddress"
    enctype="multipart/form-data"
    autocomplete="off"
    @submit.prevent="searchBtnClicked"
  >
    <div class="md-layout md-alignment-center-center">
      <div class="md-layout-item md-size-30 md-medium-size-33 md-small-size-50 md-xsmall-size-90">
        <md-field>
          <label>Contract address</label>
          <md-input class="md-size-100" v-model="form.smartContractAddress" required></md-input>
          <span class="md-error">There is an error</span>
        </md-field>
      </div>
      <div class="md-layout-item md-size-10 md-medium-size-33 md-small-size-50 md-xsmall-size-30">
        <md-button type="submit" class="md-raised md-primary">Search</md-button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { ethers } from "ethers"

@Component({})
export default class ContractAddressInput extends Vue {
  form: any = {
    smartContractAddress: ""
  }

  searchBtnClicked() {
    try {
      const validateAddress = ethers.utils.getAddress(
        this.form.smartContractAddress.toLowerCase()
      )
      this.$router.push({
        path: `/address/${validateAddress}`
      })
    } catch (error) {
      this.$notify({
        group: "foo",
        type: "error",
        duration: 2000,
        title: "Wrong address",
        text: "The address is wrong or not valid!"
      })
    }
  }
}
</script>
<style>
</style>