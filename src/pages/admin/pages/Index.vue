<template>
    <div class="q-pa-lg">
        <div class="row q-col-gutter-lg">
            <div class="col-lg-12 full-width">
                <h1 class="text-h6">Страницы</h1>
                <template v-if="pages.length > 0">
                    <q-list bordered class="rounded-borders bg-white">
                        <template
                          v-for="page in pages"
                        >
                            <q-item
                              :key="page.id"
                            >
                                <q-item-section>
                                    <q-item-label class="text-bold" style="font-size: 18px">{{ page.title }}</q-item-label>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label caption><strong>Ссылка:</strong> {{ page.slug }}</q-item-label>
                                </q-item-section>
                                <q-item-section side>
                                    <q-btn-group outline rounded>
                                        <q-btn size="sm" :to="`/admin/pages/edit/${page.slug}`" outline color="primary" round icon="edit"/>
                                    </q-btn-group>
                                </q-item-section>
                            </q-item>
                            <q-separator/>
                        </template>
                    </q-list>
                </template>
                <template v-else>
                    <span>Запросы не найдены</span>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PagesIndex',
  data () {
    return {
      meta: {}
    }
  },
  computed: {
    ...mapGetters({
      pages: 'other/pages/list'
    })
  },
  methods: {
    ...mapActions({
      pagesIndex: 'other/pages/index'
    })
  },
  created () {
    this.pagesIndex()
  }
}

</script>

<style scoped>

</style>
