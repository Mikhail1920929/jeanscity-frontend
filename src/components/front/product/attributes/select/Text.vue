<template>
    <div>
        {{ attribute.name }}:
        <q-btn-group unelevated>
            <q-btn
                    @click="handleAttributeValue(value.content)"
                    v-for="value in values"
                    :key="value.value"
                    :label="value.label"
            />
        </q-btn-group>
    </div>
</template>

<script>
export default {
  name: 'ProductAttributesSelectableText',
  props: {
    attribute: Object,
    issetValues: {
      type: Array,
      required: false
    }
  },
  computed: {
    values () {
      if (this.issetValues) {
        return this.attribute.values.filter(value => this.issetValues.includes(value.content))
      }

      return this.attribute.values
    }
  },
  methods: {
    handleAttributeValue (value) {
      const attribute = {}
      attribute[this.attribute.slug] = value
      this.$emit('changeValue', attribute)
    }
  }
}
</script>

<style scoped>

</style>
