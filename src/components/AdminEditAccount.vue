<template>
  <div>
    <h1>Editar cuenta</h1>
    <v-divider></v-divider>
    <v-text-field
      v-model="userInfo.name"
      :counter="15"
      label="Nombre"
    ></v-text-field>
    <v-text-field
      v-model="userInfo.lastname"
      :counter="15"
      label="Apellido"
    ></v-text-field>
    <v-text-field
      v-model="userInfo.username"
      :counter="15"
      label="Usuario"
    ></v-text-field>
    <v-text-field
      v-model="userInfo.email"
      :counter="50"
      label="Email"
      disabled
    ></v-text-field>
    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :counter="15"
      label="Contraseña Actual"
      :type="show1 ? 'text' : 'password'"
      @click:append="show1 = !show1"
    ></v-text-field>
    <v-text-field
      v-model="newpassword"
      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
      :counter="15"
      label="Nueva Contraseña"
      :type="show2 ? 'text' : 'password'"
      @click:append="show2 = !show2"
    ></v-text-field>
    <v-text-field
      v-model="confirmnewpassword"
      :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[
        newpassword === confirmnewpassword ||
          'Las nuevas contraseñas no coinciden.',
      ]"
      :type="show3 ? 'text' : 'password'"
      name="input-10-2"
      label="Repita Nueva Contraseña"
      @click:append="show3 = !show3"
    ></v-text-field>
    <v-select
      :disabled="role !== 'Admin'"
      :items="userrolList"
      label="Editar Rol"
      item-text="name"
      item-value="id"
      v-model="role"
    ></v-select>
    <v-btn class="mr-4" color="success" @click="save"> Guardar </v-btn>
  </div>
</template>

<script>
import axios from "axios";
import Vuex from "vuex";
export default {
  data: () => ({
    initials: "",
    userInfo: "",
    password: "",
    newpassword: "",
    confirmnewpassword: "",
    show1: false,
    show2: false,
    show3: false,
    userrolList: [],
    role: "",
    roleId: "",
  }),
  methods: {
    save() {
      let me = this;
      let header = { token: this.$store.state.token };
      let configuration = { headers: header };

      //consultar si el password actual es correcto.

      axios
        .put(
          "/user/update",
          {
            _id: this.userInfo._id,
            name: this.userInfo.name,
            lastname: this.userInfo.lastname,
            username: this.userInfo.username,
            email: this.userInfo.email,
            password: this.password,
            newpassword: this.confirmnewpassword,
            rol: this.roleId,
          },
          configuration
        )
        .then(function (responde) {
          me.$store.dispatch("setSnackbar", {
            text: `Se actualizó correctamente al usuario.`,
          });
        })
        .catch(function (error) {
          console.log(error);
          me.$store.dispatch("setSnackbar", {
            text: `No se pudo actualizar al usuario, por favor actualice la página e intente nuevamente.`,
            color: "red",
          });
        });
    },
    getRols() {
      let me = this;
      axios
        .get("roles/list")
        .then(function (response) {
          me.userrolList = response.data;
          me.getRole();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getUserInfo() {
      let me = this;
      let header = { token: this.$store.state.token };
      let configuration = { headers: header };
      const userId = this.$store.state.userDB;
      const url = `user/query?_id=${userId}`;
      axios
        .get(url, configuration)
        .then(function (response) {
          me.userInfo = response.data;
          me.initials =
            me.userInfo.name.slice(0, 1) + me.userInfo.lastname.slice(0, 1);
          me.getRols();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getRole() {
      let me = this;
      const role = this.userInfo.rol[0].name;
      this.userrolList.map(function (i) {
        if (i.name === role) {
          me.role = i.name;
          me.roleId = i._id;
        }
      });
    },
  },
  created() {
    this.getUserInfo();
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>



