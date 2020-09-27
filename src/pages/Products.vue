<template>
    <q-page-container>
        <q-page class="bg-grey-2 row justify-center items-start">
            <div v-if="parent.children.length > 0" class="row full-width justify-center bg-white">
                <div style="height: 45px" class="row container q-col-gutter-x-lg">
                    <q-tabs
                            v-model="tab"
                            dense
                            class="menu text-grey type-links"
                            indicator-color="grey-2"
                            align="justify"
                            active-bg-color="grey-2"
                            bg-color="white"
                            no-caps
                            style="max-width: 100%;"
                            narrow-indicator
                    >
                        <q-route-tab
                                name="all"
                                label="Все товары"
                                class="bg-white"
                                :to="{ name: 'front.catalog', params: { parent: $route.params.parent } }"/>
                        <q-route-tab
                                v-for="category in parent.children"
                                :key="category.id" :name="category.slug"
                                :label="category.name"
                                class="bg-white"
                                :to="{ name: 'front.catalog', params: { parent: $route.params.parent }, query: { categories: category.id } }"/>
                    </q-tabs>
                </div>
            </div>
            <div class="col-12 q-pb-lg">
                <q-breadcrumbs active-color="blue-10">
                    <q-breadcrumbs-el v-for="breadcrumb in breadcrumbs" :to="breadcrumb.path" :key="breadcrumb.path" :label="breadcrumb.meta.label" />
                </q-breadcrumbs>
            </div>
            <router-view/>
        </q-page>
    </q-page-container>
</template>

<script>
import { mapActions } from 'vuex'

import FilterEventBus from '../events/filter'

export default {
  name: 'FrontProducts',
  data () {
    return {
      parent: {
        children: []
      },
      tab: null
    }
  },
  watch: {
    '$route.params.parent': function (value) {
      if (value !== undefined) {
        this.loadCategory(value)
      } else {
        this.parent = {
          children: []
        }
        FilterEventBus.$emit('changeSubCategory', null)
      }
    }
  },
  methods: {
    ...mapActions({
      categoriesShow: 'catalog/categories/show'
    }),
    breadcrumbs () {
      return this.$route.matched
    },
    loadCategory (value) {
      this.categoriesShow(value)
        .then(response => {
          this.parent = response.data.data
          const categories = response.data.data.children.map(child => child.id)
          FilterEventBus.$emit('changeSubCategory', categories)
        })
    }
  },
  created () {
    if (this.$route.params.parent === undefined) {
      setTimeout(() => {
        FilterEventBus.$emit('changeSubCategory', null)
      }, 1000)
    } else {
      this.loadCategory(this.$route.params.parent)
    }
  }
}
</script>

<style lang="stylus" scoped>
    .menu
        .q-focusable
            border-radius 5px 5px 0 0
</style>
