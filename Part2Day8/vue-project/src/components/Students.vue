<template>
  <div class="center" id="app">
    <h1>Пошук</h1>
    <input type="text" name="search" v-model="search" />
    <p>Amount: {{ studentsCount }}</p>
    <button
      :class="
        store.state.selectedTheme === 'light' ? 'light-theme' : 'dark-theme'
      "
      @click="toggleTheme"
    >
      Змінити колір
    </button>
    <table>
      <thead>
        <tr>
          <th>Ім'я</th>
          <th>Група</th>
          <th>Оцінка</th>
          <th>Здав</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(st, index) in students" :key="index">
          <template v-if="!st.isEdit"
            ><td>
              <router-link
                v-bind:to="'/student-info/' + st._id"
                :class="
                  st.name.includes(search) && search !== '' ? 'red' : 'black'
                "
              >
                {{ st.name }}
              </router-link>
            </td>
            <td>{{ st.group }}</td>
            <td>{{ st.mark }}</td>
            <td>
              <input type="checkbox" name="isDonePr" v-model="st.isDonePr" />
              {{ st.isDonePr }}
            </td>
            <td>
              <a
                href="#"
                class="delButton"
                @click="deleteStudent(st._id)"
                v-show="st.group === getCurrentUser.group"
              >
                Видалити
              </a>
            </td>
            <td>
              <button class="editButton" @click="editStudent(index)">
                Редагувати
              </button>
            </td>
          </template>
          <template v-else>
            <td>
              <input type="text" v-model="st.updateStudent.name" />
            </td>
            <td>
              <select v-model="st.updateStudent.group">
                <option value="RPZ 20 1/9">RPZ 20 1/9</option>
                <option value="RPZ 20 2/9">RPZ 20 2/9</option>
              </select>
            </td>
            <td><input type="text" v-model="st.updateStudent.mark" /></td>
            <td>
              <input
                type="checkbox"
                name="isDonePr"
                v-model="st.updateStudent.isDonePr"
              />
              {{ st.updateStudent.isDonePr }}
            </td>
            <td>
              <button class="editButton" @click="saveStudent(index, st._id)">
                Зберегти
              </button>
            </td>
            <td>
              <button class="editButton" @click="cancelEditStudent(index)">
                Скасувати
              </button>
            </td>
          </template>
        </tr>
      </tbody>
    </table>

    <h2>Додати учня</h2>
    <form @submit.prevent="createStudent()" class="student-form">
      <div class="form-group">
        <label for="name">Ім'я</label>
        <input
          type="text"
          id="name"
          name="name"
          v-model.trim="newStudent.name"
          required
        />
      </div>

      <div class="form-group">
        <label>Група</label>
        <select v-model="newStudent.group" required>
          <option value="RPZ 20 1/9">RPZ 20 1/9</option>
          <option value="RPZ 20 2/9">RPZ 20 2/9</option>
        </select>
      </div>

      <div class="form-group">
        <label for="mark">Оцінка</label>
        <input
          type="number"
          id="mark"
          name="mark"
          v-model="newStudent.mark"
          required
        />
      </div>

      <div class="form-group">
        <label for="isDonePr">Здав</label>
        <input
          type="checkbox"
          id="isDonePr"
          name="isDonePr"
          v-model="newStudent.isDonePr"
        />
      </div>

      <button type="submit" class="submit-button">Submit</button>
    </form>

    <h3>Конвертор</h3>
    <div class="currency-converter">
      <label for="amount">Amount:</label>
      <input type="number" name="amount" v-model="convertor.amount" />

      <label for="fromCurrency">From Currency:</label>
      <select name="fromCurrency" v-model="convertor.fromCurrency">
        <option v-for="(c, index) in currencies" :value="c" :key="index">
          {{ c }}
        </option>
      </select>

      <label for="toCurrency">To Currency:</label>
      <select name="toCurrency" v-model="convertor.toCurrency">
        <option v-for="(c, index) in currencies" :value="c" :key="index">
          {{ c }}
        </option>
      </select>

      <button @click="convert(convertor)">Convert</button>
      <h4>Converted Currency {{ converterCurrency }}</h4>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import cc from 'currency-codes'

const store = useStore()
const students = ref([])
const search = ref('')
const newStudent = ref({ name: '', group: '', mark: '', isDonePr: false })
const updateStudent = ref({
  name: '',
  group: '',
  mark: '',
  isDonePr: false
})
const currencies = ref(['UAH', 'EUR', 'USD'])
const convertor = ref({
  amount: '',
  fromCurrency: '',
  toCurrency: ''
})
const converterCurrency = ref('')

