import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
var ls = new SecureLS({ isCompression: false })

const store = createStore({
  state: {
    count: 0,
    theme: 'light'
  },
  mutations: {
    setTheme (state, theme) {
      state.selectedTheme = theme
    },
    setCount: (state, count) => (state.count = count)
  },
  getters: {
    getCount: state => {
      return state.count
    }
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ]
})

export default store
