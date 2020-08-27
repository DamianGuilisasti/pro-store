<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Nombre del producto"
      required
    ></v-text-field>

    <v-text-field
      v-model="code"
      :counter="10"
      label="Código del producto"
    ></v-text-field>

    <v-textarea v-model="description" solo name="input-7-4" label="Descripción del producto"></v-textarea>

    <v-select
      v-model="category"
      :items="items"
      :rules="[v => !!v || 'Categoría es requerida']"
      label="Categoría"
      required
    ></v-select>

    <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="price" label="Precio Normal"></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field v-model="saleprice" label="Precio Oferta"></v-text-field>
      </v-col>
    </v-row>

    <v-text-field
      v-model="stock"
      :counter="10"
      label="Stock"
    ></v-text-field>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Agregar</v-btn>

    <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>

    <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
  </v-form>
</template>

<script>

import axios from 'axios';
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Nombre es requerido",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    items: ["5f44268193d9da45086d5717"],
  }),

  methods: {
    addProduct() {
      let me = this;
      axios
        .post("producto/add",
        {
            "code": this.code,
            "name": this.name,
            "description": this.description,
            "category": this.category,
            "stock": this.stock,
            "price": this.price
        })
        .then(function (response) {
          console.log(response);
          console.log("bien hecho Chacky");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    validate() {
      this.$refs.form.validate();
      this.addProduct();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>