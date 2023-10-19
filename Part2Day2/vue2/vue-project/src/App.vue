<template>
  <div class="center" id="app">
    <h1>Пошук</h1>
    <input type="text" name="search" v-model="search" />
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
            ><td
              :class="
                st.name.includes(search) && search !== '' ? 'red' : 'black'
              "
            >
              {{ st.name }}
            </td>
            <td>{{ st.group }}</td>
            <td>{{ st.mark }}</td>
            <td>
              <input type="checkbox" name="isDonePr" v-model="st.isDonePr" />
              {{ st.isDonePr }}
            </td>
            <td>
              <button class="delButton" @click="deleteStudent(st._id)">
                DELETE
              </button>
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
              <button class="editButton" @click="canselEditStudents(index)">
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

<script>
import axios from 'axios'
import cc from 'currency-codes'

export default {
  data () {
    return {
      students: [],
      search: '',
      newStudent: { name: '', group: '', mark: '', isDonePr: false },
      updateStudent: { name: '', group: '', mark: '', isDonePr: false },
      currencies: ['UAH', 'EUR', 'USD'],
      convertor: {
        amount: '',
        fromCurrency: '',
        toCurrency: ''
      },
      converterCurrency: ''
    }
  },
  mounted () {
    axios.get('http://34.82.81.113:3000/students').then(data => {
      this.students = data.data.map(st => {
        return { ...st, isEdit: false }
      })
    })
  },
  methods: {
    deleteStudent (id) {
      axios.delete(`http://34.82.81.113:3000/students/${id}`).then(data => {
        this.students = this.students.filter(st => st._id !== id)
      })
    },

    editStudent (index) {
      const { name, group, mark, isDonePr } = this.students[index]
      this.students[index].updateStudent = {
        name: name,
        group: group,
        mark: mark,
        isDonePr: isDonePr
      }
      this.students[index].isEdit = true
    },

    canselEditStudents (index) {
      this.students[index].isEdit = false
    },

    saveStudent (index, id) {
      const { name, group, mark, isDonePr } = this.students[index].updateStudent
      if (name && group && mark) {
        axios
          .put(`http://34.82.81.113:3000/students/${id}`, {
            name,
            group,
            mark,
            isDonePr
          })
          .then(data => {
            this.students[index] = {
              ...data.data,
              isEdit: false
            }
          })
      }
    },

    createStudent () {
      axios
        .post('http://34.82.81.113:3000/students', this.newStudent)
        .then(data => {
          this.students.push({ ...data.data, isEdit: false })
          this.newStudent.name = ''
          this.newStudent.group = ''
          this.newStudent.mark = ''
          this.newStudent.isDonePr = false
        })
    },

    async convert ({ amount, fromCurrency, toCurrency }) {
      if (amount !== '' && fromCurrency !== '' && toCurrency !== '') {
        if (fromCurrency === toCurrency) {
          this.converterCurrency = amount
        } else {
          const { data } = await axios.get(
            'https://api.monobank.ua/bank/currency'
          )
          if (data) {
            const fromCurrencyCode = cc.code(fromCurrency)
            const toCurrencyCode = cc.code(toCurrency)
            if (Number(toCurrencyCode.number) === 980) {
              const CurrencyRate = data.find(
                rate =>
                  rate.currencyCodeA === Number(fromCurrencyCode.number) &&
                  rate.currencyCodeB === Number(toCurrencyCode.number)
              )
              this.converterCurrency = amount * CurrencyRate.rateBuy
            } else if (Number(fromCurrencyCode.number) === 980) {
              const CurrencyRate = data.find(
                rate =>
                  rate.currencyCodeA === Number(toCurrencyCode.number) &&
                  rate.currencyCodeB === 980
              )
              this.converterCurrency = amount / CurrencyRate.rateSell
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
              this.converterCurrency =
                (amount * fromCurrencyRate.rateBuy) / toCurrencyRate.rateSell
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.center {
  text-align: center;
}

.red {
  color: red;
}

.black {
  color: black;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th {
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
