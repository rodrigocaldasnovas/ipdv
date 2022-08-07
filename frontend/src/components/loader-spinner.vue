<template>
  <div class="loader-spinner fa-3x" v-show="show">
    <i class="fas fa-circle-notch fa-spin"></i>
    <div>{{ message }}</div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
export default {
  computed: {
    ...mapFields(['spinner.show', 'spinner.message'])
  }
}
</script>

<style lang="scss" scoped>
.loader-spinner {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #e0e0e0;
  color: #37474f;
  z-index: 1000000;
  font-size: 80px;
}
.loader-spinner div {
  font-size: 30px;
}
</style>
