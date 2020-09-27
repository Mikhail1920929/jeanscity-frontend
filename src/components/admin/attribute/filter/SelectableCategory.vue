<template>
    <div class="col">
        <template v-if="attributes !== null && attributes.filter(attr => attr.is_select === true).length > 0">
            <span class="text-weight-medium text-bold q-ma-none">Атрибуты категории</span>
            <component
                    v-for="attribute in attributes.filter(attr => attr.is_select === true)"
                    :key="attribute.id"
                    v-on:changeValue="handleFilterCategoryAttribute($event, attribute.slug)"
                    :value="localFilterAttrs[attribute.slug]"
                    :attribute="attribute"
                    :is="'type-' + attribute.type"
            />
        </template>
        <template v-if="attributes !== null && attributes.filter(attr => attr.is_select === true).length === 0">
            <span class="text-grey-6">У данной категории нет вариативных атрибутов</span>
        </template>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

import FilterEventBus from '../../../../events/filter'

import TypeColor from '../../../../components/admin/attribute/type/Color'
import TypeText from './type/Text'
import TypePercent from './type/Percent'

export default {
  name: 'FilterAttributesCategory',
  components: {
    TypeColor,
    TypeText,
    TypePercent
  },
  props: {
    filterAttrs: Object
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
    handleFilterCategoryAttribute (value, slug) {
      this.localFilterAttrs[slug] = value
      FilterEventBus.$emit('handleFilterCategoryAttribute', this.localFilterAttrs)
    }
  },
  data () {
    return {
      localFilterAttrs: this.filterAttrs || {},
      attributes: null
    }
  },
  created () {
    FilterEventBus.$on('selectCategory', (payload) => {
      if (payload !== null) {
        this.categoryAttributes(payload)
          .then(response => {
            this.attributes = response.data.data
          })
      } else {
        this.attributes = null
      }
    })

    FilterEventBus.$on('resetCategory', () => {
      this.attributes = null
    })
  }
}
</script>

<style scoped>

</style>
