<template>

                                    <div class="nk-block ">

                                        <div class="row g-gs">
                                            <div class="col-lg-12">
                                                <div class="card h-100">
                                                    <div class="card-inner" v-show="tela === 'upload'">
                                                      <div class="card-head">
                                                        <h5 class="card-title">Importando usuários...</h5>
                                                      </div>
                                                        <div class="example-alert" v-show="errorShow">
                                                          <div class="alert alert-fill alert-danger alert-dismissible alert-icon" >
                                                            <em class="icon ni ni-cross-circle"></em> <strong>{{ errorMsg }}</strong>  <button class="close" data-dismiss="alert"></button>
                                                          </div>
                                                        </div>
                                                        <form @submit.prevent="uploadSend"  >
                                                            <p>Importação de arquivo csv, com dados dos usuarios na seguinte configuração</p>
                                                            <p>username,nome,cargo,departamento,centro de custos</p>
                                                            <p>conforme modelo abaixo:</p>
                                                            <p>JOAO.SILVA,JOAO DA SILVA,VENDEDOR,VENDAS DIRETAS,VENDAS</p>
                                                            <div class="form-group">
                                                                <label class="form-label" for="full-name">Nome</label>
                                                                <div class="form-control-wrap">
                                                                    <input type="file" ref="file" class="form-control" id="full-name">
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <button type="submit" class="btn btn-lg btn-primary" >Importar</button>
                                                                <div class="btn btn-lg btn-danger" @click="actionListagem">Cancelar</div>
                                                            </div>
                                                        </form>

                                                    </div>
                                                    <div class="card-inner" v-show="tela === 'mensagem'" >
                                                      <div class="card-head">
                                                        <h5 class="card-title">Arquivo Importado de usuários...</h5>
                                                      </div>
                                                        <div class="example-alert" v-show="errorShow">
                                                          <div class="alert alert-fill alert-danger alert-dismissible alert-icon" >
                                                            <em class="icon ni ni-cross-circle"></em> <strong>{{ errorMsg }}</strong>  <button class="close" data-dismiss="alert"></button>
                                                          </div>
                                                        </div>

                                                        <div class="btn btn-lg btn-primary" @click="actionListagem">Voltar a listagem</div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6">

                                            </div>
                                        </div>
                                    </div><!-- .nk-block -->

</template>

<script>
import axios from '@/service/axios'
import { mapActions } from 'vuex'
export default {
  data: () => {
    return {
      errorMsg: '',
      errorShow: false,
      tela: 'upload'
    }
  },
  methods: {
    ...mapActions('usuarios', ['actionListagem']),
    async uploadSend () {
      // eslint-disable-next-line prefer-const
      let dataForm = new FormData()
      dataForm.append('file', this.$refs.file.files[0])
      try {
        const res = await axios.post('usuarios/importacao', dataForm, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if (res.data.response) {
          this.tela = 'mensagem'
        } else {
          this.errorMsg = 'Erro inesperado, tente mais tarde!'
          this.errorShow = true
        }
      } catch (e) {
        this.errorMsg = 'Erro inesperado, tente mais tarde!'
        this.errorShow = true
      }
    }
  }
}
</script>

<style>
.btn-danger {
  margin-left: 15px;
}
</style>
