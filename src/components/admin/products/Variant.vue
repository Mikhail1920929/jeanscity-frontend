<template>
  <div>
    <template v-if="variant !== null">
      <q-card>
        <q-card-section>
          <span class="text-h6">Данные вариации</span>
          <q-form>
            <q-input
              label="Артикул"
              v-model="variant.sku"
            />
          </q-form>
        </q-card-section>
        <q-card-actions>
          <q-space/>
          <q-btn
            @click="confirmForm(variant)"
            unelevated
            color="primary"
            label="Сохранить"
          />
        </q-card-actions>
      </q-card>
    </template>
    <template v-else>
      <span>Выберите атрибуты, чтобы отобразить нужную вариацию товара</span>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ProductEventBus from '../../../events/products'

export default {
  name: 'ProductsVariants',
  data () {
    return {
      variant: null
    }
  },
  props: {
    variantOf: Number
  },
  watch: {
    variantOf (value) {
      this.variant.variant_of = value
    }
  },
  methods: {
    ...mapActions({
      productUpdate: 'catalog/products/update',
      productStore: 'catalog/products/store',
      productVariants: 'catalog/products/variants'
    }),
    confirmForm (variant) {
      if (variant.id) {
        this.productUpdate(variant)
          .then(response => {
            this.$q.notify({
              message: response.data.message,
              color: 'positive',
              position: 'top'
            })
          })
      } else {
        if (this.variant.variant_of === null) {
          return this.$q.notify({
            position: 'top',
            color: 'negative',
            message: 'Невозможно создать вариацию, пока не создан товар!'
          })
        }
        this.productStore(variant)
          .then(response => {
            this.$q.notify({
              message: response.data.message,
              color: 'positive',
              position: 'top'
            })
          })
      }
    }
  },
  created () {
    ProductEventBus.$on('changeProductAttribute', (payload) => {
      this.productVariants({
        variantOf: this.variantOf || 0,
        ...payload
      })
        .then(response => {
          // this.variant = response.data.data[0]
          if (response.data.data.length === 0) {
            this.variant = {
              attributes: payload,
              variant_of: this.variantOf || null
            }
          } else {
            this.variant = response.data.data[0]
          }
        })
    })
  }
}
</script>

<style scoped>

</style>