const fetchStudents = () => {
  axios.get('http://34.82.81.113:3000/students').then(response => {
    students.value = response.data.map(st => ({
      ...st,
      isEdit: false
    }))
    store.commit('setCount', students.value.length)
  })
}

const studentsCount = computed(() => {
  return store.getters.getCount
})

const getCurrentUser = computed(() => {
  return store.getters.getUser
})

const toggleTheme = () => {
  const newTheme = store.state.selectedTheme === 'light' ? 'dark' : 'light'
  store.commit('setTheme', newTheme)
}

const deleteStudent = id => {
  axios.delete(`http://34.82.81.113:3000/students/${id}`).then(() => {
    students.value = students.value.filter(st => st._id !== id)
  })
}

const editStudent = index => {
  const { name, group, mark, isDonePr } = students.value[index]
  students.value[index].updateStudent = { name, group, mark, isDonePr }
  students.value[index].isEdit = true
}

const cancelEditStudent = index => {
  students.value[index].isEdit = false
}

const saveStudent = (index, id) => {
  const { name, group, mark, isDonePr } = updateStudent.value
  if (name && group && mark) {
    axios
      .put(`http://34.82.81.113:3000/students/${id}`, {
        name,
        group,
        mark,
        isDonePr
      })
      .then(response => {
        students.value[index] = {
          ...response.data,
          isEdit: false
        }
      })
  }
}

const createStudent = () => {
  axios
    .post('http://34.82.81.113:3000/students', newStudent.value)
    .then(response => {
      students.value.push({ ...response.data, isEdit: false })
      newStudent.value.name = ''
      newStudent.value.group = ''
      newStudent.value.mark = ''
      newStudent.value.isDonePr = false
    })
}

const convert = async ({ amount, fromCurrency, toCurrency }) => {
  if (amount !== '' && fromCurrency !== '' && toCurrency !== '') {
    if (fromCurrency === toCurrency) {
      converterCurrency.value = amount
    } else {
      const { data } = await axios.get('https://api.monobank.ua/bank/currency')
      if (data) {
        const fromCurrencyCode = cc.code(fromCurrency)
        const toCurrencyCode = cc.code(toCurrency)
        if (Number(toCurrencyCode.number) === 980) {
          const CurrencyRate = data.find(
            rate =>
              rate.currencyCodeA === Number(fromCurrencyCode.number) &&
              rate.currencyCodeB === Number(toCurrencyCode.number)
          )
          converterCurrency.value = amount * CurrencyRate.rateBuy
        } else if (Number(fromCurrencyCode.number) === 980) {
          const CurrencyRate = data.find(
            rate =>
              rate.currencyCodeA === Number(toCurrencyCode.number) &&
              rate.currencyCodeB === 980
          )
          converterCurrency.value = amount / CurrencyRate.rateSell
        } else {
          const fromCurrencyRate = data.find(
            rate =>
              rate.currencyCodeA === Number(fromCurrencyCode.number) &&
              rate.currencyCodeB === 980
          )
          const toCurrencyRate = data.find(
            rate =>
              rate.currencyCodeA === Number(toCurrencyCode.number) &&
              rate.currencyCodeB === 980
          )
          converterCurrency.value =
            (amount * fromCurrencyRate.rateBuy) / toCurrencyRate.rateSell
        }
      }
    }
  }
}

onMounted(() => {
  fetchStudents()
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

.center {
  text-align: center;
}

.red {
  text-decoration-line: none;
  color: red;
}

.black {
  text-decoration-line: none;
  color: black;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th {
  color: black;
  background-color: #f2f2f2;
  padding: 8px;
}

tr {
  border-bottom: 1px solid #ddd;
}

td {
  padding: 8px;
}

.delButton {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
}

.delButton:hover {
  background-color: #d32f2f;
}

.editButton {
  background-color: #3682f4;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
}

.editButton:hover {
  background-color: #2f68d3;
}

.student-form {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  color: black;
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin: 10px 0;
}

.form-group label {
  display: block;
  font-weight: bold;
}

.form-group input[type='text'],
.form-group input[type='number'],
.form-group select {
  width: 80%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group input[type='checkbox'] {
  margin-right: 5px;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}

.currency-converter {
  max-width: 300px;
  margin: 20px auto;
  padding: 10px;
  color: black;
  background-color: #f3f3f3;
  border-radius: 5px;
}

.currency-converter label {
  display: block;
  font-size: 18px;
  margin-bottom: 5px;
}

.currency-converter select,
.currency-converter input {
  width: 80%;
  padding: 5px;
  margin-bottom: 10px;
}

.currency-converter button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.currency-converter button:hover {
  background-color: #0056b3;
}
</style>
