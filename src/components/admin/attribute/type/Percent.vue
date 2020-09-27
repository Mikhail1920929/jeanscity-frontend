<template>
    <div>
        {{ attribute.name }}
        <div class="row q-pa-xs q-col-gutter-xs">
            <div class="col-9">
                <q-slider v-model="localValue" :min="0" :max="100"/>
            </div>
            <div class="col-3">
                <q-input dense filled v-model="localValue"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'AttributeTypePercent',
  props: {
    attribute: Object,
    value: [Number, String]
  },
  data () {
    return {
      localValue: parseInt(this.value) || 0,
      localAttribute: this.attribute
    }
  },
  watch: {
    localValue (value) {
      this.$emit('changeValue', value)
    }
  }
}
</script>

<style scoped>

</style>
