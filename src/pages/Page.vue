<template>
  <q-page-container>
    <q-page class="bg-grey-2 row justify-center items-start">
      <div class="container q-pa-md text-jeansgrey">
        <h1 class="text-h3">{{ page.title }}</h1>
        <div v-html="page.text"></div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Page',
  data () {
    return {
      slug: null,
      page: {}
    }
  },
  watch: {
    '$route.params.slug': function () {
      this.loadPage(this.$route.params.slug)
    }
  },
  methods: {
    ...mapActions({
      pageShow: 'other/pages/show'
    }),
    loadPage (slug) {
      this.slug = slug
      this.pageShow(slug)
        .then(response => {
          this.page = response.data.data
        })
        .catch(error => {
          this.$router.push({ name: '404' })
        })
    }
  },
  mounted () {
    this.loadPage(this.$route.params.slug)
  }
}
</script>

<style scoped>

</style>
