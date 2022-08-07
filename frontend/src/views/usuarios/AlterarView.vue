<template>
  <div class="nk-block ">

    <div class="row g-gs">
        <div class="col-lg-6">
            <div class="card h-100">
                <div class="card-inner">
                  <div class="card-head">
                    <h5 class="card-title">Alterar Centro de Custos</h5>
                  </div>
                    <div class="example-alert" v-show="errorShow">
                      <div class="alert alert-fill alert-danger alert-dismissible alert-icon" >
                        <em class="icon ni ni-cross-circle"></em> <strong>{{ errorMsg }}</strong>  <button class="close" data-dismiss="alert"></button>
                      </div>
                    </div>
                    <form @submit.prevent="adicione">
                      <div class="form-group">
                          <label class="form-label" for="full-name">Código</label>
                          <div class="form-control-wrap">
                              <input type="text" class="form-control" id="full-name" :value="id" disabled>
                          </div>
                      </div>
                      <div class="form-group">
                            <label class="form-label" for="full-name">Cargo</label>
                            <div class="form-control-wrap">
                                <select class="form-control" v-model="cargos_id">
                                  <option v-for="(cargo, index) in cargosTodos" :key="index" :value="cargo.id">{{cargo.nome}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="full-name">Departamento</label>
                            <div class="form-control-wrap">
                                <select class="form-control" v-model="departamentos_id">
                                  <option v-for="(departamento, index) in departamentosTodos" :key="index" :value="departamento.id">{{departamento.nome}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="full-name">Nome</label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control" id="full-name" v-model="nome">
                            </div>
                        </div>
                          <div class="form-group">
                            <label class="form-label" for="full-name">Usuário</label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control" id="full-name" :value="username" disabled>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="full-name">Senha</label>
                            <div class="form-control-wrap">
                                <input type="password" class="form-control" id="full-name" v-model="password">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="full-name">Confirme senha</label>
                            <div class="form-control-wrap">
                                <input type="password" class="form-control" id="full-name" v-model="confirm_password">
                            </div>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-lg btn-primary" @click="actionAtualize">Atualize</button>
                            <div class="btn btn-lg btn-danger" @click="actionListagem">Cancelar</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-lg-6">

        </div>
    </div>
  </div><!-- .nk-block -->

</template>

<script>
import { mapActions } from 'vuex'
import { mapFields } from 'vuex-map-fields'
export default {
  data: () => {
    return {
      errorMsg: '',
      errorShow: false
    }
  },
  methods: {
    ...mapActions('usuarios', ['actionListagem', 'actionAtualize']),
    async adicione () {
      const message = await this.actionAtualize()
      this.showMessagem(message)
    },
    showMessagem (message) {
      this.errorMsg = message
      this.errorShow = true
      setTimeout(() => {
        this.errorShow = false
      }, 7000)
    }
  },
  computed: {
    ...mapFields('usuarios', ['usuario.nome', 'usuario.cargos_id', 'usuario.id',
      'usuario.departamentos_id', 'usuario.username', 'usuario.password', 'usuario.confirm_password']),
    ...mapFields('cargos', ['cargosTodos']),
    ...mapFields('departamentos', ['departamentosTodos'])
  }
}
</script>

<style>
.btn-danger {
  margin-left: 15px;
}
</style>
