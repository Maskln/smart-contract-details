<template>
  <div>
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <span class="md-title">Smart Contract Info</span>
          </div>
          <div class="md-toolbar-section-middle"></div>
          <div class="md-toolbar-section-end">
            <md-button @click="$router.push('/')">Home</md-button>
          </div>
        </div>
      </md-app-toolbar>
    </md-app>
    <Nuxt />
    <notifications group="foo" position="bottom right" />
  </div>
</template>

<style scoped>
.md-toolbar .md-title {
	color: white !important;
}
</style>
