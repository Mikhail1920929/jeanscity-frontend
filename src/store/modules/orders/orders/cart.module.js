import { Notify } from 'quasar'
import { getCart } from '../../../../helpers/cart'

const state = {
  cart: getCart()
}

const mutations = {
  ADD_TO_CART (state, newItem) {
    state.cart.lines.push(newItem)
  },
  CLEAR_CART (state) {
    state.cart.lines = []
  },
  CHANGE_ITEM (state, data) {
    state.cart.lines.find(line => {
      if (line.product.id === data.id) {
        line.qty += data.qty
      }
    })
  },
  REMOVE_ITEM (state, productId) {
    state.cart.lines.filter((element, index) => {
      if (element.product_id === productId) {
        state.cart.lines.splice(index, 1)
      }
    })
  },
  SET_CUSTOMER_ID (state, payload) {
    state.cart.customer_id = payload
  },
  SET_CUSTOMER (state, payload) {
    state.cart.customer = Object.assign({}, payload)
  },
  SET_SHIPPING (state, payload) {
    state.cart.shipping_id = payload
  }
}

const actions = {
  reduce (context, id) {
    context.commit('CHANGE_ITEM', {
      id: id,
      qty: -1
    })
    context.dispatch('updateLocal')
  },
  increase (context, id) {
    context.commit('CHANGE_ITEM', {
      id: id,
      qty: 1
    })
    context.dispatch('updateLocal')
  },
  updateLocal ({ state }) {
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },
  clear (context) {
    context.commit('CLEAR_CART')
    context.dispatch('updateLocal')
  },
  addToCart (context, product) {
    let line = null
    line = context.state.cart.lines.filter(element => element.product.id === product.id)

    if (line.length === 0) {
      Notify.create({
        message: `Товар '${product.name}' добавлен в корзину`,
        position: 'top',
        color: 'positive'
      })
      context.commit('ADD_TO_CART', {
        product_id: product.id,
        product: product,
        qty: 1
      })
    } else {
      Notify.create({
        message: `Количество товара в корзине увеличилось`,
        position: 'top',
        color: 'positive'
      })
      context.commit('CHANGE_ITEM', { id: product.id, qty: 1 })
    }

    context.dispatch('updateLocal')
  },
  remove (context, id) {
    context.commit('REMOVE_ITEM', id)
    context.dispatch('updateLocal')
    Notify.create({
      message: `Товара удален из корзины`,
      position: 'top',
      color: 'negative'
    })
  },
  setCustomerId (context, id) {
    context.commit('SET_CUSTOMER_ID', id)
    context.dispatch('updateLocal')
  },
  addCustomer (context, customer) {
    context.commit('SET_CUSTOMER', customer)
    context.dispatch('updateLocal')
  },
  addShipping (context, shippingId) {
    context.commit('SET_SHIPPING', shippingId)
    context.dispatch('updateLocal')
  }
}

const getters = {
  cart: state => state.cart,
  lines: state => state.cart.lines,
  count: state => {
    let count = 0
    state.cart.lines.find(line => {
      count += line.qty
      return count
    })

    return count
  },
  customer: state => state.cart.customer
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
