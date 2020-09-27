import API from '../../../api.js'

const state = {
  list: [],
  item: {}
}

const mutations = {
  SET_HOMESLIDE (state, payload) {
    state.item = Object.assign({}, payload)
  },
  SET_HOMESLIDES (state, payload) {
    state.list = payload
  }
}

const actions = {
  index (context) {
    return new Promise((resolve, reject) => {
      API.get(`homeslides/`)
        .then(response => {
          context.commit('SET_HOMESLIDES', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  show (context, homeSlideId) {
    return new Promise((resolve, reject) => {
      API.get(`homeslides/${homeSlideId}`)
        .then(response => {
          context.commit('SET_HOMESLIDE', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  store (context, newItem) {
    return new Promise((resolve, reject) => {
      API.post(`homeslides/`, newItem, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('SET_HOMESLIDE', response.data.data)
          context.dispatch('index')
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  update (context, slide) {
    return new Promise((resolve, reject) => {
      API.put(`homeslides/${slide.id}`, slide, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('SET_HOMESLIDE', response.data.data)
          context.dispatch('index')
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  destroy (context, homeSlideId) {
    return new Promise((resolve, reject) => {
      API.delete(`homeslides/${homeSlideId}`, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('SET_HOMESLIDE', response.data.data)
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
  mutations,
  actions,
  getters
}
