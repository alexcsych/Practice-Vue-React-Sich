import { createApp, onMounted, ref } from 'vue'
import axios from 'axios'
const cc = require('currency-codes')

createApp({
  setup () {
    let students = ref('')
    let search = ref('')
    const newStudent = ref({
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

    onMounted(() => {
      axios.get('http://34.82.81.113:3000/students').then(data => {
        console.log(data.data)
        students.value = data.data
      })
    })

    const deleteStudent = newIndex => {
      students.value.splice(newIndex, 1)
    }

    const createStudent = newStudent => {
      students.value.push({ ...newStudent })
      newStudent.name = ''
      newStudent.group = ''
      newStudent.mark = ''
      newStudent.isDonePr = false
    }

    const convert = async ({ amount, fromCurrency, toCurrency }) => {
      if (amount !== '' && fromCurrency !== '' && toCurrency !== '') {
        if (fromCurrency === toCurrency) {
          converterCurrency.value = amount
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

    return {
      students,
      search,
      newStudent,
      currencies,
      convertor,
      converterCurrency,
      deleteStudent,
      createStudent,
      convert
    }
  }
}).mount('#app')
