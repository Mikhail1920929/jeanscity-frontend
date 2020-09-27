<template>
    <div>
        <template v-if="localValues !== null">
            <q-btn
                    @click="localValues = null; $emit('changeValue', null)"
                    label="Очистить"
                    flat
                    class="text-primary q-ml-xs"
                    no-caps
                    style="font-size: 16px;"
            />
        </template>
        <q-option-group
                @input="$emit('changeValue', $event)"
                v-model="localValues"
                :options="attribute.values"
                type="radio"
                inline
                class="column-inline"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AttributeTypeText',
  data () {
    return {
      localValues: this.values || null
    }
  },
  props: {
    values: String,
    attribute: Object
  },
  watch: {
    localValues (values) {
      let attribute = {}

      attribute[this.attribute.slug] = values
      this.filterAttributes(attribute)
    }
  },
  methods: {
    ...mapActions({
      filterAttributes: 'catalog/filter/attributes',
      categoryAttributesValues: 'catalog/categories/values'
    })
  }
}
</script>

<style lang="stylus" scoped>

</style>
