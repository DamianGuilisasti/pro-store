<template>
  <v-app id="inspire">
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <!--      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->

      <v-toolbar-title style="width: 200px">
        <a href="/" class="white--text" style="text-decoration: none"
          >Pro Store</a
        >
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Buscar producto"
        class="hidden-sm-and-down pl-10 ml-4"
      />
      <v-spacer />
      <v-btn color="blue" elevation="2" small to="/admin/"
        >Panel de Administración</v-btn
      >&nbsp;
      <v-btn small text to="/account/register">Crear cuenta</v-btn>&nbsp;
      <v-btn small text to="/account/login">Iniciar Sesion</v-btn>
      <v-btn v-on="on" href="/cart" icon>
        <v-badge content="2" value="2" color="green" overlap>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-bottom-navigation :value="activeBtn" color="primary" horizontal>
        <a href="/" class="v-btn">
          <span>Inicio</span>
        </a>
        <a href="/nosotros" class="v-btn">
          <span>Nosotros</span>
        </a>
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" href="/productos">
              <span>Productos</span>
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
        <v-btn href="/contacto">
          <span>Contacto</span>
        </v-btn>
      </v-bottom-navigation>
    </v-content>
    <router-view />
    <v-footer :padless="true">
      <v-card flat tile width="100%" class="secondary white--text text-center">
        <v-card-text>
          <v-btn
            v-if="
              configurationArray.socialMedia.facebook !== null &&
              configurationArray.socialMedia.facebook !== '' &&
              configurationArray.socialMedia.facebook !== undefined
            "
            link
            :href="configurationArray.socialMedia.facebook"
            class="mx-4 white--text"
            icon
            target="_blank"
          >
            <v-icon size="24px">mdi-facebook</v-icon>
          </v-btn>
          <v-btn
            v-if="
              configurationArray.socialMedia.instagram !== null &&
              configurationArray.socialMedia.instagram !== '' &&
              configurationArray.socialMedia.instagram !== undefined
            "
            link
            :href="configurationArray.socialMedia.instagram"
            class="mx-4 white--text"
            icon
            target="_blank"
          >
            <v-icon size="24px">mdi-instagram</v-icon>
          </v-btn>
          <v-btn
            v-if="
              configurationArray.socialMedia.twitter !== null &&
              configurationArray.socialMedia.twitter !== '' &&
              configurationArray.socialMedia.twitter !== undefined
            "
            link
            :href="configurationArray.socialMedia.twitter"
            class="mx-4 white--text"
            icon
            target="_blank"
          >
            <v-icon size="24px">mdi-twitter</v-icon>
          </v-btn>
          <v-btn
            v-if="
              configurationArray.socialMedia.google !== null &&
              configurationArray.socialMedia.google !== '' &&
              configurationArray.socialMedia.google !== undefined
            "
            link
            :href="configurationArray.socialMedia.google"
            class="mx-4 white--text"
            icon
            target="_blank"
          >
            <v-icon size="24px">mdi-google</v-icon>
          </v-btn>
          <v-btn
            v-if="
              configurationArray.socialMedia.youtube !== null &&
              configurationArray.socialMedia.youtube !== '' &&
              configurationArray.socialMedia.youtube !== undefined
            "
            link
            :href="configurationArray.socialMedia.youtube"
            class="mx-4 white--text"
            icon
            target="_blank"
          >
            <v-icon size="24px">mdi-youtube</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text
          v-if="
            configurationArray.footerInfo !== null &&
            configurationArray.footerInfo !== '' &&
            configurationArray.footerInfo !== undefined
          "
          class="white--text pt-0"
          >{{ configurationArray.footerInfo }}</v-card-text
        >

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} —
          <strong>ProStore</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      categories: [],
      activeBtn: 1,
      configurationArray: [],
      configurationArray: {
        socialMedia: {
          facebook: null,
          instagram: null,
          twitter: null,
          youtube: null,
          google: null,
        },
      },
    };
  },
  created() {
    this.initialize();
    this.getCategories();
  },
  methods: {
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
};
</script>

<style scoped>
.v-main .v-content {
  padding: 0px 0px 0px !important;
}
.pointercursor {
  cursor: pointer;
  height: 42px;
  width: 42px;
}
</style>
