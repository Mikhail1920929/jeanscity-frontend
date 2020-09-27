import CustomersModule from './customers.module'
import Orders from './orders'

export default {
  namespaced: true,
  modules: {
    orders: {
      ...Orders
    },
    customers: {
      ...CustomersModule
    }
  }
}
