import Vue from "vue";
import Vuex from "vuex";
import decode from "jwt-decode"; //para decodificar el jwt que el servidor me devuelve.
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: {
      showing: false,
      text: "",
      color: "",
    },
    token: null,
    userDB: null,
  },
  mutations: {
    //modifican el state
    SET_SNACKBAR(state, snackbar) {
      state.snackbar = snackbar;
    },
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, userId) {
      state.userDB = userId;
    },
  },
  actions: {
    //hacen procesamiento con la API -- realizan mutaciones
    setSnackbar({ commit }, snackbar) {
      (snackbar.showing = true), (snackbar.color = snackbar.color || "success");
      commit("SET_SNACKBAR", snackbar);
    },
    saveToken({ commit }, token) {
      //guardar el token que me devuelve el backend en el LocalStorage del navegador
      //el commit permite realizar una mutación o acceder al state.
      commit("setToken", token);
      const userId = decode(token);
      console.log(userId);
      commit("setUser", userId);
      localStorage.setItem("token", token);
    },
    autoLogin({ commit }) {
      //si ya accedí al sistema y tengo un token no es necesario volver a pedir que ingrese los datos para acceder. Se va a chequear si tengo el token en el Local Storage.
      let token = localStorage.getItem("token");
      if (token) {
        commit("setToken", token);
        commit("setUser", decode(token));
      } else {
        router.push({ name: "LoginAdmin" });
      }
    },
    exit({ commit }) {
      //eliminar el token del LocalStorage.
      commit("setToken", "");
      commit("setUser", "");
      localStorage.removeItem("token");
      router.push({ name: "LoginAdmin" });
    },
  },
  modules: {},
});
