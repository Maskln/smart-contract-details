<template>
  <div class="container">
      <smart-contract-details/>
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
<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
}
</style>
