<template>
  <div class="home">
    <ProductsAdmin/>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductsAdmin from '@/components/ProductsAdmin.vue'

export default {
  name: 'ProductsAdminView',
  components: {
    ProductsAdmin
  }
}
</script>
