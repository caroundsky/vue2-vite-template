<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'App'
})
export default class App extends Vue {
}
</script>

<style lang="less">
#app {
  height: 100%;
}
</style>
