<template>
    <div class="col-12 q-pa-sm">
        <q-select
                dense
                map-options
                emit-value
                use-input
                new-value-mode="add-unique"
                :label="attribute.name"
                :options="attribute.values"
                v-model="localValue"
                @new-value="createValue"
        >
            <template v-if="localValue" v-slot:append>
                <q-icon name="cancel" @click.stop="localValue = null" class="cursor-pointer" />
            </template>
        </q-select>
    </div>
</template>

<script>
export default {
  name: 'AttributeTypeText',
  props: {
    attribute: Object,
    value: String
  },
  data () {
    return {
      localValue: this.value || null
    }
  },
  watch: {
    localValue (value) {
      this.$emit('changeValue', value)
    }
  },
  methods: {
    createValue (val, done) {
      if (val.length > 0) {
        if (!this.values.includes(val)) {
          this.values.push(val)
        }
        done(val, 'add-unique')
      }
    }
  }
}
</script>

<style scoped>

</style>
