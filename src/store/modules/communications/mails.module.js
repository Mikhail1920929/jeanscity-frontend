import API from '../../../api.js'

const state = {
  list: [],
  item: {}
}

const getters = {
  item: state => state.item,
  list: state => state.list
}

const mutations = {
  SET_MAIL (state, payload) {
    state.item = Object.assign({}, payload)
  },
  SET_MAILS (state, payload) {
    state.list = Object.assign({}, payload)
  }
}

const actions = {
  index (context, filter) {
    return new Promise((resolve, reject) => {
      API.get(`mails/`, {
        headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` },
        params: filter
      })
        .then(response => {
          context.commit('SET_MAILS', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  show (context, mailId) {
    return new Promise((resolve, reject) => {
      API.get(`mails/${mailId}`, {
        headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` }
      })
        .then(response => {
          context.commit('SET_MAIL', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  store (context, newItem) {
    return new Promise((resolve, reject) => {
      API.post(`mails/`, newItem, {
        headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` }
      })
        .then(response => {
          context.commit('SET_MAIL', response.data.data)
          context.dispatch('index')
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  update (context, mail) {
    return new Promise((resolve, reject) => {
      API.put(`mails/${mail.id}`, mail, {
        headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` }
      })
        .then(response => {
          context.commit('SET_MAIL', response.data.data)
          context.dispatch('index')
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  destroy (context, mailId) {
    return new Promise((resolve, reject) => {
      API.delete(`mails/${mailId}`, {
        headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` }
      })
        .then(response => {
          context.commit('getMail', response.data.data)
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
