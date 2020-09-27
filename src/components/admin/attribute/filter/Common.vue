<template>
    <div>
        <span class="text-weight-medium text-bold">Общие атрибуты</span>
        <div
                v-for="attribute in common.filter(attr => attr.is_select === false)"
                :key="attribute.id"
        >
            <component
                    v-on:changeValue="handleChangeCommonAttribute($event, attribute.slug)"
                    :value="attributes[attribute.slug]"
                    :attribute="attribute"
                    :is="'type-' + attribute.type"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import TypeColor from '../../../../components/admin/attribute/type/Color'
import TypeText from '../../../../components/admin/attribute/type/Text'
import TypePercent from '../../../../components/admin/attribute/type/Percent'

import FilterEventBus from '../../../../events/filter'

export default {
  name: 'ProductsCommonAttributes',
  components: {
    TypeColor,
    TypeText,
    TypePercent
  },
  props: {
    attributes: Object
  },
  data () {
    return {
      localAttributes: this.attributes || {}
    }
  },
  computed: {
    ...mapGetters({
      common: 'catalog/attributes/common'
    })
  },
  methods: {
    ...mapActions({
      commonAttributes: 'catalog/attributes/common'
    }),
    handleChangeCommonAttribute (value, slug) {
      this.localAttributes[slug] = value
      FilterEventBus.$emit('changeCommonAttributes', this.localAttributes)
    }
  },
  created () {
    if (this.common.length === 0) {
      this.commonAttributes()
    }
  }
}
</script>

<style scoped>

</style>
