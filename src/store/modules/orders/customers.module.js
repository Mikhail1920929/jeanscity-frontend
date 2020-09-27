import API from '../../../api.js'

const state = {
  item: {},
  list: []
}

const mutations = {
  SET_CUSTOMER (state, payload) {
    state.item = Object.assign({}, payload)
  },
  SET_CUSTOMERS (state, payload) {
    state.list = Object.assign({}, payload)
  }
}

const actions = {
  localCustomer (context) {
    localStorage.setItem('customer_id', context.state.item.id)
  },
  index (context, filter) {
    return new Promise((resolve, reject) => {
      API.get(`customers/`, {
        headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` },
        params: filter
      })
        .then(response => {
          context.commit('SET_CUSTOMERS', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  show (context, customerId) {
    return new Promise((resolve, reject) => {
      API.get(`customers/${customerId}`, {
        headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` }
      })
        .then(response => {
          context.commit('SET_CUSTOMER', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  store (context, newItem) {
    return new Promise((resolve, reject) => {
      API.post(`customers/`, newItem)
        .then(response => {
          context.commit('SET_CUSTOMER', response.data.data)
          context.dispatch('index')
          context.dispatch('localCustomer')
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  update (context, customer) {
    return new Promise((resolve, reject) => {
      API.put(`customers/${customer.id}`, customer, {
        headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` }
      })
        .then(response => {
          context.commit('SET_CUSTOMER', response.data.data)
          context.dispatch('index')
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  destroy (context, customerId) {
    return new Promise((resolve, reject) => {
      API.delete(`customers/${customerId}`, {
        headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` }
      })
        .then(response => {
          context.commit('SET_CUSTOMER', response.data.data)
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
  list: state => state.list
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
