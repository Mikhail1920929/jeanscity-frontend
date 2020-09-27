import API from '../../../../api.js'
import CartModule from './cart.module'
import LinesModule from './lines.module'
import ShippingsModule from './shippings.module'

const state = {
  statuses: [],
  list: [],
  item: {},
  onhold: null
}

const mutations = {
  SET_ORDER (state, payload) {
    state.item = Object.assign({}, payload)
  },
  SET_ORDERS (state, payload) {
    state.list = Object.values(payload)
  },
  SET_STATUSES (state, payload) {
    state.statuses = Object.values(payload)
  },
  SET_ONHOLD (state, payload) {
    state.onhold = payload
  }
}

const actions = {
  onhold (context) {
    return new Promise((resolve, reject) => {
      API.get(`orders/onhold`, {
        headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        }
      })
        .then(response => {
          context.commit('SET_ONHOLD', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  index (context, filter) {
    return new Promise((resolve, reject) => {
      API.get(`orders/`, {
        headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        },
        params: filter
      })
        .then(response => {
          context.commit('SET_ORDERS', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  statuses (context) {
    return new Promise((resolve, reject) => {
      API.get(`orders/statuses/`, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('SET_STATUSES', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  show (context, orderId) {
    return new Promise((resolve, reject) => {
      API.get(`orders/${orderId}`, { headers: {
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
      API.post(`orders/`, newItem)
        .then(response => {
          context.commit('SET_ORDER', response.data.data)
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
      API.put(`orders/${data.id}`, data, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('SET_ORDER', response.data.data)
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
      API.delete(`orders/${userId}`, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('SET_ORDER', response.data.data)
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
  statuses: state => state.roles,
  onhold: state => state.onhold
}

export default {
  namespaced: true,
  modules: {
    cart: {
      ...CartModule
    },
    lines: {
      ...LinesModule
    },
    shippings: {
      ...ShippingsModule
    }
  },
  state,
  getters,
  mutations,
  actions
}
