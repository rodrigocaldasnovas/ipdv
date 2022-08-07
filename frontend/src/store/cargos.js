import axios from '@/service/axios'
import { getField, updateField } from 'vuex-map-fields'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    qtde: 0,
    pagina: 1,
    paginas: 0,
    porpagina: 10,
    nome: '',
    cargos: [],
    cargo: {},
    cargosTodos: [],
    modo: 'listagem'
  },
  getters: {
    getField
  },
  mutations: {
    updateField,
    setNovo (state) {
      state.cargo = {}
      state.errorShow = false
      state.modo = 'novo'
    },
    setListagem (state) {
      state.cargo = {}
      state.errorShow = false
      state.modo = 'listagem'
    },
    setPesquisaResponse (state, payload) {
      state.qtde = payload.count
      state.cargos = payload.rows
      state.pagina = payload.pagina
      state.porpagina = payload.porpagina
      state.paginas = payload.paginas
    },
    setAlterar (state, payload) {
      state.cargo = payload
      state.errorShow = false
      state.modo = 'alterar'
    },
    setExcluir (state, payload) {
      state.cargo = payload
      state.errorShow = false
      state.modo = 'excluir'
    },
    setCargosTodos (state, payload) {
      state.cargosTodos = payload
    }

  },
  actions: {
    async actionExclua (context) {
      try {
        const result = await axios.delete('cargos/' + context.state.cargo.id)
        if (result.data.response) {
          context.dispatch('actionPesquise')
          context.commit('setListagem')
          return result.data.message
        }
      } catch (err) {
        if (err.response.data.message === 'Acesso negado') {
          context.dispatch('actionStartSpinner', 'Sua sessão expirou, redirecionando ao login...', { root: true })
          router.push({ name: 'login' })
        }
      }
    },
    async actionAtualize (context) {
      try {
        const result = await axios.put('cargos/' + context.state.cargo.id, context.state.cargo)
        if (result.data.response) {
          context.dispatch('actionPesquise')
          context.commit('setListagem')
          return result.data.message
        }
      } catch (err) {
        if (err.response.data.message === 'Acesso negado') {
          context.dispatch('actionStartSpinner', 'Sua sessão expirou, redirecionando ao login...', { root: true })
          router.push({ name: 'login' })
        }
      }
    },
    actionAlterar (context, payload) {
      context.commit('setAlterar', payload)
    },
    actionExcluir (context, payload) {
      context.commit('setExcluir', payload)
    },
    actionNovo (context) {
      context.commit('setNovo')
    },
    actionListagem (context) {
      context.commit('setListagem')
    },
    async actionPesquise (context) {
      context.commit('setListagem')
      try {
        const result = await axios.get('cargos/pesquisa',
          {
            params: {
              pagina: context.state.pagina,
              porpagina: context.state.porpagina,
              nome: context.state.nome
            }
          })
        if (result.data.response) {
          context.commit('setPesquisaResponse', result.data.payload)
        } else {
          // setError ()
        }
      } catch (err) {
        if (err.response.data.message === 'Acesso negado') {
          context.dispatch('actionStartSpinner', 'Sua sessão expirou, redirecionando ao login...', { root: true })
          router.push({ name: 'login' })
        }
      }
    },
    async actionSalve (context) {
      try {
        const result = await axios.post('cargos/novo', context.state.cargo)
        console.log(result)
        if (result.data.response) {
          context.dispatch('actionPesquise')
          context.commit('setListagem')
          return result.data.message
        }
      } catch (err) {
        if (err.response.data.message === 'Acesso negado') {
          context.dispatch('actionStartSpinner', 'Sua sessão expirou, redirecionando ao login...', { root: true })
          router.push({ name: 'login' })
        }
      }
    },
    async actionTodos (context) {
      try {
        const result = await axios.get('cargos/todos')
        if (result.data.response) {
          context.commit('setCargosTodos', result.data.payload)
        }
      } catch (err) {
        if (err.response.data.message === 'Acesso negado') {
          context.dispatch('actionStartSpinner', 'Sua sessão expirou, redirecionando ao login...', { root: true })
          router.push({ name: 'login' })
        }
      }
    }
  }
}
