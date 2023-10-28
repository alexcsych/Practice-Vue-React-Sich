<template>
  <div
    :class="
      store.state.selectedTheme === 'light' ? 'light-theme' : 'dark-theme'
    "
  >
    <router-link v-bind:to="'/'" class="mainLink">
      <h1>Students</h1>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
const store = useStore()
</script>

<style scoped>
.mainLink {
  color: black;
  text-decoration-line: none;
}
.light-theme {
  background-color: #f0f0f0;
  color: #333;
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
}

.dark-theme {
  background-color: #333;
  color: #fff;
  border: 2px solid #555;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>
