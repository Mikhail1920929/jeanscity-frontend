<template>
    <q-form @submit="confirmForm">
        <template v-if="shippingId">
            <h2 class="text-h6">Редактирование метода доставки</h2>
        </template>
        <template v-else>
            <h2 class="text-h6">Создание новой метода доставки</h2>
        </template>
        <q-card>
            <q-card-section>
                <q-input
                    @input="$v.shipping.name.$touch()"
                    v-model.trim="shipping.name"
                    label="Название"
                    :rules="[
                      val => $v.shipping.name.required || 'Название обязательно'
                    ]"
                />
                <q-input
                    @input="$v.shipping.cost.$touch()"
                    v-model.trim="shipping.cost"
                    label="Цена"
                    :rules="[
                      val => $v.shipping.cost.required || 'Цена обязательна',
                      val => $v.shipping.cost.decimal || 'Неверный формат цены'
                    ]"
                />
                <q-checkbox
                        v-model="shipping.need_address"
                        label="Необходимо знать адрес покупателя?"
                />
            </q-card-section>
            <q-separator/>
            <q-card-actions>
                <q-btn to="/admin/shippings" unelevated>Отменить</q-btn>
                <q-space/>
                <q-btn type="submit" unelevated color="primary">Сохранить</q-btn>
            </q-card-actions>
        </q-card>
    </q-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, decimal } from 'vuelidate/lib/validators'

export default {
  name: 'ShippingForm',
  data () {
    return {
      shippingId: null,
      shipping: {
        need_address: false
      },
      localErrors: []
    }
  },
  validations: {
    shipping: {
      name: {
        required
      },
      cost: {
        required,
        decimal
      }
    }
  },
  watch: {
    '$route.params.id': function (shippingId) {
      this.loadShipping(shippingId)
      this.shippingId = shippingId
    }
  },
  methods: {
    ...mapActions({
      shippingShow: 'orders/orders/shippings/show',
      shippingUpdate: 'orders/orders/shippings/update',
      shippingStore: 'orders/orders/shippings/store'
    }),
    loadShipping (shippingId) {
      if (shippingId !== 'undefined') {
        this.shippingId = shippingId

        if (this.shippingId) {
          this.shippingShow(this.shippingId)
            .then(response => {
              this.shipping = response.data.data
            })
        }
      }
    },
    confirmForm () {
      if (this.shippingId) {
        this.shippingUpdate(this.shipping)
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
        this.shippingStore(this.shipping)
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
      }
    }
  },
  created () {
    this.shippingId = this.$route.params.id
    this.loadShipping(this.shippingId)
  }
}
</script>

<style scoped>

</style>
