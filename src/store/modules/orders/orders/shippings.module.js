import API from '../../../../api.js'

const state = {
  list: [],
  item: {}
}

const getters = {
  item: state => state.item,
  list: state => state.list
}

const mutations = {
  SET_SHIPPING (state, payload) {
    state.item = Object.assign({}, payload)
  },
  SET_SHIPPINGS (state, payload) {
    state.list = Object.values(payload)
  }
}

const actions = {
  index (context) {
    return new Promise((resolve, reject) => {
      API.get(`shippings/`)
        .then(response => {
          context.commit('SET_SHIPPINGS', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  show (context, shippingId) {
    return new Promise((resolve, reject) => {
      API.get(`shippings/${shippingId}`)
        .then(response => {
          context.commit('SET_SHIPPING', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  store (context, newItem) {
    return new Promise((resolve, reject) => {
      API.post(`shippings/`, newItem, {
        headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` }
      })
        .then(response => {
          context.commit('SET_SHIPPING', response.data.data)
          context.dispatch('index')
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  update (context, shipping) {
    return new Promise((resolve, reject) => {
      API.put(`shippings/${shipping.id}`, shipping, {
        headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` }
      })
        .then(response => {
          context.commit('getShipping', response.data.data)
          context.commit('getMessage', response.data.message)
          context.dispatch('index')
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  destroy (context, shippingId) {
    return new Promise((resolve, reject) => {
      API.delete(`shippings/${shippingId}`, {
        headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` }
      })
        .then(response => {
          context.commit('SET_SHIPPING', response.data.data)
          context.dispatch('index')
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
  state,
  getters,
  mutations,
  actions
}
