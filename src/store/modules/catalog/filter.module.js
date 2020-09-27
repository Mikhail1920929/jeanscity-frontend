const state = {
  filter: {},
  attrs: []
}

const mutations = {
  UNSET_FILTER (state) {
    state.filter = {}
  },
  SET_ATTRS (state, payload) {
    state.attrs = Object.assign({}, payload)
  },
  SET_FILTER (state, payload) {
    state.filter = Object.assign({}, payload)
  },
  SET_CATEGORIES (state, payload) {
    state.filter = Object.assign({}, state.filter, { categories: payload })
  },
  SET_ATTRIBUTES (state, payload) {
    state.filter = Object.assign({}, state.filter, { [Object.keys(payload)[0]]: Object.values(payload)[0] })
  },
  SET_PRICES (state, payload) {
    state.filter = Object.assign({}, state.filter, { prices: [payload[0], payload[1]] })
  },
  UNSET_PRICES (state) {
    delete state.filter.prices
  },
  SET_SALE (state, payload) {
    state.filter = Object.assign({}, state.filter, { sale: payload })
  },
  SET_PAGE (state, payload) {
    state.filter = Object.assign({}, state.filter, { page: payload })
  }
}

const actions = {
  attrs ({ commit, dispatch }, attrs) {
    commit('SET_ATTRS', attrs)
  },
  filterFromQuery ({ commit }, filter) {
    commit('SET_FILTER', filter)
    // dispatch('filterQuery')
  },
  filterQuery ({ state }) {
    this.$router.push({ query: state.filter })
  },
  disableFilter ({ commit }) {
    commit('UNSET_FILTER')
  },
  categories ({ commit, dispatch }, categories) {
    state.filter.prices = []
    // console.log(categories)
    commit('SET_CATEGORIES', categories)
    // dispatch('filterQuery')
  },
  disableCategories ({ commit }) {
    delete state.filter.categories
    commit('SET_CATEGORIES', [])
  },
  attributes ({ commit, dispatch }, attributes) {
    commit('SET_ATTRIBUTES', attributes)
    // dispatch('filterQuery')
  },
  disablePrices ({ commit }) {
    commit('UNSET_PRICES')
  },
  prices ({ commit, dispatch }, price) {
    commit('SET_PRICES', price)
    // dispatch('filterQuery')
  },
  sale ({ commit, dispatch }, sale) {
    commit('SET_SALE', sale)
    // dispatch('filterQuery')
  },
  page ({ commit, dispatch }, page) {
    commit('SET_PAGE', page)
    // dispatch('filterQuery')
  }
}

const getters = {
  filter: state => state.filter,
  attrs: state => state.attrs
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
