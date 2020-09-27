<template>
    <div class="col">
        <q-checkbox
                :label="attribute.name"
                v-model="localValue"
                @input="$emit('changeValue', $event)"
        />

    </div>
</template>

<script>

export default {
  name: 'AttributeFilterPercent',
  data () {
    return {
      localValue: this.value || false
    }
  },
  props: {
    attribute: Object,
    value: [Number, String]
  }
}
</script>

<style scoped>

</style>
