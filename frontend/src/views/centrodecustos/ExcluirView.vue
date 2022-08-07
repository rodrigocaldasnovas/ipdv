<template>
  <div class="nk-block ">

    <div class="row g-gs">
        <div class="col-lg-6">
            <div class="card h-100">
                <div class="card-inner">
                  <div class="card-head">
                    <h5 class="card-title">Excluindo Centro de Custos</h5>
                  </div>
                    <div class="example-alert" v-show="errorShow">
                      <div class="alert alert-fill alert-danger alert-dismissible alert-icon" >
                        <em class="icon ni ni-cross-circle"></em> <strong>{{ errorMsg }}</strong>  <button class="close" data-dismiss="alert"></button>
                      </div>
                    </div>
                    <form @submit.prevent="exclua">
                        <div class="form-group">
                            <label class="form-label" for="full-name">Código</label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control" id="full-name" :value="id" disabled>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="full-name">Nome</label>
                            <div class="form-control-wrap">
                                <input type="text" class="form-control" id="full-name" :value="nome" disabled>
                            </div>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-lg btn-primary" @click="exclua">Confirme Exclusão</button>
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
    ...mapActions('centrodecustos', ['actionListagem', 'actionExclua']),
    async exclua () {
      const message = await this.actionExclua()
      console.log(message)
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
    ...mapFields('centrodecustos', ['centrodecusto.nome', 'centrodecusto.id'])
  }
}
</script>

<style>
.btn-danger {
  margin-left: 15px;
}
</style>
