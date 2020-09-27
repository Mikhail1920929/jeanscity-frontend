import API from '../../../api.js'
import { getLocalToken, getUser } from '../../../helpers/auth'

const token = getLocalToken()

const state = {
  authUser: {},
  token: token,
  isAuth: !!token,
  message: null
}

const mutations = {
  LOGIN_SUCCESS (state, payload) {
    state.message = payload.message
    state.authUser = payload.data.user
    state.isAuth = true
    state.token = payload.data.token
  },
  SET_AUTHUSER (state, payload) {
    state.authUser = payload
  },
  REMEMBER_USER (state, payload) {
    localStorage.setItem('token', payload.token)
  },
  LOGOUT (state) {
    state.authUser = null
    state.token = null
    state.isAuth = false
    localStorage.removeItem('token')
  }
}

const actions = {
  login ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.post(`auth/login/`, data)
        .then(response => {
          commit('LOGIN_SUCCESS', response.data)
          if (data.remember) {
            commit('REMEMBER_USER', response.data.data)
          }
          API.defaults.headers.common['Authorization'] = 'Bearer ' + token
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  me (context) {
    return new Promise((resolve, reject) => {
      API.get(`auth/me/`, { headers: {
        'Authorization': `Bearer ${context.getters.token}`
      } })
        .then(response => {
          context.commit('SET_AUTHUSER', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  logout (context) {
    return new Promise((resolve, reject) => {
      API.get(`auth/logout/`, { headers: {
        'Authorization': `Bearer ${context.getters.token}`
      } })
        .then(response => {
          context.commit('LOGOUT')
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

const getters = {
  authUser: state => state.authUser,
  token: state => state.token,
  isAuth: state => state.isAuth,
  message: state => state.message
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
