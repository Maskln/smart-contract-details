<template>
  <div class="md-layout md-alignment-center-center" style="min-height: 90vh;">
    <contract-address-input />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import ContractAddressInput from "~/components/ContractAddressInput.vue";

@Component({
  components: {
    ContractAddressInput
  }
})
export default class MainPage extends Vue {}
</script>
<style></style>
