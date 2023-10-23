<template>
  <div>
    <router-link v-bind:to="'/'" class="mainLink">
      <h1>Students</h1>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.mainLink {
  color: black;
  text-decoration-line: none;
}
</style>
