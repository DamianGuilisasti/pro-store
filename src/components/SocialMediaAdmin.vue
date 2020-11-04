<template>
  <div>
    <v-form>
      <v-row>
        <v-col>
          <h2>Redes sociales</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Facebook"
            v-model="SocialMediaArray.facebook"
            outlined
            persistent-hint
            hint="Link a red social Facebook - Dejar en vacío para desactivarlo."
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Instagram"
            v-model="SocialMediaArray.instagram"
            outlined
            persistent-hint
            hint="Link a red social Instagram - Dejar en vacío para desactivarlo."
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Google"
            v-model="SocialMediaArray.google"
            outlined
            persistent-hint
            hint="Link a red social Google - Dejar en vacío para desactivarlo."
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Twitter"
            v-model="SocialMediaArray.twitter"
            outlined
            persistent-hint
            hint="Link a red social Twitter - Dejar en vacío para desactivarlo."
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Youtube"
            v-model="SocialMediaArray.youtube"
            outlined
            persistent-hint
            hint="Link a red social Youtube - Dejar en vacío para desactivarlo."
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="success" class="mr-4" @click="updateSocialMedia">Guardar cambios</v-btn>
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
          <p>Ha ocurrido un error, por favor actualice la página e intentelo nuevamente.</p>
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
    SocialMediaArray: {
      facebook: "",
      instagram: "",
      google: "",
      twitter: "",
      youtube: "",
    },
    dataId: "",
    SocialMediaArray: [],
  }),
  created() {
    this.getData();
    this.getSocialMedia();
  },
  methods: {
    getSocialMedia() {
      let me = this;
      axios
        .get("configuracion/list")
        .then(function (response) {
          me.SocialMediaArray = response.data[0].socialMedia;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    updateSocialMedia() {
      let me = this;
      axios
        .put("configuracion/updateSocialMedia", {
          _id: this.dataId,
          socialMedia: {
            facebook: this.SocialMediaArray.facebook,
            instagram: this.SocialMediaArray.instagram,
            google: this.SocialMediaArray.google,
            youtube: this.SocialMediaArray.youtube,
            twitter: this.SocialMediaArray.twitter,
          },
        })
        .then(function (response) {
          me.snackbarUpdate = true;
        })
        .catch(function (error) {
          console.log(error);
          me.snackbarError = true;
        });
    },
    getData() {
      let me = this;
      axios
        .get("configuracion/list")
        .then(function (response) {
          if (response.data.length > 0) {
            me.dataId = response.data[0]._id;
          } else {
            // snackbar que diga que no se pudieron obtener los datos.
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