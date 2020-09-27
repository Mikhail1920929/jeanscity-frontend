<template>
    <div class="row">
        <template v-if="localPrices.min !== localPrices.max">
            <q-range
                    @change="handleFilterPrice"
                    v-model="priceRange"
                    :min="localPrices.min"
                    :max="localPrices.max"
            />
            <div class="row full-width">
                <span>{{ priceRange.min }} руб.</span>
                <q-space/>
                <span>{{ priceRange.max }} руб.</span>
            </div>
        </template>
        <template v-else>
            <span class="text-grey-6" style="font-size: 14px; font-weight: normal">Диапазон цен отсутствует</span>
        </template>
        <q-checkbox
                dense
                @input="handleFilterSale"
                label="Cкидка"
                v-model="sale"
        />
    </div>
</template>

<script>
import FilterEventBus from '../../events/filter'

export default {
  name: 'FilterPrice',
  data () {
    return {
      sale: Boolean(this.filterSale) || false,
      localPrices: {
        min: null,
        max: null
      },
      priceRange: {
        min: null,
        max: null
      }
    }
  },
  props: {
    filterSale: [Boolean, String]
  },
  methods: {
    handleFilterPrice () {
      FilterEventBus.$emit('changeFilterPrice', [this.priceRange.min, this.priceRange.max])
    },
    handleFilterSale () {
      FilterEventBus.$emit('changeFilterSale', this.sale)
    }
  },
  created () {
    FilterEventBus.$on('setFilterPrice', (payload) => {
      if (
        this.priceRange.min === null &&
            this.priceRange.max === null
      ) {
        this.priceRange = payload
      }
      this.localPrices = payload
    })
  }
}
</script>

<style scoped>

</style>
