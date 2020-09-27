<template>
    <q-btn-dropdown
      class="brands-dropdown"
      auto-close
      stretch
      flat
      menu-anchor="bottom middle"
      menu-self="top middle"
      @click='scrollOrShow'
    >
      <template v-slot:label>
        <div class="q-tab__content">
          Бренды
        </div>
      </template>
        <div class="row brands" v-if="show">
            <router-link class="col-3 q-pa-sm"
                         v-for="value in attribute.values" :key="value.value"
                         :to="{ name: 'front.catalog', query: { brand: value.value} }"
            >
                {{value.content}}
            </router-link>
        </div>
    </q-btn-dropdown>
</template>

<script>
import { mapActions } from 'vuex'
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

export default {
  data () {
    return {
      attribute: {},
      show: false
    }
  },
  methods: {
    ...mapActions({
      attributeShow: 'catalog/attributes/show',
    }),
    scrollOrShow () {
      console.log(this.$route)
      this.show = false
      if (this.$route.name === 'front.home') {
        this.scrollToElement()
      } else {
        this.show = !this.show
      }
    },
    scrollToElement () {
      const el = document.getElementById('brands')
      const target = getScrollTarget(el)
      const offset = el.offsetTop
      const duration = 1000
      setScrollPosition(target, offset, duration)
    }
  },
  created () {
    this.attributeShow('brand')
      .then(response => {
        this.attribute = response.data.data
      })
    // this.show = false
  }
}
</script>

<style lang="stylus">
  .brands-dropdown
    margin: 0 auto
    /*width: 100%*/
    max-width: 1170px
    left: 0 !important
    right: 0
    margin: 0
    border-radius: 2px
    .q-btn-dropdown__arrow
      display none
  .brands
    box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12)
    max-width: 1170px !important
    width: 100%
    a
      text-decoration: none;
      color: #3C3C3C;
      font-size: 16px;
      font-weight: 400;
      &:hover
        text-decoration: underline
</style>
