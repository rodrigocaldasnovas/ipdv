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
    centrosdecustos: [],
    centrodecusto: {},
    centrodecustoTodos: [],
    modo: 'listagem',
    errorShow: false,
    errorMsg: ''
  },
  getters: {
    getField
  },
  mutations: {
    updateField,
    setNovo (state) {
      state.centrodecusto = {}
      state.errorShow = false
      state.modo = 'novo'
    },
    setListagem (state) {
      state.centrodecusto = {}
      state.errorShow = false
      state.modo = 'listagem'
    },
    setPesquisaResponse (state, payload) {
      console.log(payload)
      state.qtde = payload.count
      state.centrosdecustos = payload.rows
      state.pagina = payload.pagina
      state.porpagina = payload.porpagina
      state.paginas = payload.paginas
    },
    setAlterar (state, payload) {
      state.centrodecusto = payload
      state.errorShow = false
      state.modo = 'alterar'
    },
    setExcluir (state, payload) {
      state.centrodecusto = payload
      state.errorShow = false
      state.modo = 'excluir'
    },
    setCentroDeCustosTodos (state, payload) {
      state.centrodecustoTodos = payload
    },
    setStartMsg (state, payload) {
      console.log('setMsg')
      state.errorMsg = payload.errorMsg
      state.errorShow = payload.errorShow
    }
  },
  actions: {
    async actionExclua (context) {
      try {
        const result = await axios.delete('centrodecustos/' + context.state.centrodecusto.id)
        if (result.data.response) {
          context.dispatch('actionPesquise')
          context.commit('setListagem')
          return result.data.message
        }
      } catch (err) {
        if (err.response.data.message === 'Acesso negado') {
          context.dispatch('actionStartSpinner', 'Sua sessão expirou, redirecionando ao login...')
          router.push({ name: 'login' })
        } else {
          return err.response.data.message
        }
      }
    },
    async actionAtualize (context) {
      try {
        const result = await axios.put('centrodecustos/' + context.state.centrodecusto.id, context.state.centrodecusto)
        if (result.data.response) {
          context.dispatch('actionPesquise')
          context.commit('setListagem')
          return result.data.message
        }
      } catch (err) {
        if (err.response.data.message === 'Acesso negado') {
          context.dispatch('actionStartSpinner', 'Sua sessão expirou, redirecionando ao login...')
          router.push({ name: 'login' })
        } else {
          return err.response.data.message
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
        const result = await axios.get('centrodecustos/pesquisa',
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
          context.dispatch('actionStartSpinner', 'Sua sessão expirou, redirecionando ao login...')
          router.push({ name: 'login' })
        } else {
          return err.response.data.message
        }
      }
    },
    async actionSalve (context) {
      try {
        const result = await axios.post('centrodecustos/novo', context.state.centrodecusto)
        console.log(result)
        if (result.data.response) {
          context.dispatch('actionPesquise')
          context.commit('setListagem')
          // return result.data.message
        }
      } catch (err) {
        if (err.response.data.message === 'Acesso negado') {
          context.dispatch('actionStartSpinner', 'Sua sessão expirou, redirecionando ao login...')
          router.push({ name: 'login' })
        } else {
          context.dispatch('actionMsg', {
            errorMsg: err.response.data.message,
            errorShow: true,
            errorTime: 5000
          })
        }
      }
    },
    actionMsg (context, payload) {
      context.commit('setStartMsg', payload)
    },
    async actionTodos (context) {
      console.log('todos')
      try {
        const result = await axios.get('centrodecustos/todos')
        if (result.data.response) {
          context.commit('setCentroDeCustosTodos', result.data.payload)
        }
      } catch (err) {
        if (err.response.data.message === 'Acesso negado') {
          context.dispatch('actionStartSpinner', 'Sua sessão expirou, redirecionando ao login...')
          router.push({ name: 'login' })
        } else {
          return err.response.data.message
        }
      }
    }
  }
}
