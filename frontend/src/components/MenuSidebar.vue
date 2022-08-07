<template>
  <div class="nk-sidebar nk-sidebar-fixed is-light " :class="{'is-compact':isCompact}" data-content="sidebarMenu">
    <div class="nk-sidebar-element nk-sidebar-head" >
        <div class="nk-sidebar-brand">
            <a href="html/index.html" class="logo-link nk-sidebar-logo">
              <img class="logo-small logo-img logo-img-small" :src="'./images/ipdv.png'"
               alt="logo-small"/>
            </a>
        </div>
        <div class="nk-menu-trigger mr-n2" @click="menuToggle">
            <a href="#" class="nk-nav-toggle nk-quick-nav-icon d-xl-none" data-target="sidebarMenu"><em class="icon ni ni-arrow-left"></em></a>
            <a href="#" class="nk-nav-compact nk-quick-nav-icon d-none d-xl-inline-flex" data-target="sidebarMenu"><em class="icon ni ni-menu"></em></a>
        </div>
    </div><!-- .nk-sidebar-element -->
    <div class="nk-sidebar-element">
        <div class="nk-sidebar-content">
            <div class="nk-sidebar-menu" data-simplebar>
                <ul class="nk-menu">
                    <li class="nk-menu-heading">
                        <h6 class="overline-title text-primary-alt">funções</h6>
                    </li><!-- .nk-menu-item -->
                    <li class="nk-menu-item">
                        <router-link to="/centrodecustos" class="nk-menu-link">
                            <span class="nk-menu-icon"><em class="icon ni ni-growth-fill"></em></span>
                            <span class="nk-menu-text">Centros de custos</span>
                        </router-link>
                    </li><!-- .nk-menu-item -->
                    <li class="nk-menu-item">
                        <router-link to="/departamentos" class="nk-menu-link">
                            <span class="nk-menu-icon"><em class="icon ni ni-growth-fill"></em></span>
                            <span class="nk-menu-text">Departamentos</span>
                        </router-link>
                    </li><!-- .nk-menu-item -->
                    <li class="nk-menu-item">
                        <router-link to="/cargos" class="nk-menu-link">
                            <span class="nk-menu-icon"><em class="icon ni ni-growth-fill"></em></span>
                            <span class="nk-menu-text">Cargos</span>
                        </router-link>
                    </li><!-- .nk-menu-item -->
                    <li class="nk-menu-item">
                        <router-link to="/usuarios" class="nk-menu-link">
                            <span class="nk-menu-icon"><em class="icon ni ni-growth-fill"></em></span>
                            <span class="nk-menu-text">Usuários</span>
                        </router-link>
                    </li><!-- .nk-menu-item -->
                    <li class="nk-menu-item">
                        <a href="#" class="nk-menu-link" @click="logout">
                            <span class="nk-menu-icon"><em class="icon ni ni-growth-fill"></em></span>
                            <span class="nk-menu-text">Sair</span>
                        </a>
                    </li><!-- .nk-menu-item -->
                </ul><!-- .nk-menu -->
            </div><!-- .nk-sidebar-menu -->
        </div><!-- .nk-sidebar-content -->
    </div><!-- .nk-sidebar-element -->
  </div>

</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      isCompact: false
    }
  },
  methods: {
    ...mapActions(['actionLogout']),
    menuToggle () {
      this.isCompact = !this.isCompact
    },
    logout () {
      this.actionLogout()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style>
.nk-sidebar-head {
  padding: 0px 24px 14px 24px !important;
  margin-left: -15px;
}
</style>
