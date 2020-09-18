<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="productsArray"
      :search="search"
      sort-by="code"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="dark">
          <v-toolbar-title>Productos</v-toolbar-title>
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
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Agregar producto</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.code" label="Código"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="Nombre"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.description" label="Descripción"></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.category"
                        :items="categoryList"
                        label="Seleccione categoría"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.stock" label="Stock"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.price" label="Precio de costo"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      Imagen principal
                      <input type="file" @change="onFileUpload" />

                      <!-- <v-file-input
                        v-model="editedItem.image"
                        color="deep-purple accent-4"
                        counter
                        label="File input"
                        multiple
                        placeholder="Select your files"
                        prepend-icon="mdi-paperclip"
                        outlined
                        :show-size="1000"
                        @change="selectFile"
                        ref="image"
                      > 
                        <template v-slot:selection="{ index, text }">
                          <v-chip
                            v-if="index < 2"
                            color="deep-purple accent-4"
                            dark
                            label
                            small
                          >{{ text }}</v-chip>

                          <span
                            v-else-if="index === 2"
                            class="overline grey--text text--darken-3 mx-2"
                          >+{{ files.length - 2 }} File(s)</span>
                        </template>
                      </v-file-input>-->
                    </v-col>

                    <!--<v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.saleprice" label="Precio Oferta"></v-text-field>
                    </v-col>-->
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
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
        <p>Producto agregado correctamente.</p>
        <template v-slot:action="{ attrs }">
          <v-btn dark text v-bind="attrs" @click="snackbarAdd = false">Cerrar</v-btn>
        </template>
      </v-snackbar>

      <v-snackbar v-model="snackbarUpdate" color="success">
        <p>Producto actualizado correctamente.</p>
        <template v-slot:action="{ attrs }">
          <v-btn dark text v-bind="attrs" @click="snackbarUpdate = false">Cerrar</v-btn>
        </template>
      </v-snackbar>

      <v-snackbar v-model="snackbarDelete" color="warning">
        <p>Producto eliminado correctamente.</p>
        <template v-slot:action="{ attrs }">
          <v-btn dark text v-bind="attrs" @click="snackbarDelete = false">Cerrar</v-btn>
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
        text: "Código",
        align: "start",
        sortable: false,
        value: "code",
      },
      { text: "Imagen", value: "primaryimage.imageURL" },
      { text: "Nombre", value: "name" },
      { text: "Descripción", value: "description" },
      { text: "Categoría", value: "category.name" },
      { text: "Stock", value: "stock" },
      { text: "Precio", value: "price" },
      { text: "Precio Oferta", value: "saleprice" },
      { text: "Estado", value: "state" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    productsArray: [],
    categoryList: [],
    editedIndex: -1,
    editedItem: {
      code: "",
      name: "",
      description: "",
      category: "",
      stock: "",
      price: "",
      image: "",
    },
    defaultItem: {
      name: "",
      description: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo producto" : "Editar producto";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
    this.categorySelect();
  },

  methods: {
    onFileUpload(event) {
      this.editedItem.image = event.target.files[0];
    },
    categorySelect() {
      let me = this;
      let categoryList = [];
      axios
        .get("categoria/list")
        .then(function (response) {
          categoryList = response.data;
          categoryList.map(function (i) {
            me.categoryList.push({ text: i.name, value: i._id });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    initialize() {
      let me = this;
      axios
        .get("producto/list")
        .then(function (response) {
          me.productsArray = response.data;
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    editItem(item) {
      this.editedIndex = this.productsArray.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.productsArray.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
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
      if (this.editedIndex > -1) {
        console.log(this.editedItem);
        axios
          .put("producto/update", {
            _id: this.editedItem._id,
            code: this.editedItem.code,
            name: this.editedItem.name,
            description: this.editedItem.description,
            category: this.editedItem.category,
            stock: this.editedItem.stock,
            price: this.editedItem.price,
          })
          .then(function (response) {
            me.initialize();
            me.snackbarUpdate = true;
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        let formData = new FormData();
        formData.append("code", this.editedItem.code);
        formData.append("name", this.editedItem.name);
        formData.append("description", this.editedItem.description);
        formData.append("category", this.editedItem.category);
        formData.append("stock", this.editedItem.stock);
        formData.append("price", this.editedItem.price);
        formData.append("file", this.editedItem.image); //de acá me está tomando el single('file')

        axios
          .post(
            "producto/add", 
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              }
            }
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