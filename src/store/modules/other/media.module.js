import API from '../../../api.js'

const state = {}

const mutations = {}

const actions = {
  index (context, filter) {
    return new Promise((resolve, reject) => {
      API.get(`media/`, {
        params: filter
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  store (context, file) {
    return new Promise((resolve, reject) => {
      API.post(`media/`, file, {
        headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`,
          'Content-Type': 'multipart/form-data',
          'Accept': 'multipart/form-data'
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  destroy (context, file) {
    return new Promise((resolve, reject) => {
      API.delete(`media/${file}`, {
        headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
