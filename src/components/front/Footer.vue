<template>
    <q-footer class="bg-white text-white">
        <div class="row justify-center text-black q-py-md">
            <div class="row container q-col-gutter-x-lg">
                <div class="col-sm-4 col-md-6 col-xs-12">
                    <q-form
                            @submit="subscribeCustomer"
                    >
                        <div class="row">
                            <div class="col-12">
                                <h5 class="text-h6 text-uppercase title q-ma-none">Подписка на рассылку</h5>
                            </div>
                            <div class="col-12">
                                <div class="row wrap items-sm-center q-col-gutter-x-md">
                                    <div class="col-xs-12 col-sm-12 col-md-7 col-sm-7 q-py-xs-lg">
                                        <q-input
                                          v-model="customer.email"
                                          type="email"
                                          label="Email"
                                        />
                                    </div>
                                    <div class="col-xs-12 col-sm-12 col-md-4 self-md-end q-py-md-lg q-pb-xs-xl subscription-btn">
                                        <q-btn type="submit" color="red-8" text-color="white" label="Подписаться" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </q-form>
                </div>
                <div class="col-sm-4 col-md-3 col-xs-12">
                    <div class="row">
                        <div class="col-12">
                            <h5 class="text-h6 text-uppercase title q-ma-none">Информация</h5>
                        </div>
                        <ul class="col-12 column q-py-lg footer-list">
                            <li :key="page.slug" v-for="page in pages">
                                <router-link :to="{name: 'front.page', params: {slug: page.slug}}">{{ page.title }}</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-sm-4 col-md-3 col-xs-12">
                    <div class="row">
                        <div class="col-12">
                            <h5 class="text-h6 text-uppercase title q-ma-none">Контакты</h5>
                        </div>
                        <ul class="col-12 column q-py-lg footer-list">
                            <li><a href="">+7 (996) 453-93-03</a></li>
                            <li><a href="" class="q-py-sm text-">jeanscity@gmail.com</a></li>
                            <li><a href="">jeanscity@gmail.com</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </q-footer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'FrontFooter',
  data () {
    return {
      customer: {
        email: null,
        is_subscribe: true
      }
    }
  },
  computed: {
    ...mapGetters({
      pages: 'other/pages/list'
    })
  },
  methods: {
    ...mapActions({
      customerStore: 'orders/customers/store',
      pagesIndex: 'other/pages/index'
    }),
    subscribeCustomer () {
      this.customerStore(this.customer)
        .then(response => {
          this.$q.notify({
            message: 'Спасибо за подписку!',
            color: 'positive',
            position: 'bottom'
          })
        })
        .catch(error => {
          this.$q.notify({
            message: 'Что-то пошло не так...',
            color: 'negative',
            position: 'bottom'
          })
        })
    }
  },
  beforeMount () {
    this.pagesIndex()
  }
}
</script>

<style lang="stylus" scoped>
  .q-footer
    .container
      color: #3C3C3C
      .title
        font-weight: 400
      a
        text-decoration: none
        color: #3C3C3C
        font-size: 16px
        font-weight: 300
        &:hover
           text-decoration: underline
      .footer-list
        padding-left 0
        margin 0
        list-style none
        li+li
          padding-top 16px
</style>
