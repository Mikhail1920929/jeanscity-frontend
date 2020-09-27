<template>
  <div>
    <div class="text-subtitle1 q-pt-md">{{ attribute.name }}:</div>
    <div>
      <q-btn-group
        unelevated
        style="border: 1px solid rgba(0,0,0,0.2)"
        spread
      >
        <q-btn
          :icon="activeValue === value.value ? 'check' : ''"
          text-color="black"
          v-for="value in values"
          :style="{ backgroundColor: value.value }"
          :key="value.value"
          @click="toggleValue(value.value)"
        />
      </q-btn-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectColor',
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
