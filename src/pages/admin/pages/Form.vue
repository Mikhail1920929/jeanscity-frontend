<template>
    <q-form @submit="confirmForm">
        <template v-if="pageId">
            <h2 class="text-h6">Редактирование страницы</h2>
        </template>
        <q-card>
            <q-card-section>
                <q-input
                        v-model.trim="localPage.title"
                        label="Заголовок страницы"
                        :rules="[
                          val => $v.localPage.title.required || 'Заголовок обязателен'
                        ]"
                />
                <q-input
                        v-model.trim="localPage.slug"
                        label="Адрес страницы"
                />
                <br>
                <tinymce-editor  api-key="API_KEY" v-model="localPage.text" style="height: 600px;"></tinymce-editor>
            </q-card-section>
            <q-separator/>
            <q-card-actions>
                <q-btn to="/admin/pages" unelevated>Отменить</q-btn>
                <q-space/>
                <q-btn type="submit" unelevated color="primary">Сохранить</q-btn>
            </q-card-actions>
        </q-card>
    </q-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'PageForm',
  data () {
    return {
      pageId: null,
      localPage: {},
      localErrors: []
    }
  },
  validations: {
    localPage: {
      title: {
        required
      }
    }
  },
  watch: {
    '$route.params.id': function (pageId) {
      this.loadPage(pageId)
    }
  },
  computed: {
    ...mapGetters({
      page: 'other/pages/item',
      pages: 'other/pages/list',
      message: 'other/pages/message',
      errors: 'other/pages/errors'
    })
  },
  methods: {
    ...mapActions({
      pageShow: 'other/pages/show',
      pageStore: 'other/pages/store',
      pageUpdate: 'other/pages/update'
    }),
    loadPage (pageId) {
      this.localPage = {}
      if (pageId !== 'undefined') {
        this.pageId = pageId

        if (this.pageId) {
          this.pageShow(this.pageId)
            .then(response => {
              this.localPage = response.data.data
              this.localPage.slug2 = this.localPage.slug
            })
        }
      }
    },
    confirmForm () {
      if (this.pageId) {
        this.pageUpdate(this.localPage)
          .then(
            response => {
              this.$q.notify({
                message: response.data.message,
                color: 'positive',
                position: 'top'
              })
              this.localErrors = []
            },
            error => {
              this.$q.notify({
                message: error.response.data.message,
                color: 'negative',
                position: 'top'
              })
              this.localErrors = error.response.data.errors
            })
      } else {
        this.pageStore(this.localPage)
          .then(
            response => {
              this.$q.notify({
                message: response.data.message,
                color: 'positive',
                position: 'top'
              })
              this.localErrors = []
              this.$router.push(`/admin/pages/edit/${this.localPage.slug}`)
            },
            error => {
              this.$q.notify({
                message: error.data.message,
                color: 'negative',
                position: 'top'
              })
              this.localErrors = error.response.data.errors
            })
      }
    }
  },
  created () {
    this.loadPage(this.$route.params.id)
  }
}

</script>

<style scoped>

</style>
