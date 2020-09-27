<template>
    <div class="col-6 q-pa-sm attr-size">
        <span>{{ attribute.name }}</span>
        <q-btn-group
                unelevated
                style="border: 1px solid rgba(0,0,0,0.2)"
                spread
        >
            <q-btn
                    :icon="localValue === value.content ? 'check' : ''"
                    text-color="black"
                    v-for="value in attribute.values"
                    :label="value.label"
                    :key="value.label"
                    @click="toggleValue(value.label)"
            />
        </q-btn-group>
        <q-input v-model="localValue" label="Другой размер:" @blur="toggleValue(localValue)" />
    </div>
</template>

<script>
export default {
  name: 'AttributeTypeSelectableText',
  data () {
    return {
      localValue: this.value || null,
      localAttribute: this.attribute
    }
  },
  props: {
    attribute: Object,
    value: String
  },
  methods: {
    toggleValue (value) {
      this.localValue = value
      this.$emit('changeValue', value)
    }
  }
}
</script>

<style scoped>

</style>
