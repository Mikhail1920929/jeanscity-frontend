<template>
    <div>
        <q-expansion-item
                expand-separator
                label="Цена"
                class="bg-white expansion-item"
                default-opened
        >
            <q-item-section class="q-pa-sm">
                <FilterPrice
                        :filter-sale="filter.sale"
                />
            </q-item-section>
        </q-expansion-item>
        <!-- common attrs-->
        <q-expansion-item
                v-for="attribute in common"
                :key="attribute.id"
                :label="attribute.name"
                expand-separator
                class="bg-white expansion-item"
        >
            <q-card>
                <component
                        v-on:changeValue="handleFilterCategoryAttribute($event, attribute.slug)"
                        :values="filter[attribute.slug]"
                        :attribute="attribute"
                        :is="`type-${attribute.type}`"
                        class="attribute-type"
                />
            </q-card>
        </q-expansion-item>
        <!-- category attrs -->
        <q-expansion-item
                v-on:changeValue="handleFilterCategoryAttribute($event, attribute.slug)"
                v-for="attribute in attributes.filter(attr => attr.type !== 'percent')"
                :key="attribute.id"
                :label="attribute.name"
                expand-separator
                class="bg-white expansion-item"
        >
            <q-card>
                <component
                        v-on:changeValue="handleFilterCategoryAttribute($event, attribute.slug)"
                        :values="filter[attribute.slug]"
                        :attribute="attribute"
                        :is="`type-${attribute.type}`"
                        class="attribute-type"
                />
            </q-card>
        </q-expansion-item>
        <!-- percents attrs -->
        <q-separator/>
        <q-item
                expand-separator
                class="bg-white expansion-item"
        >
            <q-item-section>
                <div class="full-width"
                        v-for="attribute in attributes.filter(attr => attr.type === 'percent')"
                        :key="attribute.id"
                        :label="attribute.name"
                >
                    <component
                            v-on:changeValue="handleFilterCategoryAttribute($event, attribute.slug)"
                            :values="filter[attribute.slug]"
                            :attribute="attribute"
                            :is="`type-${attribute.type}`"
                            class="attribute-type"
                    />
                </div>

            </q-item-section>
        </q-item>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import FilterEventBus from '../../../events/filter'

import FilterPrice from '../../filter/Price'

import TypeColor from './type/Color'
import TypeText from './type/Text'
import TypePercent from '../../admin/attribute/filter/type/Percent'

export default {
  name: 'FiltersDesktop',
  components: {
    FilterPrice,
    TypeColor,
    TypeText,
    TypePercent
  },
  data () {
    return {
      range: {}
    }
  },
  computed: {
    ...mapGetters({
      parents: 'catalog/categories/parents',
      filter: 'catalog/filter/filter',
      attrs: 'catalog/filter/attrs',
      common: 'catalog/attributes/common',
      attributes: 'catalog/categories/attributes'
    })
  },
  methods: {
    ...mapActions({
      filterAttributes: 'catalog/filter/attributes',
      categoryAttributes: 'catalog/categories/attributes',
      attributesCommon: 'catalog/attributes/common'
    }),
    handleFilterCategoryAttribute (value, slug) {
      let attrs = {}
      attrs[slug] = value
      this.filterAttributes(attrs)
      FilterEventBus.$emit('handleFilterCategoryAttribute', attrs)
    }
  },
  created () {
    if (this.common.length === 0) {
      this.attributesCommon()
    }

    FilterEventBus.$on('changeSubCategory', (payload) => {
      this.categoryAttributes(payload)
        .then(r => {
          console.log(r)
        })
    })
  }
}
</script>

<style lang="stylus" scoped>
    .expansion-item
        z-index 99
        font-weight 500
        font-size 16px
        .filter
            font-size 14px
            font-weight 400
        .q-item
            padding 8px 24px 8px 36px
        p
            font-size 13px
    .attribute-type
        font-weight 400
</style>
