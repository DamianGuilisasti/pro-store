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

          <v-list-item link to="/admin/getproducts">
            <v-list-item-action>
              <v-icon>mdi-database-arrow-down-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Obtener Productos</v-list-item-title>
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

          <v-list-item link to="/admin/configuracion/catalogo">
            <v-list-item-action>
              <v-icon>mdi-currency-usd-off</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Catálogo</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

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
      <!--       <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Buscar"
        class="hidden-sm-and-down"
      ></v-text-field> -->
      <v-spacer></v-spacer>

      <div class="toggleWrapper">
        <input
          v-model="switchTheme"
          type="checkbox"
          class="dn"
          id="dn"
          @change="changeTheme"
        />
        <label for="dn" class="toggle">
          <span class="toggle__handler">
            <span class="crater crater--1"></span>
            <span class="crater crater--2"></span>
            <span class="crater crater--3"></span>
          </span>
          <span class="star star--1"></span>
          <span class="star star--2"></span>
          <span class="star star--3"></span>
          <span class="star star--4"></span>
          <span class="star star--5"></span>
          <span class="star star--6"></span>
        </label>
      </div>

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

    <router-view style="padding: 64px" />

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
    switchTheme: null,
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

      if (this.switchTheme === true) {
        me.$vuetify.theme.dark = true;
        localStorage.setItem("blackTheme", true);
      } else {
        me.$vuetify.theme.dark = false;
        localStorage.setItem("blackTheme", false);
      }
    },
    getTheme() {
      const blackTheme = localStorage.getItem("blackTheme");
      let me = this;
      if (blackTheme === "true") {
        me.switchTheme = true;
        me.$vuetify.theme.dark = true;
        localStorage.setItem("blackTheme", true);
      } else {
        me.switchTheme = false;
        me.$vuetify.theme.dark = false;
        localStorage.setItem("blackTheme", false);
      }
    },
    getUserInfo() {
      let me = this;
      let header = { token: this.$store.state.token };
      let configuration = { headers: header };
      let userId = this.$store.state.userDB._id;
      let urlQuery = `usuario/query?_id=${userId}`;
      axios
        .get(urlQuery, configuration)
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
    this.getTheme();
  },
};
</script>

<style lang="scss" scoped>

.toggleWrapper {
  input {
    position: absolute;
    left: -99em;
  }
}

.toggle {
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: 77px;
  height: 36px;
  background-color: #83d8ff;
  border-radius: 90px - 6;
  transition: background-color 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

.toggle__handler {
  display: inline-block;
  position: relative;
  z-index: 1;
  top: 3px;
  left: 3px;
  width: 35px - 6;
  height: 35px - 6;
  background-color: #ffcf96;
  border-radius: 50px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: all 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform: rotate(-45deg);

  .crater {
    position: absolute;
    background-color: #e8cda5;
    opacity: 0;
    transition: opacity 200ms ease-in-out;
    border-radius: 100%;
  }

  .crater--1 {
    top: 18px;
    left: 10px;
    width: 4px;
    height: 4px;
  }

  .crater--3 {
    top: 10px;
    left: 15px;
    width: 8px;
    height: 8px;
  }
}

.star {
  position: absolute;
  background-color: #ffffff;
  transition: all 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  border-radius: 50%;
}

.star--1 {
  top: 10px;
  left: 35px;
  z-index: 0;
  width: 30px;
  height: 3px;
}

.star--3 {
  top: 27px;
  left: 40px;
  z-index: 0;
  width: 30px;
  height: 3px;
}

.star--4,
.star--5,
.star--6 {
  opacity: 0;
  transition: all 300ms 0 cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

.star--4 {
  top: 16px;
  left: 11px;
  z-index: 0;
  width: 2px;
  height: 2px;
  transform: translate3d(3px, 0, 0);
}

input:checked {
  + .toggle {
    background-color: #749dd6;

    &:before {
      color: #749ed7;
    }

    &:after {
      color: #ffffff;
    }

    .toggle__handler {
      background-color: #ffe5b5;
      transform: translate3d(40px, 0, 0) rotate(0);

      .crater {
        opacity: 1;
      }
    }

    .star--1 {
      width: 2px;
      height: 2px;
    }

    .star--3 {
      width: 2px;
      height: 2px;
      transform: translate3d(-7px, 0, 0);
    }

    .star--4,
    .star--5,
    .star--6 {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
    .star--4 {
      transition: all 300ms 200ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    }
    .star--5 {
      transition: all 300ms 300ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    }
    .star--6 {
      transition: all 300ms 400ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
    }
  }
}
</style>

