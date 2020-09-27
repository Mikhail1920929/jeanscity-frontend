import API from '../../../api.js'

const state = {
  roles: [],
  list: [],
  item: {}
}

const mutations = {
  SET_USER (state, payload) {
    state.item = Object.assign({}, payload)
  },
  SET_USERS (state, payload) {
    state.list = Object.assign({}, payload)
  },
  SET_ROLES (state, payload) {
    state.roles = Object.assign({}, payload)
  }
}

const actions = {
  index (context, filter) {
    return new Promise((resolve, reject) => {
      API.get(`users/`, {
        headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        },
        params: filter
      })
        .then(response => {
          context.commit('SET_USERS', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  roles (context) {
    return new Promise((resolve, reject) => {
      API.get(`users/roles/`, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('SET_ROLES', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  show (context, userId) {
    return new Promise((resolve, reject) => {
      API.get(`users/${userId}`, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  store (context, newItem) {
    return new Promise((resolve, reject) => {
      API.post(`users/`, newItem, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('SET_USET', response.data.data)
          context.dispatch('index')
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  update (context, data) {
    return new Promise((resolve, reject) => {
      API.put(`users/${data.id}`, data, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('SET_USER', response.data.data)
          context.dispatch('index')
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  destroy (context, userId) {
    return new Promise((resolve, reject) => {
      API.delete(`users/${userId}`, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('SET_USER', response.data.data)
          context.dispatch('index')
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

const getters = {
  item: state => state.item,
  list: state => state.list,
  roles: state => state.roles
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
