<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Admin from './components/Admin';

export default {
  name: 'App',

  components: {
    Admin,
  },

  data: () => ({
    //
  }),
};
</script>
