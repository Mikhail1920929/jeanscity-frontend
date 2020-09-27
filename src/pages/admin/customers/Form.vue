<template>
    <q-form @submit="confirmForm">
        <template v-if="customerId">
            <h2 class="text-h6">Редактирование покупателя</h2>
        </template>
        <q-card>
            <q-card-section>
                <q-input
                        v-model="customer.name"
                        label="Имя"
                />
                <q-input
                        v-model="customer.email"
                        label="Email"
                />
                <q-input
                        v-model="customer.phone"
                        label="Телефон"
                />
                <q-input
                        v-model="customer.address"
                        label="Адрес"
                />
            </q-card-section>
            <q-separator/>
            <q-card-actions>
                <q-btn to="/admin/categories" unelevated>Отменить</q-btn>
                <q-space/>
                <q-btn type="submit" unelevated color="primary">Сохранить</q-btn>
            </q-card-actions>
        </q-card>
    </q-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CustomersForm',
  data () {
    return {
      customerId: null,
      customer: {},
      message: {},
      errors: []
    }
  },
  watch: {
    '$route.params.id': function (customerId) {
      this.loadCustomer(customerId)
    },
    message (value) {
      setTimeout(() => {
        this.message = {}
      }, 2000)
    }
  },
  methods: {
    ...mapActions({
      customerShow: 'orders/orders/customers/show',
      customerUpdate: 'orders/orders/customers/update',
      customerStore: 'orders/orders/customers/store'
    }),
    loadCustomer (customerId) {
      this.customer = {}
      if (customerId !== 'undefined') {
        this.customerId = customerId

        if (this.customerId) {
          this.customerShow(this.customerId)
            .then(response => {
              this.customer = response.data.data
            })
        }
      }
    },
    confirmForm () {
      if (this.customerId) {
        this.customerUpdate(this.customer)
          .then(
            response => {
              this.message = {
                text: response.data.message,
                status: response.status
              }
              // this.message = []
              // this.loadCustomer(this.customerId)
            },
            error => {
              this.message = {
                text: error.response.data.message,
                status: error.response.status
              }
              this.message = error.response.data.errors
            })
      } else {
        this.customerStore(this.customer)
          .then(
            response => {
              this.message = {
                text: response.data.message,
                status: response.status
              }
              this.message = []
            },
            error => {
              this.message = {
                text: error.response.data.message,
                status: error.response.status
              }
              this.message = error.response.data.errors
            })
      }
    }
  },
  created () {
    this.loadCustomer(this.$route.params.id)
  }
}
</script>

<style scoped>

</style>
