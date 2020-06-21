import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token') || '',
    authStatus: '',
    loading: '',
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.authStatus,
    isLoading: (state) => state.loading,
  },
  mutations: {
    AUTH_REQUEST: (state) => {
      state.authStatus = 'loading'
    },
    AUTH_SUCCESS: (state, token) => {
      state.authStatus = 'loggedin'
      state.token = token
    },
    AUTH_ERROR: (state) => {
      state.authStatus = 'error'
    },
    AUTH_LOGOUT: (state) => {
      state.authStatus = '';
      state.token = '';
    },
    LOADING_START: (state) => {
      state.loading = true;
    },
    LOADING_STOP: (state) => {
      state.loading = false;
    }
  },
  actions: {
    AUTH_REQUEST: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST');
        axios({ 
          method: 'POST', 
          url: `${process.env.VUE_APP_API_BASE_URL}/auth`, 
          data, 
          headers: {
            'Content-Type':'application/json'
          }
        }).then(resp => {
            const token = resp.data.token;
            localStorage.setItem('user-token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            commit('AUTH_SUCCESS', token);
            resolve(resp);
        }).catch(err => {
            commit('AUTH_ERROR', err);
            localStorage.removeItem('user-token');
            reject(err);
        });
      })
    },
    AUTH_LOGOUT: ({ commit }) => {
      localStorage.removeItem('user-token');
      axios.defaults.headers.common['Authorization'] = '';
      commit('AUTH_LOGOUT');
    },
    LOADING_START: ({ commit }) => {
      window.scrollTo(0, 0);
      commit('LOADING_START');
    },
    LOADING_STOP: ({ commit }) => {
      commit('LOADING_STOP');
    }
  }
})
