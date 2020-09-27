<template>
    <div>
        <template v-if="orderId">
            <h2 class="text-h6">Редактирование заказа</h2>
        </template>
        <template v-if="order">
            <q-form @submit="confirmForm">
                <q-card>
                    <q-card-section>
                        <div class="row">
                            <div class="col-6">
                                <h6 class="q-ma-none">Детали заказа:</h6>
                                <ul class="listless">
                                    <li><strong>Идентификатор заказа:</strong> {{ order.id }}</li>
                                    <li v-if="order.shipping"><strong>Метод доставки:</strong> {{ order.shipping.name }}</li>
                                    <li><strong>Статус:</strong>
                                        <order-status :status="order.status_render"/>
                                    </li>
                                    <li><strong>Сумма заказа:</strong> ₽{{ order.total }}</li>
                                </ul>
                            </div>
                            <div class="col-6" v-if="order.customer">
                                <h6 class="q-ma-none">Покупатель:</h6>
                                <ul class="listless">
                                    <li><strong>Имя:</strong> {{ order.customer.name }}</li>
                                    <li><strong>Email:</strong> {{ order.customer.email }}</li>
                                    <li><strong>Телефон:</strong> {{ order.customer.phone }}</li>
                                    <li><strong>Адрес:</strong> {{ order.customer.address }}</li>
                                </ul>
                            </div>
                        </div>
                    </q-card-section>
                    <q-separator/>
                    <q-card-actions>
                        <template v-for="(status, index) in statuses">
                            <q-btn type="submit" @click="setOrderStatus(status,index + 1)" :color="color(index + 1)" unelevated
                                   :key="index" :label="status.value"/>
                            <template v-if="Object.keys(statuses).length !== parseInt(index)">
                                <q-space/>
                            </template>
                        </template>
                    </q-card-actions>
                </q-card>
            </q-form>
            <q-card class="q-mb-lg q-mt-lg">
                <h6 class="q-ma-none q-pa-md">Позиции заказа</h6>
                <q-separator/>
                <q-list>
                    <OrderLine
                            v-for="line in lines"
                            :key="line.id"
                            :line="line"
                    />
                </q-list>
            </q-card>
        </template>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OrderStatus from '../../../components/admin/order/Status'
import OrderLine from '../../../components/admin/order/Line'

export default {
  name: 'Form',
  components: {
    OrderStatus,
    OrderLine
  },
  data () {
    return {
      orderId: null,
      order: {},
      lines: [],
      statuses: {},
      localErrors: []
    }
  },
  watch: {
    '$route.params.id': function (orderId) {
      this.loadOrder(orderId)
    }
  },
  methods: {
    ...mapActions({
      attributesIndex: 'catalog/attributes/index',
      orderShow: 'orders/orders/show',
      orderUpdate: 'orders/orders/update',
      orderStatuses: 'orders/orders/statuses',
      linesIndex: 'orders/orders/lines/index'
    }),
    setOrderStatus (status, index) {
      this.order.shipping_id = this.order.shipping.id
      this.order.status = parseInt(index)
      this.order.status_render = {
        key: status.label,
        value: parseInt(index)
      }
    },
    color (statusId) {
      let color = null
      statusId = parseInt(statusId)
      if (statusId === 1) {
        color = 'primary'
      } else if (statusId === 2) {
        color = 'positive'
      } else if (statusId === 3) {
        color = 'orange'
      } else if (statusId === 6) {
        color = 'negative'
      } else {
        color = 'grey'
      }
      return color
    },
    confirmForm () {
      this.orderUpdate(this.order)
        .then(
          response => {
            this.$q.notify({
              message: response.data.message,
              color: 'positive',
              position: 'top'
            })
          },
          error => {
            this.$q.notify({
              message: error.response.data.message,
              color: 'negative',
              position: 'top'
            })
          })
    },
    loadOrder (orderId) {
      this.order = {}
      if (orderId !== 'undefined') {
        this.orderId = orderId

        if (this.orderId) {
          this.orderShow(this.orderId)
            .then(response => {
              this.order = response.data.data
            })
          this.linesIndex(this.orderId)
            .then(response => {
              this.lines = response.data.data
            })
        }
      }
    }
  },
  created () {
    this.attributesIndex()
    this.loadOrder(this.$route.params.id)
    this.orderStatuses()
      .then(response => {
        this.statuses = response.data.data
      })
  }
}
</script>

<style lang="scss" scoped>
    .listless {
        padding: 0;

        li {
            list-style: none;
        }
    }
</style>
