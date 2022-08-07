<template>

                    <div class="nk-block">
                        <div class="card card-stretch">
                            <div class="card-inner-group">
                                <div class="card-inner position-relative card-tools-toggle">
                                    <div class="">
                                        <div class=" ">
                                          <div class="row">
                                            <div class="col-md-5">
                                              <div class="form-control-wrap">
                                                  <input type="text" class="form-control" id="full-name" placeholder="nome ou parte..."  v-model="nome">
                                              </div>
                                            </div>
                                            <div class="col-md-5">
                                              <select class="form-control" v-model="centro_de_custos_id">
                                                <option value="0">Qualquer Centro de Custo</option>
                                                <option v-for="(centro, index) in centrodecustoTodos" :key="index" :value="centro.id">{{centro.nome}}</option>
                                              </select>
                                            </div>

                                            <div class="col-md-2">
                                              <button type="submit" class="btn btn-primary " @click="actionPesquise">pesquise</button>
                                            </div>
                                          </div>
                                        </div><!-- .card-tools -->
                                    </div><!-- .card-title-group -->

                                </div><!-- .card-inner -->
                                <div class="card-inner p-0">
                                    <div class="nk-tb-list nk-tb-ulist is-compact">
                                        <div class="nk-tb-item nk-tb-head">
                                            <div class="nk-tb-col"><span class="sub-text">Código</span></div>
                                            <div class="nk-tb-col"><span class="sub-text">Nome</span></div>
                                            <div class="nk-tb-col"><span class="sub-text"></span></div>
                                        </div><!-- .nk-tb-item -->
                                        <div class="nk-tb-item" v-for="(departamento, index) in departamentos" :key="index">
                                            <div class="nk-tb-col tb-col-md">
                                              <span>{{departamento.id}}</span>
                                            </div>
                                            <div class="nk-tb-col tb-col-md">
                                              <span>{{departamento.nome}}</span>
                                            </div>
                                            <div class="nk-tb-col ajuste-direita">
                                              <button class="btn btn-primary btn-sm btn-actions" @click="actionAlterar(departamento)">alterar</button>
                                              <button class="btn btn-primary btn-sm btn-actions" @click="actionExcluir(departamento)">Excluir</button>
                                            </div>
                                        </div><!-- .nk-tb-item -->
                                    </div><!-- .nk-tb-list -->
                                </div><!-- .card-inner -->
                                <div class="card-inner ajuste-card-inner">
                                    <comp-paginate v-model="pagina" :paginas="paginas" :action="actionPesquise"></comp-paginate>
                                    <div class="nk-block-des text-soft">
                                    <p>Voce tem {{qtde}} de departamento de custos cadastrados .</p>
                                </div>
                                </div><!-- .card-inner -->
                            </div><!-- .card-inner-group -->
                        </div><!-- .card -->
                    </div><!-- .nk-block -->

</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import CompPaginate from '@/components/CompPaginate.vue'
export default {
  components: {
    CompPaginate
  },
  methods: {
    ...mapActions('departamentos', ['actionPesquise', 'actionAlterar', 'actionExcluir'])
  },
  computed: {
    ...mapFields('departamentos', ['qtde', 'departamentos', 'pagina', 'paginas', 'nome', 'centro_de_custos_id']),
    ...mapFields('centrodecustos', ['centrodecustoTodos'])
  }
}
</script>

<style>
.ajuste-card-inner {
  display: flex;
  justify-content: space-between;
}
.ajuste-direita {
  display: flex;
  justify-content: flex-end;
}
.btn-actions {
  margin-right: 5px;
}
</style>
