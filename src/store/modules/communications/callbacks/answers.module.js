import API from '../../../../api.js'

const state = {
  item: {},
  list: []
}

const mutations = {
  SET_ANSWER (state, payload) {
    state.item = payload
  },
  SET_ANSWERS (state, payload) {
    state.list = payload
  }
}

const actions = {
  index (context, callbackId) {
    return new Promise((resolve, reject) => {
      API.get(`callbacks/${callbackId}/answers/`, {
        headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        }
      })
        .then(response => {
          context.commit('SET_ANSWERS', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  store (context, answer) {
    return new Promise((resolve, reject) => {
      API.post(`callbacks/${answer.callback_id}/answers/`, answer, {
        headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        }
      })
        .then(response => {
          context.commit('SET_ANSWER', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  show ({ commit }, answer) {
    return new Promise((resolve, reject) => {
      API.get(`callbacks/${answer.callbackId}/answers/${answer.callbackAnswerId}`)
        .then(response => {
          commit('SET_ANSWER', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  destroy ({ commit }, answer) {
    return new Promise((resolve, reject) => {
      API.delete(`callbacks/${answer.callbackId}/answers/${answer.callbackAnswerId}`)
        .then(response => {
          commit('SET_ANSWER', response.data.data)
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
  message: state => state.message
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
