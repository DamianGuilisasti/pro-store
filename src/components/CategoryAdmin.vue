<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="categoryArray"
      :search="search"
      sort-by="code"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="dark">
          <v-toolbar-title>Categorías</v-toolbar-title>
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
                >Agregar categoría</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>

    <div class="text-center ma-2">
      <v-snackbar v-model="snackbarAdd" color="success">
        <p>Categoría agregada correctamente.</p>
        <template v-slot:action="{ attrs }">
          <v-btn dark text v-bind="attrs" @click="snackbarAdd = false"
            >Cerrar</v-btn
          >
        </template>
      </v-snackbar>

      <v-snackbar v-model="snackbarUpdate" color="success">
        <p>Categoría actualizada correctamente.</p>
        <template v-slot:action="{ attrs }">
          <v-btn dark text v-bind="attrs" @click="snackbarUpdate = false"
            >Cerrar</v-btn
          >
        </template>
      </v-snackbar>

      <v-snackbar v-model="snackbarDelete" color="warning">
        <p>Categoría eliminada correctamente.</p>
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
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    categoryArray: [],
    categoryList: [],
    editedIndex: -1,
    editedItem: {
      name: "",
    },
    defaultItem: {
      name: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva categoría" : "Editar categoría";
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
    initialize() {
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

    editItem(item) {
      this.editedIndex = this.categoryArray.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      let me = this;
      let categoryId = item._id;

      confirm("Estás a punto de eliminar la categoría ¿Continuar?") &&
        axios
          .delete("categoria/remove", {
            params: { id: categoryId },
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
      if (this.editedIndex > -1) {
        axios
          .put(
            "categoria/update",
            {
              _id: this.editedItem._id,
              name: this.editedItem.name,
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
            "categoria/add",
            {
              name: this.editedItem.name,
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