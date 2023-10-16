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

new Vue({
  el: '#app',
  data: {
    quotes: quotesArray,
    isAuthor: '',
    sortedQuotes: []
  },
  computed: {
    filteredQuotes: function () {
      return this.quotes.filter(e => {
        return Boolean(this.isAuthor) == Boolean(e.source)
      })
    }
  },
  methods: {
    sortBySource () {
      this.sortedQuotes = this.quotes
        .slice()
        .sort((a, b) => (a.source > b.source ? 1 : -1))
    }
  }
})
