<template>
  <div>
    <v-form>
      <v-row>
        <v-col>
          <h2>Información sobre la empresa:</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Nombre de la empresa"
            v-model="companyName"
            outlined
            persistent-hint
            hint="Dejar en vacío para desactivarlo - Esta información se mostrará toda la página."
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-textarea
            outlined
            name="input-7-4"
            v-model="aboutInfo"
            label="Información sobre la empresa"
            persistent-hint
            hint="Dejar en vacío para desactivarlo - Esta información se mostrará en la página Nosotros."
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Información para el pie de página"
            v-model="footerInfo"
            outlined
            persistent-hint
            hint="Dejar en vacío para desactivarlo - Esta información se mostrará en el pie de página."
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn color="success" class="mr-4" @click="updateInfo">Guardar cambios</v-btn>
        </v-col>
      </v-row>

      <div class="text-center ma-2">
        <v-snackbar v-model="snackbarUpdate" color="success">
          <p>Redes sociales actualizadas correctamente.</p>
          <template v-slot:action="{ attrs }">
            <v-btn dark text v-bind="attrs" @click="snackbarUpdate = false">Cerrar</v-btn>
          </template>
        </v-snackbar>

        <v-snackbar v-model="snackbarError" color="warning">
          <p>Ha ocurrido un error, por favor actualice la página e intentelo nuevamenrte.</p>
          <template v-slot:action="{ attrs }">
            <v-btn dark text v-bind="attrs" @click="snackbarError = false">Cerrar</v-btn>
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
    this.getInfo();
  },
  methods: {
    getInfo() {
      let me = this;
      axios
        .get("configuracion/list")
        .then(function (response) {
          me.footerInfo = response.data[0].footerInfo;
          me.aboutInfo = response.data[0].aboutInfo;
          me.companyName = response.data[0].companyName;
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
          companyName: this.companyName
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