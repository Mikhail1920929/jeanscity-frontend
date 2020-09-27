<template>
    <div class="col">
        <q-select
                :label="attribute.name"
                v-model="localValue"
                :options="attribute.values"
                map-options
                emit-value
                @input="$emit('changeValue', $event)"
        >
            <template v-slot:append>
                <q-icon
                        v-if="localValue !== null"
                        class="cursor-pointer"
                        name="clear"
                        @click.stop="resetValue"
                />
            </template>
        </q-select>
    </div>
</template>

<script>
export default {
  name: 'AttributeFilterText',
  data () {
    return {
      localValue: this.value || null
    }
  },
  props: {
    attribute: Object,
    value: String
  },
  methods: {
    resetValue () {
      this.localValue = null
      this.$emit('changeValue', this.localValue)
    }
  }
}
</script>

<style scoped>

</style>
