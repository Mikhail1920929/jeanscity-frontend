import API from '../../../../api.js'
import ValuesModule from './values.module'

const state = {
  is_loading: false,
  list: [],
  item: {},
  types: {},
  common: [],
  category: []
}

const getters = {
  isLoading: state => state.is_loading,
  item: state => state.item,
  list: state => state.list,
  types: state => state.types,
  common: state => state.common
}

const mutations = {
  SET_LOADING (state, payload) {
    state.is_loading = payload
  },
  SET_ATTRIBUTE (state, payload) {
    state.item = Object.assign({}, payload)
  },
  SET_ATTRIBUTES (state, payload) {
    state.list = Object.values(payload)
  },
  SET_TYPES (state, payload) {
    state.types = Object.values(payload)
  },
  SET_COMMON (state, payload) {
    state.common = payload
  },
}

const actions = {
  common (context) {
    context.commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      API.get(`attributes/common`)
        .then(response => {
          context.commit('SET_COMMON', response.data.data)
          context.commit('SET_LOADING', false)
        })
        .catch(error => {
          context.commit('SET_LOADING', false)
          reject(error)
        })
    })
  },
  index (context, filter) {
    context.commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      API.get(`attributes/`, {
        params: filter
      })
        .then(response => {
          context.commit('SET_ATTRIBUTES', response.data.data)
          context.commit('SET_LOADING', false)
          resolve(response)
        })
        .catch(error => {
          context.commit('SET_LOADING', false)
          reject(error)
        })
    })
  },
  show (context, attributeId) {
    context.commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      API.get(`attributes/${attributeId}`, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('SET_ATTRIBUTE', response.data.data)
          context.commit('SET_LOADING', false)
          resolve(response)
        })
        .catch(error => {
          context.commit('SET_LOADING', false)
          reject(error)
        })
    })
  },
  store (context, newItem) {
    context.commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      API.post(`attributes/`, newItem, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('SET_ATTRIBUTE', response.data.data)
          context.commit('SET_LOADING', false)
          resolve(response)
        })
        .catch(error => {
          context.commit('SET_LOADING', false)
          reject(error)
        })
    })
  },
  update (context, attribute) {
    context.commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      API.put(`attributes/${attribute.id}`, attribute, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('SET_ATTRIBUTE', response.data.data)
          context.commit('SET_LOADING', false)
          resolve(response)
        })
        .catch(error => {
          context.commit('SET_LOADING', false)
          reject(error)
        })
    })
  },
  destroy (context, attributeId) {
    context.commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      API.delete(`attributes/${attributeId}`, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('SET_ATTRIBUTE', response.data.data)
          context.commit('SET_LOADING', false)
          resolve(response)
        })
        .catch(error => {
          context.commit('SET_LOADING', false)
          reject(error)
        })
    })
  },
  types (context) {
    return new Promise((resolve, reject) => {
      API.get('/attributes/types', { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('SET_TYPES', response.data.data)
          resolve(response)
        })
        .catch(error => {
          context.commit('SET_LOADING', false)
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  modules: {
    values: {
      ...ValuesModule
    }
  },
  state,
  getters,
  mutations,
  actions
}
