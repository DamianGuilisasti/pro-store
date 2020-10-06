<template>
  <v-app id="inspire">
    <v-main class="main">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="6" sm="6" md="6">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Ingresar</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }"> </template>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Contraseña"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                  ></v-text-field>

                  <v-flex class="red--text" v-if="errorMessage">
                    {{ errorMessage }}
                  </v-flex>
                  
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="login" color="primary">Ingresar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  props: {
    source: String,
  },
  data: () => ({
    email: "",
    password: "",
    errorMessage: null,
  }),
  methods: {
    login() {
      let me = this;
      axios
        .post("/usuario/login", { email: this.email, password: this.password })
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          this.$store.dispatch("saveToken", data.tokenReturn);
          this.$router.push({ name: "Dashboard" });
        })
        .catch(function (error) {
          if (error.response.status === 404) {
            me.errorMessage =
              "No existe el usuario o las datos ingresados son incorrectos.";
          } else {
            me.errorMessage =
              "Ha ocurrido un error en el servidor, por favor intentarlo nuevamente.";
          }
        });
    },
  },
};
</script>

<style>
.main {
  padding: 0px !important;
}
</style>