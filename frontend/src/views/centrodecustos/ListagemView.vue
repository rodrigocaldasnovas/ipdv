<template>

                    <div class="nk-block">
                        <div class="card card-stretch">
                            <div class="card-inner-group">
                                <div class="card-inner position-relative card-tools-toggle">
                                    <div class="card-title-group">
                                        <div class="card-tools mr-n1">
                                          <div class="row">
                                            <div class="col-md-9">
                                              <div class="form-control-wrap">
                                                  <input type="text" class="form-control" id="full-name" placeholder="nome ou parte..."  v-model="nome">
                                              </div>
                                            </div>
                                            <div class="col-md-3">
                                              <button type="submit" class="btn btn-primary " @click="actionPesquise">pesquise</button>
                                            </div>
                                          </div>
                                        </div><!-- .card-tools -->
                                        <div class="card-tools ">

                                        </div><!-- .card-tools -->
                                    </div><!-- .card-title-group -->
                                    <div class="card-search search-wrap" data-search="search">
                                        <div class="card-body">
                                            <div class="search-content">
                                                <a href="#" class="search-back btn btn-icon toggle-search" data-target="search"><em class="icon ni ni-arrow-left"></em></a>
                                                <input type="text" class="form-control border-transparent form-focus-none" placeholder="Search by user or email">
                                                <button class="search-submit btn btn-icon"><em class="icon ni ni-search"></em></button>
                                            </div>
                                        </div>
                                    </div><!-- .card-search -->
                                </div><!-- .card-inner -->
                                <div class="card-inner p-0">
                                    <div class="nk-tb-list nk-tb-ulist is-compact">
                                        <div class="nk-tb-item nk-tb-head">
                                            <div class="nk-tb-col"><span class="sub-text">Código</span></div>
                                            <div class="nk-tb-col"><span class="sub-text">Nome</span></div>
                                            <div class="nk-tb-col"><span class="sub-text"></span></div>
                                        </div><!-- .nk-tb-item -->
                                        <div class="nk-tb-item" v-for="(centro, index) in centrosdecustos" :key="index">
                                            <div class="nk-tb-col tb-col-md">
                                              <span>{{centro.id}}</span>
                                            </div>
                                            <div class="nk-tb-col tb-col-md">
                                              <span>{{centro.nome}}</span>
                                            </div>
                                            <div class="nk-tb-col ajuste-direita">
                                              <button class="btn btn-primary btn-sm btn-actions" @click="actionAlterar(centro)">alterar</button>
                                              <button class="btn btn-primary btn-sm btn-actions" @click="actionExcluir(centro)">Excluir</button>
                                            </div>
                                        </div><!-- .nk-tb-item -->
                                    </div><!-- .nk-tb-list -->
                                </div><!-- .card-inner -->
                                <div class="card-inner ajuste-card-inner">
                                    <comp-paginate v-model="pagina" :paginas="paginas" :action="actionPesquise"></comp-paginate>
                                    <div class="nk-block-des text-soft">
                                    <p>Voce tem {{qtde}} de centro de custos cadastrados .</p>
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
    ...mapActions('centrodecustos', ['actionPesquise', 'actionAlterar', 'actionExcluir'])
  },
  computed: {
    ...mapFields('centrodecustos', ['qtde', 'centrosdecustos', 'pagina', 'paginas', 'nome'])
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
