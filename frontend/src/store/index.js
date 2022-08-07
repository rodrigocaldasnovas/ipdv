import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persist-indexeddb'
import { getField, updateField } from 'vuex-map-fields'
import centrodecustos from './centrodecustos'
import departamentos from './departamentos'
import cargos from './cargos'
import usuarios from './usuarios'

Vue.use(Vuex)

const usuario = {
  id: 0,
  nome: '',
  username: '',
  token: ''
}

export default new Vuex.Store({
  state: {
    usuario,
    spinner: {
      show: false,
      message: '',
      time: 0
    },
    errorShow: false,
    errorMsg: ''
  },
  getters: {
    getField
  },
  mutations: {
    updateField,
    setStartSpinner (state, payload) {
      console.log('commit', payload, state.spinner.show)
      state.spinner.message = payload
      state.spinner.show = true
      console.log('commit', payload, state.spinner.show)
    },
    setStopSpinner (state) {
      state.spinner.message = ''
      state.spinner.show = false
    },
    setStartMsg (state, payload) {
      console.log('setMsg')
      state.errorMsg = payload.errorMsg
      state.errorShow = payload.errorShow
    },
    setLogout (state, payload) {
      state.usuario.token = ''
      state.usuario.nome = ''
      state.usuario.username = ''
    }
  },
  actions: {
    actionLogout (context) {
      localStorage.clear()
      context.commit('setLogout')
    },
    actionMsg (context, payload) {
      context.commit('setStartMsg', payload)
    },
    actionStartSpinner (context, payload) {
      context.commit('setStartSpinner', payload)
    },
    actionStopSpinner (context, payload) {
      console.log('pedido stop')
      context.commit('setStopSpinner')
    }
  },
  modules: {
    centrodecustos, departamentos, cargos, usuarios
  }
  // ,
  // plugins: [createPersistedState()]
})
