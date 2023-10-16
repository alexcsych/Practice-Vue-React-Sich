var quotesArray = [
  {
    quote: 'This is just a Quote1This is just a Quote1',
    source: 'Christopher'
  },
  {
    quote: 'This is just a Quote2',
    source: 'Martin'
  },
  {
    quote: 'This is just a Quote3',
    source: 'Dennis'
  },
  {
    quote: 'This is just a Quote4',
    source: ''
  },
  {
    quote: 'This is just a Quote5',
    source: ''
  }
]

const { createApp, ref, computed } = Vue
createApp({
  setup () {
    const quotes = ref(quotesArray)
    let isAuthor = ref('')
    let sortedQuotes = ref([])

    const filteredQuotes = computed(() => {
      return [...quotes.value].filter(e => {
        return Boolean(isAuthor.value) == Boolean(e.source)
      })
    })

    const sortBySource = () => {
      sortedQuotes.value = [...quotes.value]
        .slice()
        .sort((a, b) => (a.source > b.source ? 1 : -1))
    }
    return { quotes, isAuthor, sortedQuotes, filteredQuotes, sortBySource }
  }
}).mount('#app')

// new Vue({
//   el: '#app',
//   data: {
//     quotes: quotesArray,
//     isAuthor: '',
//     sortedQuotes: []
//   },
//   computed: {
//     filteredQuotes: function () {
//       return this.quotes.filter(e => {
//         return Boolean(this.isAuthor) == Boolean(e.source)
//       })
//     }
//   },
//   methods: {
//     sortBySource () {
//       this.sortedQuotes = this.quotes
//         .slice()
//         .sort((a, b) => (a.source > b.source ? 1 : -1))
//     }
//   }
// })
