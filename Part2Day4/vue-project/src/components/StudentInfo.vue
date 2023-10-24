<template>
  <div>
    <div v-if="loading" class="loading-message">Loading...</div>
    <div class="content" v-else>
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
import { ref, onMounted, toRefs } from 'vue'
import Modal from './Modal.vue'

const props = defineProps({
  id: String
})
const isOpen = ref(false)
const { id } = toRefs(props)
const student = ref({})
const loading = ref(true)
const error = ref(false)

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
