<template>
  <div>
    <ValidationObserver ref="form" v-slot="{ handleSubmit }" slim>
      <form
        method="POST"
        id="ContractAddress"
        enctype="multipart/form-data"
        autocomplete="off"
        @submit.prevent="handleSubmit(okBtnClicked)"
      >
        <label for="smartContractAddress">Smart Contract Address:</label>
        <ValidationProvider
          :name="'Smart Contract Address'"
          rules="required|max:42|isSmartContractAddress"
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
        <button type="submit" class="button">OK</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class ContractAddressInput extends Vue {
  form: any = {
    smartContractAddress: ""
  };

  // TODO: Validate the address
  okBtnClicked() {
    this.$emit("okBtnClicked", this.form.smartContractAddress);
  }

  async mounted() {}
}
</script>

<style>
</style>