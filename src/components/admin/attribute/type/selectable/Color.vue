<template>
    <div class="col-6 q-pa-sm">
        <span>{{ attribute.name }}</span>
        <input type="hidden" v-model="localValue">
        <q-btn-group
                unelevated
                style="border: 1px solid rgba(0,0,0,0.2)"
                spread
        >
            <q-btn
                    :icon="localValue === value.content ? 'check' : ''"
                    text-color="black"
                    v-for="value in attribute.values"
                    :style="{ backgroundColor: value.value }"
                    :label="value.content"
                    :key="value.content"
                    @click="toggleValue(value.content)"
            />
        </q-btn-group>
    </div>
</template>

<script>
export default {
  name: 'AttributeTypeSelectableColor',
  data () {
    return {
      localValue: this.value,
      localAttribute: this.attribute
    }
  },
  props: {
    attribute: Object,
    value: String,
    editable: Boolean
  },
  watch: {
    localValue (value) {
      this.$emit('changeValue', value)
    }
  },
  methods: {
    toggleValue (value) {
      this.localValue = value
    }
  }
}
</script>

<style scoped>

</style>
