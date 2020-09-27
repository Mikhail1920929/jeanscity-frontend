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
  SET_VALUES (state, payload) {
    state.list = Object.values(payload)
  }
}

const actions = {
  index (context, attributeId) {
    return new Promise((resolve, reject) => {
      API.get(`attributes/${attributeId}/values/`)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  update (context, updateItem) {
    return new Promise((resolve, reject) => {
      API.put(`attributes/${updateItem.attribute_id}/values/`,
        updateItem,
        {
          headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` }
        }
      )
        .then(response => {
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
