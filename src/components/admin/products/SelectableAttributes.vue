<template>
  <div>
    <template v-if="common.filter(attr => attr.is_select === true) > 0">
      <div class="col">
        <span class="text-bold">Общие характеристики</span>
        <div
          v-for="attribute in common.filter(attr => attr.is_select === true)"
          :key="attribute.id"
        >
          <component
            v-on:changeValue="productAttributes[attribute.slug] = $event"
            :value="productAttributes[attribute.slug]"
            :attribute="attribute"
            :is="'type-selectable-' + attribute.type"
          />
        </div>
      </div>
    </template>
    <template v-if="attributes !== null && attributes.filter(attr => attr.is_select === true).length > 0">
      <div class="col">
        <span class="text-bold">Характеристики категории</span>
        <div
          v-for="attribute in attributes.filter(attr => attr.is_select === true)"
          :key="attribute.id"
        >
          <component
            v-on:changeValue="handleAttributeValue($event, attribute.slug)"
            :value="productAttributes[attribute.slug]"
            :attribute="attribute"
            :is="'type-selectable-' + attribute.type">
          </component>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TypeSelectableColor from '../../../components/admin/attribute/type/selectable/Color'
import TypeSelectableText from '../../../components/admin/attribute/type/selectable/Text'
import ProductEventBus from '../../../events/products'

export default {
  name: 'ProductsSelectableAttributes',
  data () {
    return {
      productAttributes: {}
    }
  },
  props: {
    category: Array
  },
  components: {
    TypeSelectableColor,
    TypeSelectableText
  },
  computed: {
    ...mapGetters({
      common: 'catalog/attributes/common',
      attributes: 'catalog/categories/attributes'
    })
  },
  methods: {
    ...mapActions({
      categoryAttributes: 'catalog/categories/attributes',
      attributesCommon: 'catalog/attributes/common'
    }),
    handleAttributeValue (value, slug) {
      this.productAttributes[slug] = value
      if (Object.values(this.productAttributes).length === (this.common.filter(attr => attr.is_select).length + (this.attributes.filter(attr => attr.is_select).length))) {
        ProductEventBus.$emit('changeProductAttribute', this.productAttributes)
      }
    },
    setAttributes (value) {
      if (value !== null) {
        this.categoryAttributes(value)
      }
    }
  },
  created () {
    this.setAttributes(this.category)
    if (this.common.length === 0) {
      this.attributesCommon()
    }
    ProductEventBus.$on('selectCategory', (payload) => {
      this.setAttributes(payload)
    })
  }
}
</script>

<style scoped>

</style>

<!--
<template>
    <div>
        <template v-if="common.filter(attr => attr.is_select === true) > 0">
            <div class="col">
                <span class="text-bold">Общие характеристики</span>
                <div
                        v-for="attribute in common.filter(attr => attr.is_select === true)"
                        :key="attribute.id"
                >
                    <component
                            v-on:changeValue="productAttributes[attribute.slug] = $event"
                            :value="productAttributes[attribute.slug]"
                            :attribute="attribute"
                            :is="'type-selectable-' + attribute.type"
                    />
                </div>
            </div>
        </template>
        <template v-if="attributes !== null && attributes.filter(attr => attr.is_select === true).length > 0">
            <div class="col">
                <span class="text-bold">Характеристики категории</span>
                <div
                        v-for="attribute in attributes.filter(attr => attr.is_select === true)"
                        :key="attribute.id"
                >
                    <component
                            v-on:changeValue="handleAttributeValue($event, attribute.slug)"
                            :value="productAttributes[attribute.slug]"
                            :attribute="attribute"
                            :is="'type-selectable-' + attribute.type">
                    </component>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TypeSelectableColor from '../../../components/admin/attribute/type/selectable/Color'
import TypeSelectableText from '../../../components/admin/attribute/type/selectable/Text'
import ProductEventBus from '../../../events/products'

export default {
  name: 'ProductsSelectableAttributes',
  data () {
    return {
      attributes: null,
      productAttributes: {}
    }
  },
  props: {
    category: Number
  },
  components: {
    TypeSelectableColor,
    TypeSelectableText
  },
  computed: {
    ...mapGetters({
      common: 'catalog/attributes/common'
    })
  },
  methods: {
    ...mapActions({
      categoryAttributes: 'catalog/categories/attributes',
      attributesCommon: 'catalog/attributes/common'
    }),
    handleAttributeValue (value, slug) {
      this.productAttributes[slug] = value
      if (Object.values(this.productAttributes).length === (this.common.filter(attr => attr.is_select).length + (this.attributes.filter(attr => attr.is_select).length))) {
        ProductEventBus.$emit('changeProductAttribute', this.productAttributes)
      }
      // todo придумать, как отправлять событие, когда
      // (количество атрибутов в Object.values(this.productAttributes).length) === (common.filter(attr => attr.is_select).length + (catAttr.filter(attr => attr.is_select)))
    },
    setAttributes (value) {
      if (value !== null) {
        this.categoryAttributes(value)
          .then(response => {
            console.log(response)
            this.attributes = response.data.data
          })
      } else {
        this.attributes = null
      }
    }
  },
  created () {
    // console.log(this.category)
    this.setAttributes(this.category)
    if (this.common.length === 0) {
      this.attributesCommon()
    }
    ProductEventBus.$on('selectCategory', (payload) => {
      // this.product.categories[0] = payload
      this.setAttributes(payload)
    })
  }
}
</script>

<style scoped>

</style>
-->
