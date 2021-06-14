<template>
  <form
    method="POST"
    id="ContractAddress"
    enctype="multipart/form-data"
    autocomplete="off"
    @submit.prevent="okBtnClicked"
  >
    <div class="md-layout">
      <div
        class="md-layout-item input-wrapper md-size-50 md-medium-size-100 md-small-size-100 md-xsmall-size-100"
      >
        <md-field>
          <label>Contract address</label>
          <md-input v-model="form.smartContractAddress" required></md-input>
          <span class="md-error">There is an error</span>
        </md-field>
        <md-button type="submit" class="md-raised md-primary">OK</md-button>
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

  okBtnClicked() {
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