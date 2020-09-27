<template>
  <div>
    <div class="text-subtitle1 q-pt-md">{{ attribute.name }}:</div>
    <q-select
      map-options
      emit-value
      class="q-pb-md"
      outlined
      v-model="activeValue"
      style="max-width: 200px"
      :options="values"
    />
  </div>
</template>

<script>
export default {
  name: 'SelectText',
  data () {
    return {
      activeValue: this.active
    }
  },
  props: {
    attribute: Object,
    values: Array,
    active: Number
  },
  watch: {
    activeValue (value) {
      this.$emit('activeAttribute', value)
    }
  },
  methods: {
    toggleValue (value) {
      this.activeValue = value
    }
  }
}
</script>

<style scoped>

</style>
