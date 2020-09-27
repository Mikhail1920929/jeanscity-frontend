<template>
    <div class="q-py-md q-px-none row container items-start q-col-gutter-x-lg">
        <div class="col-md-3 col-sm-4 col-xs-12 q-mb-xs-xl">
          <div class="expansion-shadow" v-if="!$q.screen.xs">
            <filters/>
          </div>
          <div class="expansion-shadow" v-if="$q.screen.xs">
            <q-expansion-item
                    class="bg-white expansion-item"
                    icon="sort"
                    label="Фильтры"
                    dense-toggle
            >
              <q-separator />
              <filters/>
            </q-expansion-item>
          </div>
        </div>
        <div class="row q-col-gutter-x-sm items-stretch col-md-9 col-sm-8 col-xs-12 product-items">
            <template v-if="productsLoading">
                <div class="row full-width items-center justify-center">
                    <q-spinner
                            color="primary"
                            size="3em"
                    />
                </div>
            </template>
            <template v-else>
                <template v-if="products.length > 0">
                    <list-item
                          v-for="product in products"
                          :key="product.id"
                          :product="product"
                    />
                    <q-pagination
                            @input="handleCatalogPage($event)"
                          :max="meta.last_page"
                          :direction-links="true"
                          v-model="meta.current_page"
                          :maxPages="5"
                          class="full-width justify-sm-end justify-xs-center"
                    />
                </template>
                <template v-else-if="products.length === 0">
                    Товары не найдены
                </template>

            </template>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ListItem from '../components/front/product/ListItem'
import Filters from '../components/front/attribute/Filters'

import FilterEventBus from '../events/filter'

export default {
  components: {
    ListItem,
    Filters
  },
  data () {
    return {
      localFilter: {
        page: 1,
        categories: []
      },
      attributes: [],
      meta: {
        current_page: 1,
        last_page: 2
      }
    }
  },
  watch: {
    '$route.query.categories': function (value) {
      let subCategories = this.category.children.map(child => child.id)
      if (value !== undefined) {
        subCategories = [value]
        this.filterCategory(value)
      } else {
        this.filterDisable()
      }
      FilterEventBus.$emit('changeSubCategory', subCategories)
    }
  },
  computed: {
    ...mapGetters({
      productsLoading: 'catalog/products/loading',
      products: 'catalog/products/list',
      filter: 'catalog/filter/filter',
      category: 'catalog/categories/item'
    })
  },
  methods: {
    ...mapActions({
      productsIndex: 'catalog/products/index',
      filterQuery: 'catalog/filter/filterQuery',
      filterFromQuery: 'catalog/filter/filterFromQuery',
      filterPage: 'catalog/filter/page',
      filterAttrs: 'catalog/filter/attrs',
      filterCategory: 'catalog/filter/categories',
      filterDisable: 'catalog/filter/disableFilter',
      filterPrices: 'catalog/filter/prices',
      filterDisablePrices: 'catalog/filter/disablePrices',
      filterSale: 'catalog/filter/sale'
    }),
    handleCatalogPage (page) {
      this.localFilter.page = page
      this.filterPage(page)
      this.$router.push({ query: this.filter })
      this.productFilter()
    },
    productFilter () {
      this.productsIndex(this.localFilter)
        .then(response => {
          this.meta = response.data.meta
          FilterEventBus.$emit('setFilterPrice', response.data.prices)
        })
    },
    fromRouteQuery () {
      this.localFilter = this.$route.query
      if (this.$route.query.categories !== undefined) {
        this.localFilter.categories = [this.$route.query.categories]
        FilterEventBus.$emit('changeSubCategory', [this.$route.query.categories])
      }
      this.filterFromQuery(this.$route.query)
    }
  },
  created () {
    FilterEventBus.$on('changeFilterPrice', (payload) => {
      this.localFilter.prices = payload
      this.filterPrices(payload)
      this.filterQuery()
      this.productFilter()
    })

    FilterEventBus.$on('changeFilterSale', (payload) => {
      this.localFilter.sale = payload
      this.filterSale(payload)
      this.filterQuery()
      this.productFilter()
    })

    FilterEventBus.$on('changeSubCategory', (payload) => {
      delete this.localFilter.prices
      this.localFilter.categories = payload
      this.filterQuery()
      this.handleCatalogPage(1)
    })

    FilterEventBus.$on('handleFilterCategoryAttribute', (payload) => {
      Object.assign(this.localFilter, payload)
      this.filterQuery()
      this.productFilter()
    })

    this.fromRouteQuery()
  }
}
</script>

<style lang="stylus" scoped>
    .q-circular-progress
        color #E71821
        margin 0 auto
    .expansion-shadow
        box-shadow 0px 4px 15px rgba(0, 0, 0, 0.25)
        color #3C3C3C
        .expansion-item
            z-index 99
            font-weight 500
            font-size 16px
            .filter
                font-size 14px
                font-weight 400
            .q-item
                padding 8px 24px 8px 36px
            p
                font-size 13px
            .q-item__section--main
                padding-left 16px
    .product-items
        .heading
            font-size 20px
            margin 0
            color #3C3C3C
            font-weight normal
        .text-h5
            font-size 20px
        .text-h6
            font-size 16px
        p
            color #3C3C3C
            font-weight 300
    .sail-label
        background #CC0008
        padding 3px 5px
        display initial
        color #fff
        font-weight 700
        position absolute
        right 8px
        top 8px
    .product-hover:hover
        z-index 100
    .focused-item:hover
        box-shadow 0px 4px 15px rgba(0, 0, 0, 0.25)
        background #fff
        transform scale(1.15)
        transition transform .3s ease
        border-radius 4px
        .info
            padding-left 10px
            transition padding-left .3s ease
        .sizes
            display flex
    .price
        font-size 20px
        color #3C3C3C
    .sail
        color #B61118
        padding-right 15px
        font-size 20px
    .not-sail
        display flex
        align-items center
        font-size 16px
        color #868686
        text-decoration line-through
    .sizes
        display none
        height 99%
    .sizes-item
        padding 5px 10px
        margin-bottom 1px
        margin-right 1px
        font-weight 700
        text-align center
        opacity .5

    @media (max-width $breakpoint-sm)
        .focused-item:hover
            transform scale(1.1)

    @media (max-width $breakpoint-xs)
        .focused-item:hover
            transform scale(1.05)
</style>
