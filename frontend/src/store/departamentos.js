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
    centro_de_custos_id: 0,
    departamentos: [],
    departamento: {},
    departamentosTodos: [],
    modo: 'listagem'
  },
  getters: {
    getField
  },
  mutations: {
    updateField,
    setNovo (state) {
      state.departamento = {}
      state.errorShow = false
      state.modo = 'novo'
    },
    setListagem (state) {
      state.departamento = {}
      state.errorShow = false
      state.modo = 'listagem'
    },
    setPesquisaResponse (state, payload) {
      console.log(payload)
      state.qtde = payload.count
      state.departamentos = payload.rows
      state.pagina = payload.pagina
      state.porpagina = payload.porpagina
      state.paginas = payload.paginas
    },
    setAlterar (state, payload) {
      state.departamento = payload
      state.errorShow = false
      state.modo = 'alterar'
    },
    setExcluir (state, payload) {
      state.departamento = payload
      state.errorShow = false
      state.modo = 'excluir'
    },
    setDepartamentosTodos (state, payload) {
      state.departamentosTodos = payload
    }
  },
  actions: {
    async actionExclua (context) {
      try {
        const result = await axios.delete('departamentos/' + context.state.departamento.id)
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
        const result = await axios.put('departamentos/' + context.state.departamento.id, context.state.departamento)
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
      context.dispatch('centrodecustos/actionTodos', '', { root: true })
      context.commit('setAlterar', payload)
    },
    actionExcluir (context, payload) {
      context.dispatch('centrodecustos/actionTodos', '', { root: true })
      context.commit('setExcluir', payload)
    },
    actionNovo (context) {
      context.dispatch('centrodecustos/actionTodos', '', { root: true })
      context.commit('setNovo')
    },
    actionListagem (context) {
      context.commit('setListagem')
    },
    async actionPesquise (context) {
      context.commit('setListagem')
      try {
        const result = await axios.get('departamentos/pesquisa',
          {
            params: {
              pagina: context.state.pagina,
              porpagina: context.state.porpagina,
              nome: context.state.nome,
              centro_de_custos_id: context.state.centro_de_custos_id
            }
          })
        if (result.data.response) {
          context.dispatch('centrodecustos/actionTodos', '', { root: true })
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
        const result = await axios.post('departamentos/novo', context.state.departamento)
        console.log(result)
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
    async actionTodos (context) {
      try {
        const result = await axios.get('departamentos/todos')
        if (result.data.response) {
          context.commit('setDepartamentosTodos', result.data.payload)
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
