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
        <v-list-item link to="/admin/products">
          <v-list-item-action>
            <v-icon>mdi-clipboard-list-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Productos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/admin/clientes">
          <v-list-item-action>
            <v-icon>mdi-account-multiple-check-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Clientes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/admin/usuarios">
          <v-list-item-action>
            <v-icon>mdi-account-group-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/admin/informes">
          <v-list-item-action>
            <v-icon>mdi-finance</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Informes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/admin/personalizacion">
          <v-list-item-action>
            <v-icon>mdi-auto-fix</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Personalización</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/admin/configuracion">
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Configuración</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" item>
          <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify"></v-img>
        </v-avatar>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="shrink">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app>
      <span>Powered by Damián Guilisasti &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {},
  data: () => ({
    drawer: null,
  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>