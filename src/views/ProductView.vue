<template>
  <div class="home">
    <ProductView/>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductView from '@/components/ProductView.vue'

export default {
  name: 'ProductView',
  components: {
    ProductView
  }
}
</script>
