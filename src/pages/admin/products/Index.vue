<template>
    <div class="row">
        <div class="col-4 q-pa-lg">
            <q-form>
                <FilterPrice/>
                <FilterAttributesCommon
                        :attributes="filter"
                />
                <FilterCategories
                        :category="filter.categories[0]"
                />
                <template v-if="filter.categories.length === 0">
                    <span class="text-grey-6">Выберите категорию, чтобы отобразить атрибуты</span>
                </template>
                <template v-else>
                    <FilterAttributesCategory
                            :filtersAttrs="filter"
                    />
                    <FilterAttributesSelectableCategory
                            :filtersAttrs="filter"
                    />
                </template>
            </q-form>
        </div>
        <div class="col-8 q-pa-lg">
            <q-table
                    @request="filterPage"
                    :data="products"
                    selection="multiple"
                    :columns="columns"
                    :selected.sync="selected"
                    :pagination.sync="pagination"
                    title="Товары"
            >
                <template v-slot:top>
                    <div class="row full-width">
                        <h1 class="text-h6 q-ma-none">Товары</h1>
                        <q-space />
                        <q-btn to="/admin/products/new" outline dense unelevated color="primary" label=" Добавить" icon="add"/>
                        <template v-if="selected.length === 1">
                            <q-btn flat dense color="primary" :disable="loading" label="Редактировать товар" :to="`/admin/products/edit/${selected[0].slug}`" />
                        </template>
                        <template v-if="selected.length > 0">
                            <q-btn class="on-right" flat dense color="negative" :disable="loading" label="Удалить товары" @click="confirm = true" />
                        </template>
                    </div>
                </template>
            </q-table>
        </div>
        <q-dialog v-model="confirm" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <span class="q-ml-sm">Удалить выбранные товары со всеми вариациями?.</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Нет" color="primary" v-close-popup />
                    <q-btn flat @click="removeRows" label="Да" color="negative" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

import FilterPrice from '../../../components/filter/Price'

import FilterCategories from '../../../components/admin/attribute/filter/Categories'
import FilterAttributesCategory from '../../../components/admin/attribute/filter/Category'
import FilterAttributesSelectableCategory from '../../../components/admin/attribute/filter/SelectableCategory'
import FilterAttributesCommon from '../../../components/admin/attribute/filter/Common'

import FilterEventBus from '../../../events/filter'

export default {
  name: 'ProductsIndex',
  components: {
    FilterPrice,
    FilterCategories,
    FilterAttributesCategory,
    FilterAttributesSelectableCategory,
    FilterAttributesCommon
  },
  data () {
    return {
      confirm: false,
      loading: false,
      pagination: {
        page: 1,
        rowsPerPage: 12,
        rowsNumber: null
      },
      filter: {
        page: 1,
        categories: []
      },
      selected: [],
      columns: [
        {
          name: 'name',
          label: 'Название',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`
        },
        {
          name: 'price',
          label: 'Цена',
          align: 'left',
          field: row => row.price,
          format: val => val === null ? 'Бесплатно' : `${val} рублей`
        },
        {
          name: 'sale_price',
          label: 'Цена со скидкой',
          align: 'left',
          field: row => row.sale_price,
          format: val => val === null ? 'Без скидки' : `${val} рублей`
        },
        {
          name: 'views',
          label: 'Просмотры',
          align: 'right',
          field: row => row.views,
          format: val => `${val}`
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      products: 'catalog/products/list',
      common: 'catalog/attributes/common'
    })
  },
  methods: {
    ...mapActions({
      productsIndex: 'catalog/products/index',
      productDestroy: 'catalog/products/destroy',
      commonAttributes: 'catalog/attributes/common'
    }),
    editProduct (productId) {
      this.$router.push(`/admin/products/edit/${productId}`)
    },
    removeRows () {
      this.selected.forEach(product => {
        this.productDestroy(product.slug)
      })
    },
    filterPage ({ pagination }) {
      this.filter.page = pagination.page
      this.pagination.page = pagination.page
      this.debouncedProductIndex()
    },
    filterProducts () {
      this.productsIndex(this.filter)
        .then(response => {
          this.pagination.rowsNumber = response.data.meta.total
          FilterEventBus.$emit('setFilterPrice', response.data.prices)
        })
    }
  },
  created () {
    if (this.common.length === 0) {
      this.commonAttributes()
    }

    FilterEventBus.$on('changeFilterPrice', (payload) => {
      this.filter.prices = payload
      this.debouncedProductIndex()
    })

    FilterEventBus.$on('changeFilterSale', (payload) => {
      this.filter.sale = payload
      this.debouncedProductIndex()
    })

    FilterEventBus.$on('handleFilterCategoryAttribute', (payload) => {
      Object.assign(this.filter, payload)
      this.debouncedProductIndex()
    })

    FilterEventBus.$on('changeCommonAttributes', (payload) => {
      Object.assign(this.filter, payload)
      this.debouncedProductIndex()
    })

    FilterEventBus.$on('selectCategory', (payload) => {
      delete this.filter.prices
      this.filter.categories[0] = payload
      this.debouncedProductIndex()
    })

    FilterEventBus.$on('resetCategory', () => {
      this.filter = {
        page: 1,
        rowsPerPage: 10,
        categories: []
      }
      this.debouncedProductIndex()
    })

    this.debouncedProductIndex = _.debounce(this.filterProducts, 500)
    this.debouncedProductIndex()
  }
}
</script>

<style scoped>

</style>
