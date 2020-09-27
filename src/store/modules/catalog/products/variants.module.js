import API from '../../../../api'

const state = {
  list: [],
  item: {}
}

const getters = {
  list: state => state.list,
  item: state => state.item
}

const mutations = {
  // setList (state, payload) {
  //   state.list = Object.values(payload)
  // },
  setItem (state, payload) {
    state.item = Object.assign({}, payload)
  }
}

const actions = {
  index (context, productId) {
    return new Promise((resolve, reject) => {
      API.get(`products/${productId}/variants`)
        .then(response => {
          // context.commit('setList', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  show (context, data) {
    return new Promise((resolve, reject) => {
      API.get(`products/${data.product_id}/variants/${data.variant_id}`)
        .then(response => {
          context.commit('setItem', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  store (context, variant) {
    return new Promise((resolve, reject) => {
      API.post(`products/${variant.product_id}/variants/`, variant, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('setItem', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  update (context, variant) {
    return new Promise((resolve, reject) => {
      API.put(`products/${variant.product.slug}/variants/${variant.id}`, variant, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('setItem', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  destroy (context, data) {
    return new Promise((resolve, reject) => {
      API.delete(`products/${data.product_id}/variants/${data.variant_id}`, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('setItem', response.data.data)
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
