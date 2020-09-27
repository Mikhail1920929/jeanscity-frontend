<template>
    <div class="q-pa-lg">
        <div class="row q-col-gutter-lg">
            <div class="col-lg-6">
                <h1 class="text-h6">Методы доставки</h1>
                <template v-if="issetShippings">
                    <q-list bordered class="rounded-borders bg-white">
                        <template
                            v-for="shipping in shippings"
                        >
                            <q-item
                                :key="shipping.value"
                            >
                                <q-item-section>
                                    <q-item-label>{{ shipping.label }}</q-item-label>
                                    <q-item-label caption>Стоимость доставки: {{ shipping.cost }} ₽</q-item-label>
                                </q-item-section>
                                <q-item-section side>
                                    <q-btn-group outline rounded>
                                        <q-btn size="sm" :to="`/admin/shippings/edit/${shipping.value}`" outline color="primary" round icon="edit"/>
                                        <q-btn size="sm" @click="confirmDelete(shipping)" outline color="negative" round icon="delete"/>
                                    </q-btn-group>
                                </q-item-section>
                            </q-item>
                            <q-separator/>
                        </template>
                    </q-list>
                </template>
                <template v-else>
                    <span>Методы доставок не найдены</span>
                </template>
            </div>
            <q-dialog v-model="confirm" persistent>
                <q-card>
                    <q-card-section class="row items-center">
                        <template v-if="localShipping">
                            <span>Удалить метод доставки {{ localShipping.label }}?</span>
                        </template>
                    </q-card-section>

                    <q-card-actions align="right">
                        <q-btn flat label="Отмена" color="primary" v-close-popup />
                        <q-btn flat label="Удалить" @click="deleteShipping" color="negative" v-close-popup />
                    </q-card-actions>
                </q-card>
            </q-dialog>
            <div class="col-lg-6">
                <transition name="fade" mode="out-in">
                    <router-view/>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ShippingIndex',
  data () {
    return {
      localShipping: {},
      confirm: false
    }
  },
  computed: {
    ...mapGetters({
      shippings: 'orders/orders/shippings/list'
    }),
    issetShippings () {
      return Object.keys(this.shippings).length > 0
    }
  },
  methods: {
    ...mapActions({
      shippingsIndex: 'orders/orders/shippings/index',
      shippingDestroy: 'orders/orders/shippings/destroy'
    }),
    confirmDelete (shipping) {
      this.localShipping = shipping
      this.confirm = !!confirm
    },
    deleteShipping () {
      this.shippingDestroy(this.localShipping.value)
    }
  },
  created () {
    this.shippingsIndex()
    console.log(this.shippings)
  }
}
</script>

<style scoped>

</style>
