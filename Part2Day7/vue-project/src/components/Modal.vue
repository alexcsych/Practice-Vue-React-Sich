<template>
  <div class="vue-modal" v-show="open">
    <transition name="slide">
      <div class="veu-modal-inner">
        <div class="vue-modal-content">
          <slot />
          <button type="button" @click="$emit('close')">Close</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.vue-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vue-modal-inner {
  max-width: 500px;
  width: 100%;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 0.3rem;
  padding: 1rem;
  overflow: hidden;
  transform: translate(0, 0);
  transition: transform 0.3s ease-in-out;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-to,
.slide-leave {
  transform: translate(0, 100%);
}

.vue-modal-content {
  position: relative;
}

button {
  border: none;
  background: none;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1rem;
  line-height: 1;
  color: #333;
  background-color: transparent;
  padding: 0;
}
</style>
