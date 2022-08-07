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
                          <label class="form-label" for="full-name">Centro de custos</label>
                          <div class="form-control-wrap">
                              <select class="form-control" v-model="centro_de_custos_id">
                                <option v-for="(centro, index) in centrodecustoTodos" :key="index" :value="centro.id">{{centro.nome}}</option>
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
    ...mapActions('departamentos', ['actionListagem', 'actionAtualize']),
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
    ...mapFields('departamentos', ['departamento.nome', 'departamento.id', 'departamento.centro_de_custos_id']),
    ...mapFields('centrodecustos', ['centrodecustoTodos'])
  }
}
</script>

<style>
.btn-danger {
  margin-left: 15px;
}
</style>
