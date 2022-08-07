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
    cargos_id: 0,
    departamentos_id: 0,
    usuarios: [],
    usuario: {},
    modo: 'listagem'
  },
  getters: {
    getField
  },
  mutations: {
    updateField,
    setNovo (state) {
      state.usuario = {}
      state.errorShow = false
      state.modo = 'novo'
    },
    setImportacao (state) {
      state.errorShow = false
      state.modo = 'importacao'
    },
    setListagem (state) {
      state.usuario = {}
      state.errorShow = false
      state.modo = 'listagem'
    },
    setPesquisaResponse (state, payload) {
      console.log(payload)
      state.qtde = payload.count
      state.usuarios = payload.rows
      state.pagina = payload.pagina
      state.porpagina = payload.porpagina
      state.paginas = payload.paginas
    },
    setAlterar (state, payload) {
      state.usuario = payload
      state.errorShow = false
      state.modo = 'alterar'
    },
    setExcluir (state, payload) {
      state.usuario = payload
      state.errorShow = false
      state.modo = 'excluir'
    }
  },
  actions: {
    async actionExclua (context) {
      try {
        const result = await axios.delete('usuarios/' + context.state.usuario.id)
        if (result.data.response) {
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
        const result = await axios.put('usuarios/' + context.state.usuario.id, context.state.usuario)
        if (result.data.response) {
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
      context.dispatch('actionPesquise')
    },
    async actionPesquise (context) {
      context.commit('setListagem')
      try {
        const result = await axios.get('usuarios/pesquisa',
          {
            params: {
              pagina: context.state.pagina,
              porpagina: context.state.porpagina,
              nome: context.state.nome,
              cargos_id: context.state.cargos_id,
              departamentos_id: context.state.departamentos_id
            }
          })
        if (result.data.response) {
          context.dispatch('departamentos/actionTodos', '', { root: true })
          context.dispatch('cargos/actionTodos', '', { root: true })
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
    actionImportacao (context) {
      context.commit('setImportacao')
    },
    async actionSalve (context) {
      try {
        const result = await axios.post('usuarios/novo', context.state.usuario)
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
    }
  }
}
