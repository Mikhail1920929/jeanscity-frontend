import Attributes from './attributes'
import Products from './products'

import FilterModule from './filter.module'
import CategoriesModule from './categories.module'

export default {
  namespaced: true,
  modules: {
    attributes: {
      ...Attributes
    },
    categories: {
      ...CategoriesModule
    },
    filter: {
      ...FilterModule
    },
    products: {
      ...Products
    }
  }
}
