<template>
  <div class="home">
    <CategoryAdmin/>
  </div>
</template>

<script>
// @ is an alias to /src
import CategoryAdmin from '@/components/CategoryAdmin.vue'

export default {
  name: 'CategoryAdminView',
  components: {
    CategoryAdmin
  }
}
</script>
