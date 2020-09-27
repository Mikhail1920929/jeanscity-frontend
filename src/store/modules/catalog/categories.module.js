import API from '../../../api.js'

const state = {
  is_loading: false,
  parents: [],
  list: [],
  item: {},
  attributes: []
}

const getters = {
  isLoading: state => state.is_loading,
  parents: state => state.parents,
  item: state => state.item,
  list: state => state.list,
  attributes: state => state.attributes
}

const mutations = {
  SET_LOADING (state, payload) {
    state.is_loading = payload
  },
  SET_PARENTS (state, payload) {
    state.parents = Object.values(payload)
  },
  SET_CATEGORY (state, payload) {
    state.item = Object.assign({}, payload)
  },
  SET_CATEGORIES (state, payload) {
    state.list = Object.values(payload)
  },
  SET_CATEGORY_ATTRIBUTES (state, payload) {
    state.attributes = Object.values(payload)
  }
}

const actions = {
  values ({ commit }, payload) {
    commit('SET_CATEGORY_ATTRIBUTES_VALUES', payload)
  },
  clearAttributes ({ commit }) {
    commit('SET_CATEGORY_ATTRIBUTES_VALUES', [])
  },
  attributes (context, categoryIds) {
    context.commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      API.get(`categories/attributes`, {
        params: {
          categories: categoryIds
        }
      })
        .then(response => {
          context.commit('SET_LOADING', false)
          context.commit('SET_CATEGORY_ATTRIBUTES', response.data.data)

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  parents (context) {
    context.commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      API.get(`categories/`, {
        headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        },
        params: {
          return: 'parents'
        }
      })
        .then(response => {
          context.commit('SET_PARENTS', response.data.data)
          context.commit('SET_LOADING', false)
          resolve(response)
        })
        .catch(error => {
          context.commit('SET_LOADING', false)
          reject(error)
        })
    })
  },
  index (context, filter) {
    context.commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      API.get(`categories/`, {
        params: filter
      })
        .then(response => {
          context.commit('SET_CATEGORIES', response.data.data)
          context.commit('SET_LOADING', false)
          resolve(response)
        })
        .catch(error => {
          context.commit('SET_LOADING', false)
          reject(error)
        })
    })
  },
  show ({ commit }, categoryId) {
    commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      API.get(`categories/${categoryId}`)
        .then(response => {
          commit('SET_CATEGORY', response.data.data)
          commit('SET_LOADING', false)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  store (context, newItem) {
    context.commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      API.post(`categories/`, newItem, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          // console.log(response)
          context.commit('SET_CATEGORY', response.data.data)
          context.commit('SET_LOADING', false)
          context.dispatch('index')
          resolve(response)
        })
        .catch(error => {
          context.commit('SET_LOADING', false)
          reject(error)
        })
    })
  },
  update (context, category) {
    context.commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      API.put(`categories/${category.id}`, category, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('SET_CATEGORY', response.data.data)
          context.commit('SET_LOADING', false)
          context.dispatch('index')
          resolve(response)
        })
        .catch(error => {
          context.commit('SET_LOADING', false)
          reject(error)
        })
    })
  },
  destroy (context, categoryId) {
    context.commit('SET_LOADING', true)
    return new Promise((resolve, reject) => {
      API.delete(`categories/${categoryId}`, { headers: {
        'Authorization': `Bearer ${context.rootState.auth.token}`
      } })
        .then(response => {
          context.commit('SET_CATEGORY', response.data.data)
          context.commit('SET_LOADING', false)
          context.dispatch('index')
          resolve(response)
        })
        .catch(error => {
          context.commit('SET_LOADING', false)
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
