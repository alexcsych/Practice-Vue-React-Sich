<template>
  <div>
    <div v-if="loading" class="loading-message">Loading...</div>
    <div class="content" v-else>
      <p>Amount: {{ studentsCount }}</p>
      <button
        :class="
          store.state.selectedTheme === 'light' ? 'light-theme' : 'dark-theme'
        "
        @click="toggleTheme"
      >
        Змінити колір
      </button>
      <div>
        <img
          @click="isOpen = true"
          v-if="student.photo"
          :src="student.photo"
          :alt="student.name"
          class="photo"
        />
        <Modal :open="isOpen" @close="isOpen = !isOpen">
          <img v-if="student.photo" :src="student.photo" :alt="student.name" />
        </Modal>
      </div>
      <div class="info">
        <div v-if="student.name" class="info-item">
          Name: {{ student.name }}
        </div>
        <div v-if="student.group" class="info-item">
          Group: {{ student.group }}
        </div>
        <div v-if="student.isDonePr" class="info-item">
          Is Done PR: {{ student.isDonePr }}
        </div>
        <div v-if="student.mark" class="info-item">
          Mark: {{ student.mark }}
        </div>
      </div>
    </div>
    <div v-if="error" class="error-message">Error loading data.</div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import Modal from './Modal.vue'

const store = useStore()
const props = defineProps({
  id: String
})
const isOpen = ref(false)
const { id } = toRefs(props)
const student = ref({})
const loading = ref(true)
const error = ref(false)

const studentsCount = computed(() => {
  return store.getters.getCount
})

const toggleTheme = () => {
  const newTheme = store.state.selectedTheme === 'light' ? 'dark' : 'light'
  store.commit('setTheme', newTheme)
}

onMounted(async () => {
  await axios
    .get(`http://34.82.81.113:3000/students/${id.value}`)
    .then(({ data }) => {
      student.value = data
      loading.value = false
    })
    .catch(err => {
      console.error(err)
      error.value = true
      loading.value = false
    })
})
</script>

<style scoped>
.light-theme {
  background-color: #f0f0f0;
  color: #333;
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
}

.light-theme:hover {
  background-color: #ccc;
  color: #333;
}

.dark-theme {
  background-color: #333;
  color: #fff;
  border: 2px solid #555;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
}

.dark-theme:hover {
  background-color: #555;
  color: #fff;
}
.content {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.loading-message,
.error-message {
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  margin: 20px;
  color: red;
}

.photo {
  max-width: 200px;
  max-height: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.info {
  display: flex;
  flex-direction: column;
}

.info-item {
  margin: 10px 0;
}
</style>
