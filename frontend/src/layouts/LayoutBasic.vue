<template>
  <div class="nk-body bg-lighter npc-default has-sidebar ">
     <div class="nk-app-root">
        <!-- main @s -->
        <div class="nk-main ">
            <!-- sidebar @s -->
            <menu-sidebar></menu-sidebar>
            <!-- sidebar @e -->
            <!-- wrap @s -->
            <div class="nk-wrap ">
                <!-- main header @s -->
                <page-header></page-header>
                <!-- main header @e -->
                <!-- content @s -->
                <div class="nk-content ">
                  <slot />
                </div>
                <!-- content @e -->
                <!-- footer @s -->
                <page-footer></page-footer>
                <!-- footer @e -->
            </div>
            <!-- wrap @e -->
        </div>
        <!-- main @e -->
    </div>
  </div>
</template>

<script>
import MenuSidebar from '@/components/MenuSidebar.vue'
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
export default {
  components: {
    MenuSidebar, PageHeader, PageFooter
  }
}
</script>

<style>

</style>
