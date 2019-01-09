import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const layoutTypes = ['default', 'image', 'row']

export const store = new Vuex.Store({
  state: {
    locale: navigator.language || 'en',
    layout: 'default',
    darkMode: false
  },
  mutations: {
    layout(state, layoutType) {
      if (!layoutTypes.includes(layoutType)) return
      state.layout = layoutType
    },
    toggleMode(state) {
      state.darkMode = !state.darkMode
    }
  }
})