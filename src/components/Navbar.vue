<template>
  <div>
    <v-system-bar hide-on-scroll height="35" absolute class="theme--light px-4" style="margin-top: -64px;">
      <v-btn icon color="red">
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
      <v-btn icon color="red">
        <v-icon>mdi-instagram</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <div>
        <v-icon>mdi-email</v-icon>
        hola@damianguilisasti.com.ar
      </div>
      <div style="margin: 0px 5px">|</div>
      <div>
        <v-icon>mdi-phone</v-icon>
        0341 335 4475
      </div>
    </v-system-bar>
    <v-app-bar app id="appbar" class="mt-35" v-scroll="onScroll">
      <v-toolbar-title>
        <v-img
          src="../assets/Logo Guilisasti.png"
          class="shrink"
          contain
          height="auto"
          width="200px"
      /></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Buscar productos..."
        class="hidden-sm-and-down"
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <div class="hidden-sm-and-down">
        <v-btn href="/" text>
          <span><b>Inicio</b></span>
        </v-btn>
        <v-btn href="/nosotros" text>
          <span><b>Nosotros</b></span>
        </v-btn>
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" href="/productos" text>
              <span><b>Productos</b></span>
            </v-btn>
          </template>

          <v-card class="mx-auto" max-width="300" tile>
            <v-list>
              <v-subheader>Categorías</v-subheader>
              <v-list-item-group v-model="item" color="primary">
                <v-list-item v-for="(item, i) in categories" :key="i">
                  <v-list-item-content>
                    <v-list-item-title
                      @click="goCategory(index, item)"
                      v-text="item.name"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-menu>
        <v-btn href="/contacto" text>
          <span><b>Contacto</b></span>
        </v-btn>
        <v-btn icon color="red">
          <v-badge content="0" value="0" color="green" overlap>
            <v-icon large>mdi-cart</v-icon>
          </v-badge>
        </v-btn>
        <v-btn icon color="red">
          <v-icon large>mdi-account</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      style="position: fixed; top: 0; left: 0"
    >
      <!-- overflow-y: scroll -->
      <v-list-item>
        <v-img
          src="../assets/Logo Guilisasti.png"
          class="shrink"
          contain
          height="auto"
          width="200px"
        />

        <!--         <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content> -->
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-information-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Nosotros</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-format-list-numbered</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Productos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-box-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Contacto</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Ingresar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-badge content="0" value="0" color="green" overlap>
              <v-icon>mdi-cart</v-icon>
            </v-badge>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Carrito</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-credit-card-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Pago</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <div class="ml-4 mt-4">
        <div>
          <v-icon small>mdi-email</v-icon>
          <span style="font-size: 13px">hola@damianguilisasti.com.ar</span>
        </div>
        <div>
          <v-icon small>mdi-phone</v-icon>
          <span style="font-size: 13px">0341 335 4475</span>
        </div>
      </div>

      <div class="ml-4 mt-3">
        <v-btn icon color="red">
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
        <v-btn icon color="red">
          <v-icon>mdi-instagram</v-icon>
        </v-btn>
      </div>
    </v-navigation-drawer>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return { drawer: false, categories: [], item: "" };
  },
  methods: {
    onScroll() {
      if (window.pageYOffset > 0) {
        let appbar = document.getElementById("appbar");
        appbar.classList.remove("mt-35");
      }
    },
    initialize() {
      let me = this;
      axios
        .get("configuracion/list")
        .then(function (response) {
          me.configurationArray = response.data[0];
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getCategories() {
      let me = this;
      axios
        .get("categoria/list")
        .then(function (response) {
          me.categories = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    goCategory(index, item) {
      this.$router.push(`/categoria/${item._id}`);
    },
  },

  created() {
    this.initialize();
    this.getCategories();
  },
};
</script>

<style scoped>
.v-btn {
  text-transform: none !important;
}
.mt-35 {
  margin-top: 35px !important;
}
#appbar {
  transition: all 0.5s ease-out;
}
</style>