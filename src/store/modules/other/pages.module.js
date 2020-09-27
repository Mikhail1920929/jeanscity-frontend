import API from '../../../api.js'

const state = {
  item: {},
  list: []
}

const mutations = {
  SET_PAGE (state, payload) {
    state.item = Object.assign({}, payload)
  },
  SET_PAGES (state, payload) {
    state.list = payload
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
  actions: {
    index (context) {
      return new Promise((resolve, reject) => {
        API.get(`pages/`)
          .then(response => {
            context.commit('SET_PAGES', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    show (context, slug) {
      return new Promise((resolve, reject) => {
        API.get(`pages/${slug}`)
          .then(response => {
            context.commit('SET_PAGE', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    store (context, newItem) {
      return new Promise((resolve, reject) => {
        API.post(`pages/`, newItem, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}` }
        })
          .then(response => {
            context.commit('SET_PAGE', response.data.data)
            context.dispatch('index')
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    update (context, page) {
      return new Promise((resolve, reject) => {
        API.put(`pages/${page.slug2}`, page, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}` }
        })
          .then(response => {
            context.commit('SET_PAGE', response.data.data)
            context.dispatch('index')
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    destroy (context, page) {
      return new Promise((resolve, reject) => {
        API.delete(`pages/${page.slug}`, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}` }
        })
          .then(response => {
            context.commit('SET_PAGE', response.data.data)
            context.dispatch('index')
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
