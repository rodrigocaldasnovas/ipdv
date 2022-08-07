<template>
  <layout-basic>
    <div class="nk-content ">
      <div class="container-fluid">
            <div class="nk-content-inner">
                <div class="nk-content-body">
                    <div class="nk-block-head nk-block-head-sm">
                        <div class="nk-block-between">
                            <div class="nk-block-head-content">
                                <h3 class="nk-block-title page-title">Usuários</h3>

                            </div><!-- .nk-block-head-content -->
                            <div class="nk-block-head-content">
                                <div class="toggle-wrap nk-block-tools-toggle">
                                    <a href="#" class="btn btn-icon btn-trigger toggle-expand mr-n1" data-target="pageMenu"><em class="icon ni ni-menu-alt-r"></em></a>
                                    <div class="toggle-expand-content" data-content="pageMenu">
                                        <ul class="nk-block-tools g-3" v-show="modo === 'listagem'">
                                          <li>
                                            <a href="#" class="btn btn-white btn-outline-light" @click="actionImportacao">
                                              <em class="icon ni ni-download-cloud"></em><span>Importação</span></a></li>
                                          <li class="nk-block-tools-opt">
                                              <div class="drodown">
                                                  <a href="#"  class="dropdown-toggle btn btn-icon btn-primary" @click="actionNovo"
                                                  data-toggle="dropdown"><em class="icon ni ni-plus"></em></a>

                                              </div>
                                          </li>
                                        </ul>
                                    </div>
                                </div><!-- .toggle-wrap -->
                            </div><!-- .nk-block-head-content -->
                        </div><!-- .nk-block-between -->
                    </div><!-- .nk-block-head -->

                    <listagem-view v-show="modo === 'listagem'"></listagem-view>
                    <novo-view v-show="modo === 'novo'"></novo-view>
                    <alterar-view v-show="modo === 'alterar'"></alterar-view>
                    <excluir-view v-show="modo === 'excluir'"></excluir-view>
                    <importacao-view v-show="modo === 'importacao'"></importacao-view>
                </div>
            </div>
        </div>

    </div>
  </layout-basic>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import LayoutBasic from '@/layouts/LayoutBasic.vue'
import ListagemView from './ListagemView.vue'
import NovoView from './NovoView.vue'
import AlterarView from './AlterarView.vue'
import ExcluirView from './ExcluirView.vue'
import ImportacaoView from './ImportacaoView.vue'
export default {
  data: () => {
    return {
      errorMsg: '',
      errorShow: false
    }
  },
  components: {
    LayoutBasic, ListagemView, NovoView, AlterarView, ExcluirView, ImportacaoView
  },
  computed: {
    ...mapFields('usuarios', ['modo'])
  },
  methods: {
    ...mapActions('usuarios', ['actionPesquise', 'actionNovo', 'actionImportacao'])
  },
  mounted () {
    this.actionPesquise()
  }
}
</script>

<style>

</style>
