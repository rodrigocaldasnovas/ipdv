<template>
  <ul class="pagination justify-content-center justify-content-md-start" v-if="paginas">
      <li class="page-item" v-for="(pag,index) in paginas" :key="index" >
        <a class="page-link" :class="{bold:pag === value}" href="#" @click.prevent="setPagina(pag)" >{{pag}}</a>
      </li>
  </ul>
</template>

<script>
export default {
  props: ['value', 'paginas', 'action'],
  methods: {
    setPagina (pagina) {
      console.log(pagina)
      this.$emit('input', pagina)
      this.action()
    }
  }
}
</script>

<style>
.bold {
  color: red;
  font-weight: bold;
}
</style>
