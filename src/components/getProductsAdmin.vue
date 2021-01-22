<template>
  <form>
    <h1>Descargar productos</h1>
    <p>
      Este procedimiento puede llegar a demorar varios minutos, por favor
      realice la operación y espere.
    </p>

    <v-text-field
      v-model="link"
      label="Link"
      required
    ></v-text-field>
    <v-select
      :items="categoryArray"
      label="Seleccione categoría"
      required
      item-value="id"
      item-text="name"
    ></v-select>

    <v-text-field
      v-model="percent"
      :counter="50"
      label="Porcentaje de ganancia"
      required
    ></v-text-field>
    <v-btn class="mr-4" @click="getProductsFromScraping">
      Descargar productos
    </v-btn>
  </form>
</template>


<script>
//import { validationMixin } from "vuelidate";
//import { required, maxLength, email } from "vuelidate/lib/validators";
import axios from "axios";
//import moment from "moment";
import vuex from "vuex";

export default {
  //mixins: [validationMixin],

  /*   validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  }, */

  data: () => ({
    // subject: `Factura Mes ${moment(new Date()).format(
    //    "MM/YYYY"
    //)} - Damián Guilisasti`,
    categoryArray: [],
    link: "",
    percent: "",
    name: "",
    email: "",
    checkbox: false,
    clients: [],
    clientsList: [],
    selectedClient: {
      name: "",
      email: "",
    },
    BillFile: "",
    billUploaded: null,
  }),
  computed: {
    /*     checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    }, */
    /*     selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Cliente es requerido.");
      return errors;
    }, */
    /*     nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    }, */
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      let me = this;
      axios
        .get("categoria/list")
        .then(function (response) {
          me.categoryArray = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getProductsFromScraping() {
      let me = this;
      axios
        .post("producto/addproductsbyscraping", {
          link: this.link,
          percent: this.percent,
        })
        .then(function (response) {
          me.$store.dispatch("setSnackbar", {
            text: "Se descargaron correctamente los productos.",
          });
        })
        .catch(function (error) {
          console.log(error);
          me.$store.dispatch("setSnackbar", {
            text:
              "Hubo un error al descargar los productos, por favor actualice la página e intente nuevamente.",
            color: "error",
          });
        });
    },
    selectClient(_id) {
      let me = this;
      this.clientsList.map(function (i) {
        if (i._id === _id) {
          me.selectedClient = i;
        }
      });
    },
  },
};
</script>

<style>
.v-application p {
  margin-bottom: 0px;
}

.imageURL:hover {
  background-color: rgba(0, 0, 0, 0.6);
}
</style>