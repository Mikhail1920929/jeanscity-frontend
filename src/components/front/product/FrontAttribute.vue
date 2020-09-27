<template>
  <div v-show="show" class="absolute-top-left sizes">
    <ul
            v-for="(values, index) in Object.values(variantAttributes)"
            :key="index"
            class="sizes"
    >
      <li
          v-for="value in values"
          :key="value"
      >
        {{ value }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FrontAttribute',
  computed: {
    ...mapGetters({
      categoryAttributes: 'catalog/categories/attributes'
    })
  },
  props: {
    show: Boolean,
    variantAttributes: Object
  },
  methods: {
    toggleValue (value) {
      this.activeValue = value
    }
  }
}
</script>

<style lang="stylus" scoped>
  .sizes
    opacity 1
    transition .3s
    z-index 99
    list-style none
    margin 0
    padding 0
    max-height 270px
    display flex
    flex-direction column
    flex-wrap wrap
    li
      background-color #000
      margin-bottom 2px
      color #FFF
      opacity 0.4
      padding 4px 10px
      font-size 14px
      font-weight 600
      cursor pointer
      margin 2px 0 0 2px
</style>
