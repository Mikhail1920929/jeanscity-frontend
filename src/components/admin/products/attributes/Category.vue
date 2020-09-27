<template>
    <div class="col">
        <template v-if="attributes !== null && attributes.length > 1">
            <span class="text-weight-medium text-bold q-ma-none">Атрибуты товара</span>
            <component
                    v-for="attribute in attributes.filter(attr => attr.is_select === false)"
                    :key="attribute.id"
                    v-on:changeValue="handleProductCategoryAttribute($event, attribute.slug)"
                    :value="product.attributes[attribute.slug] || null"
                    :attribute="attribute"
                    :is="'type-' + attribute.type"
            />
        </template>
        <template v-if="attributes !== null && attributes.length === 0">
            <span class="text-grey-6">У данной категории нет атрибутов</span>
        </template>
        <template v-else-if="attributes == null">
            <span class="text-grey-6">Выберите категорию, чтобы выбрать атрибуты товара</span>
        </template>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ProductEventBus from '../../../../events/products'

import TypeColor from '../../../../components/admin/attribute/type/Color'
import TypeText from '../../../../components/admin/attribute/type/Text'
import TypePercent from '../../../../components/admin/attribute/type/Percent'

export default {
  name: 'ProductsAttributesCategory',
  components: {
    TypeColor,
    TypeText,
    TypePercent
  },
  computed: {
    ...mapGetters({
      product: 'catalog/products/item'
    })
  },
  props: {
    productAttrs: Object,
    category: Array
  },
  watch: {
    category: function (value) {
      if (value !== null) {
        this.categoryAttributes(value)
          .then(response => {
            this.attributes = response.data.data
          })
      } else {
        this.attributes = null
      }
    }
  },
  methods: {
    ...mapActions({
      categoryAttributes: 'catalog/categories/attributes'
    }),
    handleProductCategoryAttribute (value, slug) {
      this.localProductAttrs[slug] = value
      ProductEventBus.$emit('changeProductCategoryAttribute', this.localProductAttrs)
    },
    loadAttributes (value) {
      if (value !== null) {
        this.categoryAttributes(value)
          .then(response => {
            this.attributes = response.data.data
          })
      } else {
        this.attributes = null
      }
    }
  },
  data () {
    return {
      localProductAttrs: this.productAttrs || {},
      attributes: null
    }
  },
  created () {
    this.loadAttributes(this.category)
    ProductEventBus.$on('selectCategory', (payload) => {
      this.loadAttributes(payload)
    })
  }
}
</script>

<style scoped>

</style>
