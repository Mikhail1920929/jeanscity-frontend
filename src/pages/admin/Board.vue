<template>
    <div class="q-pa-lg">
        <div class="row q-col-gutter-lg">
            <div class="col-6">
                <template v-if="orders.length > 0">
                    <q-table
                        title="Новые заказы"
                        :data="orders"
                        :columns="orderColumns"
                        :pagination="{rowsPerPage: 0}"
                        hide-bottom
                    />
                </template>
                <template v-else>
                    Сегодня заказов не было
                </template>
            </div>
            <div class="col-6">
                <template v-if="callbacks.length > 0">
                    <q-table
                            title="Новые запросы"
                            :data="callbacks"
                            :columns="callbackColumns"
                            :pagination="{rowsPerPage: 0}"
                            hide-bottom
                    />
                </template>
                <template v-else>
                    Сегодня запросов не было
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { date } from 'quasar'

export default {
  name: 'AdminBoard',
  data () {
    return {
      callbackColumns: [
        {
          name: 'subject',
          align: 'center',
          label: 'Тема',
          field: row => row.subject,
          format: val => `${val}`
        },
        {
          name: 'text',
          align: 'center',
          label: 'Текст',
          field: row => row.text,
          format: val => `${val}`
        }
      ],
      orderColumns: [
        {
          name: 'id',
          align: 'center',
          label: 'Номер заказа',
          field: row => row.id,
          format: val => `${val}`
        },
        {
          name: 'lines',
          label: 'Позиций',
          align: 'center',
          field: row => row.lines,
          format: val => `${val}`
        },
        {
          name: 'customer',
          label: 'Данные покупателя',
          align: 'left',
          field: row => row.customer,
          format: val => `${val.name}, ${val.phone}, ${val.email}`
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      orders: 'orders/orders/list',
      callbacks: 'communications/callbacks/list'
    })
  },
  methods: {
    ...mapActions({
      ordersIndex: 'orders/orders/index',
      callbacksIndex: 'communications/callbacks/index'
    }),
    routeToOrder (evt, row) {
      console.log(row.id)
    }
  },
  created () {
    const now = date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss')
    const today = date.formatDate(new Date().setHours(0, 0, 0, 0), 'YYYY-MM-DD HH:mm:ss')

    this.callbacksIndex({
      date: [
        today,
        date.formatDate(now, 'YYYY-MM-DD HH:mm:ss')
      ],
      answered: false
    })

    this.ordersIndex({
      date: [
        today,
        date.formatDate(now, 'YYYY-MM-DD HH:mm:ss')
      ],
      status: 'OnHold'
    })
  }
}
</script>

<style scoped>

</style>
