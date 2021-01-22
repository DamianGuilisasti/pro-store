<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
    <div class="text-center">
      <!-- se quito el ma-2 -->
      <v-snackbar v-model="snackbar.showing" :color="snackbar.color">
        <p>{{ snackbar.text }}</p>
        <template v-slot:action="{ attrs }">
          <v-btn dark text v-bind="attrs" @click="snackbar.showing = false"
            >Cerrar</v-btn
          >
        </template>
      </v-snackbar>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import Vuex, { mapState } from "vuex";

export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
  computed: {
    ...mapState(["snackbar"]),
  },

  created() {
    this.firstObjetct();
  },
  methods: {
    firstObjetct() {
      let me = this;
      axios
        .get("configuracion/list")
        .then(function (response) {
          if (response.data.length == 0) {
            axios
              .post("configuracion/add", {
                socialMedia: {
                  facebook: "",
                  instagram: "",
                  google: "",
                  twitter: "",
                  youtube: "",
                },
                footerInfo: "",
                aboutInfo: "",
              })
              .then(function (response) {})
              .catch(function (error) {
                console.log(error);
              });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>



