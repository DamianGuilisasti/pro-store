import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode' //para decodificar el jwt que el servidor me devuelve.
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userDB: null
  },
  mutations: { //modifican el state
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, userDB) {
      state.userDB = userDB;
    }
  },
  actions: { //hacen procesamiento con la API -- realizan mutaciones
    saveToken({ commit }, token) { //guardar el token que me devuelve el backend en el LocalStorage del navegador
      //el commit permite realizar una mutación o acceder al state.
      commit('setToken', token)
      commit('setUser', decode(token))
      localStorage.setItem('token', token);

    },
    autoLogin({ commit }) { //si ya accedí al sistema y tengo un token no es necesario volver a pedir que ingrese los datos para acceder. Se va a chequear si tengo el token en el Local Storage.
      let token = localStorage.getItem('token');
      if (token) {
        commit('setToken', token)
        commit('setUser', decode(token))
      }
      else{
        router.push({ name: 'LoginAdmin' });
      }


    },
    exit({commit}) {
      //eliminar el token del LocalStorage.
      commit('setToken', '')
      commit('setUser', '')
      localStorage.removeItem('token');
      router.push({ name: 'LoginAdmin' });
    }
  },
  modules: {
  }
})
