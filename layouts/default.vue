<template>
  <div class="container"> 
    <smart-contract-details/>
    <Nuxt />
    <notifications group="foo" position="bottom right" />
  </div>
</template>

<style>
* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
  font-family: 'Fira Sans', sans-serif;
}

body {
  background: #F8F9FA;
}

.container {
  background: #F8F9FA;
  margin: 20px;
  width: 100%;
  min-height: 100vh;
  /* display: flex; */
}

.vue-notification-group {
  bottom: 1rem !important;
  right: 1rem !important;
} 
</style>
