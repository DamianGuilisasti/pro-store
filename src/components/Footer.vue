<template>
  <div>
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
    <v-bottom-navigation
      fixed
      dark
      v-model="value"
      :background-color="color"
      class="hidden-sm-and-up"
    >
      <v-btn>
        <span>Productos</span>

        <v-icon>mdi-format-list-numbered</v-icon>
      </v-btn>

      <v-btn>
        <span>Carrito</span>
        <v-badge content="0" value="0" color="green" overlap>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>

      <v-btn>
        <span>Pago</span>

        <v-icon>mdi-credit-card-outline</v-icon>
      </v-btn>
      <v-btn>
        <span>Ingresar</span>

        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      value: 1,
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
  computed: {
    color() {
      switch (this.value) {
        case 0:
          return "blue-grey";
        case 1:
          return "teal";
        case 2:
          return "brown";
        case 3:
          return "indigo";
        default:
          return "blue-grey";
      }
    },
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
</style>