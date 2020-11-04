<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="clientsArray"
      :search="search"
      sort-by="code"
      class="elevation-1"
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
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
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
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.lastname"
                        label="Apellido"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.username"
                        label="Usuario"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.newPassword"
                        label="Contraseña"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6" md="6">
                      <v-select
                        v-model="editedItem.userrole"
                        :items="userrolList"
                        label="Seleccione el rol"
                      ></v-select>
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
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
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
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbarAdd" color="success">
        <p>Usuario agregado correctamente.</p>
        <template v-slot:action="{ attrs }">
          <v-btn dark text v-bind="attrs" @click="snackbarAdd = false"
            >Cerrar</v-btn
          >
        </template>
      </v-snackbar>

      <v-snackbar v-model="snackbarUpdate" color="success">
        <p>Usuario actualizado correctamente.</p>
        <template v-slot:action="{ attrs }">
          <v-btn dark text v-bind="attrs" @click="snackbarUpdate = false"
            >Cerrar</v-btn
          >
        </template>
      </v-snackbar>

      <v-snackbar v-model="snackbarDelete" color="warning">
        <p>Usuario eliminado correctamente.</p>
        <template v-slot:action="{ attrs }">
          <v-btn dark text v-bind="attrs" @click="snackbarDelete = false"
            >Cerrar</v-btn
          >
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ClientClass from '../models/ClientClass';
export default {
  data: () => ({
    snackbarAdd: false,
    snackbarUpdate: false,
    snackbarDelete: false,
    search: "",
    dialog: false,
    headers: [
      {
        text: "Usuario",
        align: "start",
        sortable: false,
        value: "username",
      },
      { text: "Nombre", value: "name" },
      { text: "Apellido", value: "lastname" },
      { text: "Email", value: "email" },
      { text: "Rol", value: "userrole" },
      { text: "Estado", value: "state" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    clientsArray: [],
    userrolList: ["Admin", "Vendedor"],
    editedIndex: -1,
    editedItem: {
      name: "",
      description: "",
    },
    defaultItem: {
      name: "",
      description: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo cliente" : "Editar cliente";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    activateItem(item) {
      let me = this;
      let header = { token: this.$store.state.token };
      let configuration = { headers: header };
      axios
        .put(
          "usuario/activate",
          {
            _id: item._id,
          },
          configuration
        )
        .then(function (response) {
          me.initialize();
          me.snackbarUpdate = true;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    desactivateItem(item) {
      let me = this;
      let header = { token: this.$store.state.token };
      let configuration = { headers: header };
      axios
        .put(
          "usuario/desactivate",
          {
            _id: item._id,
          },
          configuration
        )
        .then(function (response) {
          me.initialize();
          me.snackbarUpdate = true;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getStateColor(state) {
      if (state === 1) return "green";
      else return "red";
    },
    getState(state) {
      if (state === 1) return "Activo";
      else return "Inactivo";
    },
    initialize() {
      let me = this;
      let header = { token: this.$store.state.token };
      let configuration = { headers: header };
      axios
        .get("persona/list", configuration)
        .then(function (response) {
          me.clientsArray = response.data;
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    editItem(item) {
      this.editedIndex = this.clientsArray.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      let me = this;
      let userId = item._id;
      confirm("Estás a punto de eliminar el cliente, ¿Continuar?") &&
        axios
          .delete("usuario/remove", {
            params: { id: userId },
            headers: {
              token: me.$store.state.token,
            },
          })
          .then(function (response) {
            me.initialize();
            me.snackbarDelete = true;
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

    save() {
      let me = this;
      let header = { token: this.$store.state.token };
      let configuration = { headers: header };
      const client = new Client({

      })
      if (this.editedIndex > -1) {
        axios
          .put(
            "usuario/update",
            {
              _id: this.editedItem._id,
              name: this.editedItem.name,
              lastname: this.editedItem.lastname,
              username: this.editedItem.username,
              email: this.editedItem.email,
              password: this.editedItem.newPassword, //revisar esto.
              userrole: this.editedItem.userrole,
            },
            configuration
          )
          .then(function (response) {
            me.initialize();
            me.snackbarUpdate = true;
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios
          .post(
            "persona/add", 
            {
              name: this.editedItem.name,
              lastname: this.editedItem.lastname,
              username: this.editedItem.username,
              email: this.editedItem.email,
              password: this.editedItem.newPassword,
              userrole: this.editedItem.userrole,
            },
            configuration
          )
          .then(function (response) {
            me.initialize();
            me.snackbarAdd = true;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      this.close();
    },
  },
};
</script>