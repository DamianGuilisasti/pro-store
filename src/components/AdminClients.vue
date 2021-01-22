<template>
  <div>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="clients"
        :search="search"
        :loading="loadingData"
        loading-text="Cargando clientes... Por favor espere."
        no-data-text="No hay información de clientes, por favor cargue nuevos clientes."
      >
        <template v-slot:item.state="{ item }">
          <v-chip :color="getStateColor(item.state)" dark>
            {{ getState(item.state) }}
          </v-chip>
        </template>

        <template v-slot:top>
          <v-toolbar flat color="dark">
            <v-toolbar-title>Clientes</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar..."
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  >Agregar cliente</v-btn
                >
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Nombre"
                          :rules="nameRules"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.lastname"
                          label="Apellido"
                          :rules="lastnameRules"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.email"
                          label="Email"
                          :rules="emailRules"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model.number="editedItem.phone"
                          label="Teléfono"
                          type="number"
                          :rules="phoneRules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.address"
                          label="Dirección"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="ma-2" @click="close">Cancelar</v-btn>
                  <v-btn class="ma-2" color="success" @click="save">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="editItem(item)" class="mr-2">mdi-pencil</v-icon>
          <v-icon small @click="deleteClient(item)" class="mr-2"
            >mdi-delete</v-icon
          >
          <v-icon
            small
            @click="desactivateItem(item)"
            class="mr-2"
            v-if="item.state === 1"
            >mdi-eye-off</v-icon
          >
          <v-icon small @click="activateItem(item)" v-if="item.state === 0"
            >mdi-eye</v-icon
          >
        </template></v-data-table
      >
    </v-card>
  </div>
</template>

<script>
import Vuex from "vuex";
import axios from "axios";
export default {
  data: () => ({
    item: {
      menu: false,
    },
    loadingData: true,
    dialog: false,
    editedIndex: -1,
    editedItem: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
    },
    search: "",
    headers: [
      {
        text: "Nombre",
        align: "start",
        filterable: true,
        value: "name",
      },
      {
        text: "Apellido",
        filterable: true,
        value: "lastname",
      },
      {
        text: "Email",
        filterable: true,
        value: "email",
      },
      {
        text: "Teléfono",
        filterable: true,
        value: "phone",
      },
      { text: "Estado", filterable: true, value: "state" },
      { text: "Acciones", value: "actions" },
    ],
    clients: [],
    nameRules: [
      (v) => !!v || "El nombre es requerido",
      (v) => (v && v.length >= 3) || "El nombre debe ser mayor a 3 caracteres",
    ],
    lastnameRules: [
      (v) => !!v || "El apellido es requerido",
      (v) =>
        (v && v.length >= 3) || "El apellido debe ser mayor a 3 caracteres",
    ],
    emailRules: [
      (v) => !!v || "El email es requerido",
      (v) => /.+@.+\..+/.test(v) || "El email debe ser válido",
    ],
    phoneRules: [
      (v) =>
        typeof v == "number" ||
        "El teléfono debe ser válido, escribir solo números",
    ],
  }),
  methods: {
    //DataTable

    getStateColor(state) {
      if (state === 1) return "green";
      else return "red";
    },
    getState(state) {
      if (state === 1) return "Activo";
      else return "Desactivado";
    },

    desactivateItem(item) {
      let me = this;
      let header = { token: this.$store.state.token };
      let configuration = { headers: header };
      axios
        .put(
          "clients/desactivate",
          {
            _id: item._id,
          },
          configuration
        )
        .then(function (response) {
          me.initialize();
          me.$store.dispatch("setSnackbar", {
            text: `Se desactivó correctamente el cliente ${
              item.name + " " + item.lastname
            }.`,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    activateItem(item) {
      let me = this;
      let header = { token: this.$store.state.token };
      let configuration = { headers: header };
      axios
        .put(
          "clients/activate",
          {
            _id: item._id,
          },
          configuration
        )
        .then(function (response) {
          me.initialize();
          me.$store.dispatch("setSnackbar", {
            text: `Se activó correctamente el cliente ${
              item.name + " " + item.lastname
            }.`,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //Init

    initialize() {
      let me = this;
      let header = { token: this.$store.state.token };
      let configuration = { headers: header };
      axios
        .get("clients/list", configuration)
        .then(function (response) {
          me.clients = response.data;
          if (response.data.length == 0) {
            me.loadingData = false;
          }
          me.loadingData = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //Edit

    editItem(item) {
      this.editedIndex = this.clients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    //Delete

    deleteClient(item) {
      let me = this;
      let clientId = item._id;
      confirm("Estás a punto de eliminar el cliente ¿Continuar?") &&
        axios
          .delete("clients/remove", {
            params: { id: clientId },
            headers: {
              token: me.$store.state.token,
            },
          })
          .then(function (response) {
            me.initialize();
            me.$store.dispatch("setSnackbar", {
              text: `Se eliminó correctamente el cliente ${
                item.name + " " + item.lastname
              }.`,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    //Save

    save() {
      let me = this;
      let header = { token: this.$store.state.token };
      let configuration = { headers: header };
      if (this.editedIndex > -1) {
        axios
          .put(
            "clients/update",
            {
              _id: this.editedItem._id,
              name: this.editedItem.name,
              lastname: this.editedItem.lastname,
              email: this.editedItem.email,
              address: this.editedItem.address,
              phone: this.editedItem.phone,
            },
            configuration
          )
          .then(function (response) {
            me.initialize();
            me.$store.dispatch("setSnackbar", {
              text: `Se actualizó correctamente el cliente ${
                response.data.name + " " + response.data.lastname
              }.`,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        let me = this;
        let header = { token: this.$store.state.token };
        let configuration = { headers: header };
        axios
          .post(
            "clients/add",
            {
              name: this.editedItem.name,
              lastname: this.editedItem.lastname,
              email: this.editedItem.email,
              address: this.editedItem.address,
              phone: this.editedItem.phone,
            },
            configuration
          )
          .then(function (response) {
            me.initialize();
            me.$store.dispatch("setSnackbar", {
              text: `Se agregó correctamente el cliente ${
                response.data.name + " " + response.data.lastname
              }.`,
            });
          })
          .catch(function (error) {
            console.log(error);
            me.$store.dispatch("setSnackbar", {
              text: `Ocurrió un error, por favor actualice la página y vuelta a intentarlo.`,
              color: "red",
            });
          });
      }
      this.close();
    },
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo cliente" : "Editar cliente";
    },
  },
  mounted() {
    this.initialize();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>



