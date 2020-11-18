<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="productsArray"
      :search="search"
      sort-by="code"
      class="elevation-1"
    >
      <template v-slot:item.image="{ item }">
        <img
          :src="item.primaryimage.imageURL"
          style="width: 70px; height: 70px"
        />
      </template>

      <template v-slot:item.stock="{ item }">
        <v-chip :color="getColor(item.stock)" dark>
          {{ item.stock }}
        </v-chip>
      </template>

      <template v-slot:item.state="{ item }">
        <v-chip :color="getStateColor(item.state)" dark>
          {{ getState(item.state) }}
        </v-chip>
      </template>

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
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"
                >Agregar producto</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row align="center" justify="space-around">
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.code"
                        label="Código"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row align="center" justify="space-around">
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        v-model="editedItem.description"
                        solo
                        name="input-7-4"
                        label="Descripción"
                        outlined
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row align="center" justify="space-around">
                    <v-col class="d-flex" cols="12" sm="6" md="6">
                      <v-select
                        v-model="editedItem.category"
                        :items="categoryList"
                        label="Seleccione categoría"
                      ></v-select>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6" md="6">
                      <v-btn tile color="success">
                        <v-icon left> mdi-plus </v-icon>
                        nueva categoría
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row align="center" justify="space-around">
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.stock"
                        label="Stock"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.price"
                        label="Precio de costo"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row align="center" justify="space-around">
                    <v-col cols="12" sm="12" md="12" v-if="imagepreview === ''">
                      <v-file-input
                        label="Imagen principal"
                        chips
                        v-model="primaryImagePreview"
                        accept="image/*"
                        show-size
                      ></v-file-input>
                    </v-col>

                    <v-col cols="12" sm="12" md="12" v-if="imagepreview !== ''">
                      <img
                        :src="imagepreview"
                        style="width: 100px; height: 100px"
                      />

                      <v-icon
                        @click="deletePreview"
                        dark
                        color="red"
                        style="position: absolute; margin-top: 5px; left: 40px"
                      >
                        mdi-close
                      </v-icon>
                    </v-col>
                  </v-row>

                  <v-row align="center" justify="space-around">
                    <v-col cols="12" sm="12" md="12" v-if="imagepreview === ''">
                      <v-file-input
                        label="Imágenes secundarias"
                        chips
                        v-model="primaryImagePreview"
                        accept="image/*"
                        show-size
                      ></v-file-input>
                    </v-col>

                    <v-col cols="12" sm="12" md="12" v-if="imagepreview !== ''">
                      <img
                        :src="imagepreview"
                        style="width: 100px; height: 100px"
                      />

                      <v-icon
                        @click="deletePreview"
                        dark
                        color="red"
                        style="position: absolute; margin-top: 5px; left: 40px"
                      >
                        mdi-close
                      </v-icon>
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
        <v-icon small @click="deleteItem(item)" class="mr-2">mdi-delete</v-icon>
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
        <p>Producto agregado correctamente.</p>
        <template v-slot:action="{ attrs }">
          <v-btn dark text v-bind="attrs" @click="snackbarAdd = false"
            >Cerrar</v-btn
          >
        </template>
      </v-snackbar>

      <v-snackbar v-model="snackbarUpdate" color="success">
        <p>Producto actualizado correctamente.</p>
        <template v-slot:action="{ attrs }">
          <v-btn dark text v-bind="attrs" @click="snackbarUpdate = false"
            >Cerrar</v-btn
          >
        </template>
      </v-snackbar>

      <v-snackbar v-model="snackbarDelete" color="warning">
        <p>Producto eliminado correctamente.</p>
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
    loading: "",
    primaryImagePreview: null,
    editedItem: {
      code: "",
      name: "",
      description: "",
      category: "",
      stock: "",
      price: "",
      primaryimage: {
        imageURL: "",
      },
    },
    imagepreview: "",
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
      { text: "Imagen", value: "image" },
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
    primaryImagePreview: function () {
      let me = this;
      this.editedItem.image = event.target.files[0];

      // Creamos el objeto/instancia de la clase FileReader
      let reader = new FileReader();

      // Leemos el archivo subido y se lo pasamos a nuestro FileReader
      reader.readAsDataURL(event.target.files[0]);

      // Le decimos que cuando esté listo, ejecute el código interno
      reader.onload = function () {
        me.imagepreview = reader.result;
      };
    },
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
    this.categorySelect();
  },

  methods: {
    desactivateItem(item) {
      let me = this;
      let header = { token: this.$store.state.token };
      let configuration = { headers: header };
      axios
        .put("producto/desactivate", { _id: item._id }, configuration)
        .then(function (response) {
          me.initialize();
          me.snackbarUpdate = true;
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
        .put("producto/activate", { _id: item._id }, configuration)
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
    getColor(stock) {
      if (stock < 5) return "red";
      else if (stock < 15) return "orange";
      else return "green";
    },
    onFileUpload(event) {
      let me = this;
      this.editedItem.image = event.target.files[0];

      // Creamos el objeto/instancia de la clase FileReader
      let reader = new FileReader();

      // Leemos el archivo subido y se lo pasamos a nuestro FileReader
      reader.readAsDataURL(event.target.files[0]);

      // Le decimos que cuando esté listo, ejecute el código interno
      reader.onload = function () {
        me.imagepreview = reader.result;
      };
    },
    deletePreview() {
      this.imagepreview = "";
      this.primaryImagePreview = null;
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
      me.imagepreview = "";
      axios
        .get("producto/list")
        .then(function (response) {
          me.productsArray = response.data;
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
      confirm("Estás a punto de eliminar el producto ¿Continuar?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.imagepreview = "";
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      let me = this;
      if (this.editedIndex > -1) {
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

        for (var pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }

        axios
          .post("producto/add", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              token: me.$store.state.token,
            },
          })
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

<style>
.v-btn--fab.v-size--small {
  height: 30px;
  width: 30px;
}
</style
