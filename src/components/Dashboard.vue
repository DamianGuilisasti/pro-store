<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" sm="4">
        <v-card class="mx-auto" max-width="344" color="info">
          <v-card-title>
            <h1>{{ quantity }}</h1>
          </v-card-title>
          <v-card-text>
            <div>Productos</div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="deep-purple accent-4">Agregar producto</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="mx-auto" max-width="344" color="info">
          <v-card-title>
            <h1>{{ quantity }}</h1>
          </v-card-title>
          <v-card-text>
            <div>Productos</div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="deep-purple accent-4">Agregar producto</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="mx-auto" max-width="344" color="info">
          <v-card-title>
            <h1>{{ quantity }}</h1>
          </v-card-title>
          <v-card-text>
            <div>Productos</div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="deep-purple accent-4">Agregar producto</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    productsArray: [],
    quantity: "",
  }),
  created() {
    this.productQuantity();
  },
  methods: {
    productQuantity() {
      let me = this;
      axios
        .get("producto/list")
        .then(function (response) {
          me.productsArray = response.data;
          console.log(me.productsArray.length);
          me.quantity = me.productsArray.length;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {},
};
</script>