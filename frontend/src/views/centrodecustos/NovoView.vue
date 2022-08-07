<template>

                                    <div class="nk-block ">

                                        <div class="row g-gs">
                                            <div class="col-lg-6">
                                                <div class="card h-100">
                                                    <div class="card-inner">
                                                      <div class="card-head">
                                                        <h5 class="card-title">Novo Centro de Custos</h5>
                                                      </div>
                                                        <div class="example-alert" v-show="errorShow">
                                                          <div class="alert alert-fill alert-danger alert-dismissible alert-icon" >
                                                            <em class="icon ni ni-cross-circle"></em> <strong>{{ errorMsg }}</strong>  <button class="close" data-dismiss="alert"></button>
                                                          </div>
                                                        </div>
                                                        <form @submit.prevent="adicione">
                                                            <div class="form-group">
                                                                <label class="form-label" for="full-name">Nome</label>
                                                                <div class="form-control-wrap">
                                                                    <input type="text" class="form-control" id="full-name" v-model="nome">
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <button type="submit" class="btn btn-lg btn-primary" >Salvar</button>
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
import { mapActions, mapState } from 'vuex'
import { mapFields } from 'vuex-map-fields'
export default {
  methods: {
    ...mapActions('centrodecustos', ['actionListagem', 'actionSalve']),
    adicione () {
      this.actionSalve()
      // this.showMessagem(message)
    }
    // ,
    // showMessagem (message) {
    //   this.errorMsg = message
    //   this.errorShow = true
    //   setTimeout(() => {
    //     this.errorShow = false
    //   }, 7000)
    // }
  },
  computed: {
    // ...mapFields(['errorMsg', 'errorShow']),
    ...mapState('centrodecustos', ['errorMsg', 'errorShow']),
    ...mapFields('centrodecustos', ['centrodecusto.nome'])
  }
}
</script>

<style>
.btn-danger {
  margin-left: 15px;
}
</style>
