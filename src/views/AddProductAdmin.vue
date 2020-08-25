<template>
  <div class="home">
    <AddProductAdmin/>
  </div>
</template>

<script>
// @ is an alias to /src
import AddProductAdmin from '@/components/AddProductAdmin.vue'

export default {
  name: 'AddProductAdminView',
  components: {
    AddProductAdmin
  }
}
</script>
