import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import Catalog from './modules/catalog'
import Communications from './modules/communications'
import Orders from './modules/orders'
import Other from './modules/other'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      catalog: {
        ...Catalog
      },
      communications: {
        ...Communications
      },
      orders: {
        ...Orders
      },
      other: {
        ...Other
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
    // eslint-disable-next-line no-mixed-spaces-and-tabs
  })

  return Store
}
