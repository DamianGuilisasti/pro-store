<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Admin from "./components/Admin";
import axios from "axios";

export default {
  name: "App",

  components: {
    Admin,
  },

  data: () => ({
    //
  }),

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