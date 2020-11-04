<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="usersArray"
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
          <v-toolbar-title>Usuarios</v-toolbar-title>
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
                >Agregar usuario</v-btn
              >
            </template>
            <v-form ref="form" v-model="valid" lazy-validation>
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
                          v-model="editedItem.username"
                          label="Usuario"
                          :rules="userRules"
                          required
                        ></v-text-field>
                      </v-col>
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
                          v-model="editedItem.newPassword"
                          label="Contraseña"
                          :rules="passwordRules"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col class="d-flex" cols="12" sm="6" md="6">
                        <v-select
                          v-model="editedItem.userrole"
                          :items="userrolList"
                          label="Seleccione el rol"
                          :rules="userroleRules"
                          required
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="ma-2" @click="close">Cancelar</v-btn>
                  <v-btn
                    class="ma-2"
                    color="success"
                    @click="save"
                    :disabled="!valid"
                  >
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
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
    usersArray: [],
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
    valid: true,
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
    userRules: [
      (v) => !!v || "El usuario es requerido",
      (v) => (v && v.length >= 3) || "El usuario debe ser mayor a 3 caracteres",
    ],
    passwordRules: [
      (v) => !!v || "La contraseña es requerida",
      (v) =>
        (v && v.length >= 3) || "La contraseña debe ser mayor a 3 caracteres",
    ],
    userroleRules: [
      (v) => !!v || "El rol es requerido"
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo usuario" : "Editar usuario";
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
        .get("usuario/list", configuration)
        .then(function (response) {
          me.usersArray = response.data;
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    editItem(item) {
      this.editedIndex = this.usersArray.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      let me = this;
      let userId = item._id;
      confirm("Estás a punto de eliminar el usuario, ¿Continuar?") &&
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

    validate() {
      return this.$refs.form.validate();
    },

    save() {
      let me = this;
      let header = { token: this.$store.state.token };
      let configuration = { headers: header };

      if (this.validate()) {
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
              "usuario/add",
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
      }
    },
  },
};
</script>