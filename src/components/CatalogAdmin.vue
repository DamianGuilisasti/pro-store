<template>
  <div>
    <v-form>
      <v-row>
        <v-col>
          <h2>Configuración del Catálogo:</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <v-switch
            v-model="catalogMode"
            @change="changeCatalogoMode"
            inset
            label="Activar modo Catálogo"
            persistent-hint
            hint="El modo Catálogo no muestra los precios de los productos ni permite agregarlos al carrito."
          >
            ></v-switch
          >
        </v-col>
      </v-row>

      <div class="text-center ma-2">
        <v-snackbar v-model="snackbarUpdate" color="success">
          <p>Se han guardado los cambios correctamente.</p>
          <template v-slot:action="{ attrs }">
            <v-btn dark text v-bind="attrs" @click="snackbarUpdate = false"
              >Cerrar</v-btn
            >
          </template>
        </v-snackbar>

        <v-snackbar v-model="snackbarError" color="warning">
          <p>
            Ha ocurrido un error, por favor actualice la página e intentelo
            nuevamente.
          </p>
          <template v-slot:action="{ attrs }">
            <v-btn dark text v-bind="attrs" @click="snackbarError = false"
              >Cerrar</v-btn
            >
          </template>
        </v-snackbar>
      </div>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    catalogMode: null,
    snackbarAdd: false,
    snackbarUpdate: false,
    snackbarError: false,
    companyName: "",
    dataId: "",
    footerInfo: "",
    aboutInfo: "",
  }),
  created() {
    this.firstObjetct();
    this.getCatalogMode();
  },
  methods: {
    changeCatalogoMode() {
        let me = this;
        axios.put('configuracion/updateCatalogMode', {
            _id: this.dataId,
            catalogMode: this.catalogMode
        })
        .then(function(response){
            me.snackbarUpdate = true;
        })
        .catch(function(error){
            console.log(error);
        });
    },
    getCatalogMode() {
      let me = this;
      axios
        .get("configuracion/list")
        .then(function (response) {
          me.catalogMode = response.data[0].catalogMode;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    updateInfo() {
      let me = this;
      axios
        .put("configuracion/updateInfo", {
          _id: this.dataId,
          footerInfo: this.footerInfo,
          aboutInfo: this.aboutInfo,
          companyName: this.companyName,
        })
        .then(function (response) {
          me.snackbarUpdate = true;
        })
        .catch(function (error) {
          console.log(error);
          me.snackbarError = true;
        });
    },
    firstObjetct() {
      let me = this;
      axios
        .get("configuracion/list")
        .then(function (response) {
          if (response.data.length > 0) {
            me.dataId = response.data[0]._id;
          } else {
            // mostrar error con snackbar.
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.v-application p {
  margin-bottom: 0px;
}
</style>