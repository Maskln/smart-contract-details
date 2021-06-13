<template>
    <ValidationObserver ref="form" v-slot="{ handleSubmit }" slim>
      <form
        method="POST"
        id="ContractAddress"
        enctype="multipart/form-data"
        autocomplete="off"
        @submit.prevent="handleSubmit(okBtnClicked)"
      >
        <div class="row">
          <div class="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
            <label for="smartContractAddress">Contract Address:</label>
          </div>
          <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <ValidationProvider
              :name="'Smart Contract Address'"
              rules="required"
              v-slot="{ errors }"
            >
              <input
                v-model="form.smartContractAddress"
                type="text"
                class="form-control with-border"
                :class="errors[0] ? 'is-invalid' : 'with-border'"
                id="smartContractAddress"
                name="smartContractAddress"
              />
              <span v-if="errors" class="invalid-feedback">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <md-button type="submit" class="md-raised md-primary">OK</md-button>
          </div>
        </div>
      </form>
    </ValidationObserver>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { ethers } from "ethers";

@Component({})
export default class ContractAddressInput extends Vue {
  form: any = {
    smartContractAddress: ""
  };

  okBtnClicked() {
    try {
      const validateAddress = ethers.utils.getAddress(
        this.form.smartContractAddress.toLowerCase()
      );
      this.$emit("okBtnClicked", validateAddress);
    } catch (error) {
      this.$notify({
        group: "foo",
        type: "error",
        duration: 2000,
        title: "Wrong address",
        text: "The address is wrong or not valid!"
      });
    }
  }
}
</script>
<style></style>