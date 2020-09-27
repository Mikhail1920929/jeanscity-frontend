<template>
  <q-header class="bg-white row no-wrap justify-center" reveal>
    <div class="container row q-col-gutter-x-lg header">
      <q-toolbar class="col-md-2 col-sm-4 col-xs-12 justify-sm-start justify-xs-center mobile-toolbar-height-fix">
        <router-link to="/" class="logo-link"><img src="/statics/images/logo.svg" alt=""></router-link>
      </q-toolbar>
      <q-toolbar class="col-md-10 col-sm-8 col-xs-12 justify-md-between justify-sm-end">
        <div class="col-md-8 col-xl-8 sm-hide xs-hide full-height">
          <q-tabs
            inline-label
            v-if="parents.length > 0"
            v-model="tab"
            narrow-indicator
            indicator-color="jeansred"
            class="bg-white text-jeansgrey full-width tab-links full-height"
          >
            <q-route-tab
              :name="category.slug"
              v-for="category in parents"
              :key="category.id"
              :to="{ name: 'front.catalog', params: { parent: category.slug } }"
              :label="category.name"
            />

            <header-brands/>

            <q-route-tab
              :to="{ name: 'front.catalog', query: { sale: true } }"
              name="sales"
              label="Скидки"
            />

            <q-route-tab
              :to="{ name: 'front.contacts' }"
              name="contacts"
              label="Контакты"
            />
          </q-tabs>
        </div>
        <div
          class="col-xs-12 col-sm-auto col-lg-4 col-md-4 col-xl-4 flex justify-md-end justify-xs-between header-btns no-wrap">
          <q-btn
            router="tel:+79964539303"
            flat style="color: #3C3C3C"
            icon="phone"
            :label="$q.screen.gt.sm ? ' +7 996 453-93-03' : null"
            class="icon-hide"/>
          <!-- todo поиск по сайту: модалка с выбором – сайт/каталог -->
          <!--                        <q-btn router="/" flat style="color: #3C3C3C" icon="search" label="" />-->
          <header-cart/>
          <q-btn-dropdown
            v-if="$q.screen.lt.md"
            auto-close
            stretch
            flat
            color="black"
            icon="menu"
          >

            <q-list
              separator
              link
              class="menu-dropdown text-jeansgrey"
              style="text-decoration: none"
            >

              <q-item
                v-for="category in parents"
                :key="category.id"
                :to="{ name: 'front.catalog', params: { parent: category.slug } }"
                :label="category.name"
              >
                <q-item-section>{{ category.name }}</q-item-section>
              </q-item>

              <q-item :to="{ name: 'front.catalog', query: { sale: true } }">
                <q-item-section>Скидки</q-item-section>
              </q-item>

              <q-item to="/contacts">
                <q-item-section>Контакты</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </div>
  </q-header>
</template>

<script>
import { scroll } from 'quasar'
import { mapGetters, mapActions } from 'vuex'
import HeaderCart from './header/Cart'
import HeaderBrands from './header/Brands'

const { getScrollTarget, setScrollPosition } = scroll

export default {
  name: 'FrontHeader',
  data () {
    return {
      tab: null
    }
  },
  components: {
    HeaderCart,
    HeaderBrands
  },
  beforeMount () {
    if (this.parents.length === 0 && this.categoriesLoading === false) { this.categoriesParents() }
  },
  computed: {
    ...mapGetters({
      categoriesLoading: 'catalog/categories/isLoading',
      parents: 'catalog/categories/parents'
    })
  },
  methods: {
    ...mapActions({
      categoriesParents: 'catalog/categories/parents'
    })
  }
}
</script>

<style lang="stylus">
  .logo-link
    display flex
  .q-toolbar
  .logo-link img
    @media (max-width $breakpoint-xs)
      min-height: 48px !important
      height: 48px !important
  .q-tabs
    .q-tab
      outline: none
      color: #3C3C3C
      padding-top: 0
      padding-bottom: 0
      &.q-tab--active
        .q-tab__indicator
          height 4px
  .header-btns
    a
      text-decoration: none
      color: #3C3C3C
      display: flex
      align-items: center
    .q-btn__content i
      font-size: 24px
    .q-btn-dropdown i
      font-size: 28px;
    .q-btn-dropdown__arrow
      display: none
  .menu-dropdown {
    .q-item {
      min-width: 150px;
    }
  }
</style>
