<template>
  <div class="container">
      <!-- <smart-contract-details/> -->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import SmartContractDetails from '~/components/SmartContractDetails.vue'

@Component({
  components: {
    SmartContractDetails
  }
})

export default class MainPage extends Vue {}
</script>
<style></style>
