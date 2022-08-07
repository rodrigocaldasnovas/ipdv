<template>
  <div id="app">
    <loader-spinner></loader-spinner>
    <router-view/>
  </div>
</template>

<script>
import axios from '@/service/axios'
import { mapFields } from 'vuex-map-fields'
import loaderSpinner from './components/loader-spinner.vue'
export default {
  components: { loaderSpinner },
  beforeMount () {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  },
  computed: {
    ...mapFields([
      'usuario.id', 'usuario.nome', 'usuario.username'
    ])
  },
  async mounted () {
    try {
      const result = await axios.get('usuarios/checkusuario')
      if (result.data.response) {
        this.id = result.data.payload.id
        this.nome = result.data.payload.nome
        this.username = result.data.payload.username
      }
      // this.$router.push({ name: 'dashboard' })
    } catch (err) {
      this.errorMsg = err.response.data.message
      this.errorShow = true
    }
  }
}
</script>

<style lang="scss">

</style>
