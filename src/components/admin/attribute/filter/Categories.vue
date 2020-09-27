<template>
    <div class="col">
        <div class="row items-center content-center">
            <span class="text-weight-medium text-bold">Категория</span>
            <q-space/>
            <q-btn
                    v-if="selectCategory !== null"
                    outline
                    label="Сброс"
                    @click="resetCategory"
            />
        </div>
        <br>
        <template v-if="categories.length > 0">
            <q-list bordered>
                <q-expansion-item group="categories" v-for="category in categories"
                                  :label="category.name"
                                  :key="category.id">
                    <q-option-group
                            @input="handleSelectCategory"
                            :options="selectableChildren(category.children)"
                            v-model="selectCategory"
                            type="radio"
                    />
                </q-expansion-item>
            </q-list>
        </template>
        <template v-else>
            <div class="row justify-center items-center">
                <q-spinner
                        color="primary"
                        size="24px"
                />
            </div>
        </template>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FilterEventBus from '../../../../events/filter'

export default {
  name: 'FilterCategories',
  data () {
    return {
      selectCategory: this.category || null
    }
  },
  props: {
    category: Number
  },
  computed: {
    ...mapGetters({
      categories: 'catalog/categories/parents'
    })
  },
  methods: {
    ...mapActions({
      categoriesIndex: 'catalog/categories/parents'
    }),
    selectableChildren (children) {
      const select = []
      children.forEach(child => {
        select.push({
          label: child.name,
          value: child.id
        })
      })

      return select
    },
    handleSelectCategory () {
      FilterEventBus.$emit('selectCategory', this.selectCategory)
    },
    resetCategory () {
      this.selectCategory = null
      FilterEventBus.$emit('resetCategory')
    }
  },
  created () {
    if (this.categories.length === 0) {
      this.categoriesIndex()
    }
  }
}
</script>

<style scoped>

</style>
