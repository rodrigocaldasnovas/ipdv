<template>
  <div class="nk-app-root">
    <!-- main @s -->
    <div class="nk-main ">
      <!-- wrap @s -->
      <div class="nk-wrap nk-wrap-nosidebar">
        <!-- content @s -->
        <div class="nk-content ">
          <div class="nk-block nk-block-middle nk-auth-body  wide-xs">
            <div class="brand-logo pb-4 text-center">
              <a href="html/index.html" class="logo-link">
                <img class=" logo-img logo-img-lg" :src="'./images/ipdv.png'"
                  alt="logo">

              </a>
            </div>
            <div class="card">
              <div class="card-inner card-inner-lg">
                <div class="nk-block-head">
                  <div class="nk-block-head-content">
                    <h4 class="nk-block-title">Login</h4>

                  </div>
                </div>
                <form @submit.prevent="login">
                  <div class="example-alert" v-if="errorShow">
                    <div class="alert alert-fill alert-danger alert-dismissible alert-icon">
                      <em class="icon ni ni-cross-circle"></em> <strong>{{ errorMsg }}</strong>  <button class="close" data-dismiss="alert"></button>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="form-label-group">
                      <label class="form-label" for="default-01">Usuário</label>
                    </div>
                    <input type="text" class="form-control form-control-lg" id="default-01"
                      placeholder="Entre com seu usuário" @input="handlerInputs" v-model="form.username">
                  </div>
                  <div class="form-group">
                    <div class="form-label-group">
                      <label class="form-label" for="password">Senha</label>
                    </div>
                    <div class="form-control-wrap">

                      <input type="password" class="form-control form-control-lg" id="password"
                        placeholder="Entre com sua senha" @input="handlerInputs" v-model="form.password">
                    </div>
                  </div>
                  <div class="form-group">
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
                  </div>
                </form>

              </div>
            </div>
          </div>

        </div>
        <!-- wrap @e -->
      </div>
      <!-- content @e -->
    </div>
    <!-- main @e -->
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import axios from '../service/axios'
export default {
  data: () => {
    return {
      enviando: false,
      errorMsg: '',
      errorShow: false,
      form: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapFields([
      'usuario.id', 'usuario.nome', 'usuario.username', 'usuario.token'
    ])
  },
  mounted () {
    console.log('login montado')
    const self = this
    setTimeout(() => {
      console.log('login montado ---')
      self.actionStopSpinner()
    }, 5000)
  },
  methods: {
    ...mapActions(['actionStopSpinner']),
    handlerInputs () {
      this.errorMsg = ''
      this.errorShow = false
    },
    async login () {
      if ((this.form.username === '') || (this.form.password === '')) {
        this.logged = false
        this.errorMsg = 'Preencha Corretamente os Campos'
        this.errorShow = true
        return false
      }
      this.enviando = true
      try {
        const result = await axios.post('usuarios/login', this.form)
        if (result.data.response) {
          this.id = result.data.payload.id
          this.nome = result.data.payload.nome
          this.username = result.data.payload.username
          this.token = result.data.payload.token
          localStorage.setItem('token', result.data.payload.token)
          axios.defaults.headers.common.Authorization = `Bearer ${result.data.payload.token}`
        }
        this.$router.push({ name: 'dashboard' })
      } catch (err) {
        this.errorMsg = err.response.data.message
        this.errorShow = true
      }
    }
  }
}
</script>

<style>
.example-alert {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
