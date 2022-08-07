<template>

                    <div class="nk-block">
                        <div class="card card-stretch">
                            <div class="card-inner-group">
                                <div class="card-inner position-relative card-tools-toggle">
                                    <div class="">
                                        <div class=" ">
                                          <div class="row">
                                            <div class="col-md-3">
                                              <div class="form-control-wrap">
                                                  <input type="text" class="form-control" id="full-name" placeholder="nome ou parte..."  v-model="nome">
                                              </div>
                                            </div>
                                            <div class="col-md-3">
                                              <select class="form-control" v-model="departamentos_id">
                                                <option value="0">Qualquer Departamento</option>
                                                <option v-for="(departamento, index) in departamentosTodos" :key="index" :value="departamento.id">{{departamento.nome}}</option>
                                              </select>
                                            </div>
                                            <div class="col-md-3">
                                              <select class="form-control" v-model="cargos_id">
                                                <option value="0">Qualquer Cargo</option>
                                                <option v-for="(cargo, index) in cargosTodos" :key="index" :value="cargo.id">{{cargo.nome}}</option>
                                              </select>
                                            </div>

                                            <div class="col-md-3">
                                              <button type="submit" class="btn btn-primary btn-block" @click="actionPesquise">pesquise</button>
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
                                        <div class="nk-tb-item" v-for="(usuario, index) in usuarios" :key="index">
                                            <div class="nk-tb-col tb-col-md">
                                              <span>{{usuario.id}}</span>
                                            </div>
                                            <div class="nk-tb-col tb-col-md">
                                              <span>{{usuario.nome}}</span>
                                            </div>
                                            <div class="nk-tb-col ajuste-direita">
                                              <button class="btn btn-primary btn-sm btn-actions" @click="actionAlterar(usuario)">alterar</button>
                                              <button class="btn btn-primary btn-sm btn-actions" @click="actionExcluir(usuario)">Excluir</button>
                                            </div>
                                        </div><!-- .nk-tb-item -->
                                    </div><!-- .nk-tb-list -->
                                </div><!-- .card-inner -->
                                <div class="card-inner ajuste-card-inner">
                                    <comp-paginate v-model="pagina" :paginas="paginas" :action="actionPesquise"></comp-paginate>
                                    <div class="nk-block-des text-soft">
                                    <p>Voce tem {{qtde}} de usuario de custos cadastrados .</p>
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
    ...mapActions('usuarios', ['actionPesquise', 'actionAlterar', 'actionExcluir'])
  },
  computed: {
    ...mapFields('usuarios', ['qtde', 'usuarios', 'pagina', 'paginas', 'nome', 'departamentos_id', 'cargos_id']),
    ...mapFields('departamentos', ['departamentosTodos']),
    ...mapFields('cargos', ['cargosTodos'])
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
