import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
var ls = new SecureLS({ isCompression: false })

const state = {
  count: 0,
  theme: 'light'
}

const mutations = {
  setTheme (state, theme) {
    state.selectedTheme = theme
  },
  setCount (state, count) {
    state.count = count
  }
}

const getters = {
  getCount: state => state.count
}

export default createStore({
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ],
  state,
  getters,
  mutations
})
