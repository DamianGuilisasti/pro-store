<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link to="/admin">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/admin/pedidos">
          <v-list-item-action>
            <v-icon>mdi-cart-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Pedidos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group prepend-icon="mdi-clipboard-list-outline">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Productos</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item link to="/admin/productos">
            <v-list-item-action>
              <v-icon>mdi-format-list-numbered</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Ver Productos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="/admin/categorias">
            <v-list-item-action>
              <v-icon>mdi-format-list-bulleted-type</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Categorías</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item link to="/admin/clientes" v-if="isSeller">
          <v-list-item-action>
            <v-icon>mdi-account-multiple-check-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Clientes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/admin/usuarios" v-if="isAdmin">
          <v-list-item-action>
            <v-icon>mdi-account-group-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/admin/gastos" v-if="isAdmin">
          <v-list-item-action>
            <v-icon>mdi-calculator</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Gastos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/admin/informes" v-if="isAdmin">
          <v-list-item-action>
            <v-icon>mdi-finance</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Informes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/admin/personalizacion" v-if="isAdmin">
          <v-list-item-action>
            <v-icon>mdi-auto-fix</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Personalización</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!--         <v-list-item link to="/admin/configuracion">
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Configuración</v-list-item-title>
          </v-list-item-content>
        </v-list-item>-->

        <v-list-group prepend-icon="mdi-cog" v-if="isAdmin">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Configuración</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item link to="/admin/configuracion/redes-sociales">
            <v-list-item-action>
              <v-icon>mdi-link-variant</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Redes Sociales</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="/admin/configuracion/informacion-nosotros">
            <v-list-item-action>
              <v-icon>mdi-information-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Información Nosotros</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-divider></v-divider>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-play</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Ver Tienda</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Pro Store</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Buscar"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>

      <v-switch v-model="switchTheme" @change="changeTheme" inset></v-switch>

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="brown" size="40">
              <span class="white--text headline">{{ initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <span class="white--text headline">{{ initials }}</span>
              </v-avatar>
              <h3 class="pt-4">{{ fullName }}</h3>
              <p class="caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text> Editar cuenta </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="salir"> SALIR </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>
    <div class="mainContent">
      <router-view />
    </div>
    <v-footer app>
      <span
        >Powered by Damián Guilisasti &copy;
        {{ new Date().getFullYear() }}</span
      >
    </v-footer>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  props: {},
  data: () => ({
    switchTheme: false,
    drawer: null,
    user: [],
    initials: "",
  }),
  methods: {
    salir() {
      this.$store.dispatch("exit");
    },
    changeTheme() {
      let me = this;
      if (this.switchTheme) {
        me.$vuetify.theme.dark = true;
      } else {
        me.$vuetify.theme.dark = false;
      }
    },
    getUserInfo() {
      let me = this;
      let userId = this.$store.state.userDB._id;
      let urlQuery = `usuario/query?_id=${userId}`;
      axios
        .get(urlQuery)
        .then(function (response) {
          me.user = response.data;
          me.initials = me.user.name.slice(0, 1) + me.user.lastname.slice(0, 1);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  computed: {
    isAdmin() {
      return (
        this.$store.state.userDB &&
        this.$store.state.userDB.userrole === "Admin"
      );
    },
    isSeller() {
      return (
        this.$store.state.userDB &&
        (this.$store.state.userDB.userrole === "Vendedor" ||
          this.$store.state.userDB.userrole === "Admin")
      );
    },
    fullName() {
      return this.user.name + " " + this.user.lastname;
    },
  },
  created() {
    this.$store.dispatch("autoLogin");
    this.getUserInfo();
  },
};
</script>

<style>
.mainContent {
  padding: 20px;
}
</style>