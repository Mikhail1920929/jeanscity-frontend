import API from '../../../../api.js'
import AnswersModule from './answers.module'

const state = {
  item: {},
  list: [],
  unanswered: null
}

const mutations = {
  SET_CALLBACK (state, payload) {
    state.item = payload
  },
  SET_UNANSWERED (state, payload) {
    state.unanswered = payload
  },
  SET_CALLBACKS (state, payload) {
    state.list = payload
  }
}

const actions = {
  unanswered (context) {
    return new Promise((resolve, reject) => {
      API.get(`callbacks/unanswered`, {
        headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}` // TODO: Смутировать в API (Axios)
        }
      })
        .then(response => {
          context.commit('SET_UNANSWERED', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  index (context, filter) {
    return new Promise((resolve, reject) => {
      API.get(`callbacks/`, {
        headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        },
        params: filter
      })
        .then(response => {
          context.commit('SET_CALLBACKS', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  store (context, newItem) {
    return new Promise((resolve, reject) => {
      API.post(`callbacks/`, newItem)
        .then(response => {
          context.commit('SET_CALLBACK', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  show (context, callbackId) {
    return new Promise((resolve, reject) => {
      API.get(`callbacks/${callbackId}`, {
        headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        }
      })
        .then(response => {
          context.commit('SET_CALLBACK', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  update (context, callback) {
    return new Promise((resolve, reject) => {
      API.put(`callbacks/${callback.id}`, callback, {
        headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        }
      })
        .then(response => {
          context.commit('SET_CALLBACK', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  destroy (context, callbackId) {
    return new Promise((resolve, reject) => {
      API.delete(`callbacks/${callbackId}`)
        .then(response => {
          context.commit('SET_CALLBACK', response.data.data)
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
  message: state => state.message,
  unanswered: state => state.unanswered
}

export default {
  namespaced: true,
  modules: {
    answers: {
      ...AnswersModule
    }
  },
  state,
  getters,
  mutations,
  actions
}
