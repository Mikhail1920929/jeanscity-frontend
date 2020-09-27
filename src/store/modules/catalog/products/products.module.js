import API from '../../../../api.js'
import VariantsModule from './variants.module'

const state = {
  list: [],
  item: {},
  loading: true
}

const getters = {
  item: state => state.item,
  list: state => state.list,
  loading: state => state.loading
}

const mutations = {
  CLEAR_PRODUCT (state) {
    state.item = {
      attributes: {},
      categories: [null],
      gallery: []
    }
  },
  SET_PRODUCT (state, payload) {
    state.item = Object.assign({}, payload)
  },
  SET_PRODUCTS (state, payload) {
    state.list = Object.values(payload)
  },
  SET_LOADING (state, payload) {
    state.loading = payload
  }
}

const actions = {
  clear ({ commit }) {
    commit('CLEAR_PRODUCT')
  },
  variants (context, params) {
    return new Promise((resolve, reject) => {
      API.get(`products/variants`, {
        params: params
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  index (context, filter) {
    context.commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      API.get(`products/`, {
        params: filter
      })
        .then(response => {
          context.commit('SET_LOADING', false)
          context.commit('SET_PRODUCTS', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  show ({ commit }, slug) {
    return new Promise((resolve, reject) => {
      API.get(`products/${slug}`)
        .then(response => {
          commit('SET_PRODUCT', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  store (context, newItem) {
    return new Promise((resolve, reject) => {
      API.post(`products/`, newItem, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('SET_PRODUCT', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  update (context, product) {
    return new Promise((resolve, reject) => {
      API.put(`products/${product.slug}`, product, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('SET_PRODUCT', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  destroy (context, id) {
    return new Promise((resolve, reject) => {
      API.delete(`products/${id}`, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('SET_PRODUCT', response.data.data)
          context.dispatch('index')
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  view (context, slug) {
    return new Promise((resolve, reject) => {
      API.get(`products/view/${slug}`)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  modules: {
    variants: {
      ...VariantsModule
    }
  },
  state,
  getters,
  mutations,
  actions
}
