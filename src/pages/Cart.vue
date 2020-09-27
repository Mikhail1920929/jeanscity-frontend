<template>
  <q-page-container>
    <q-page class="bg-grey-2" v-if="cart.lines.length > 0">
      <div class="row justify-center q-py-lg">
        <div class="row container q-col-gutter-x-lg q-pb-md-xl">
          <h1 class="col-12 text-h5" style="font-size: 25px; font-weight: 500;">Корзина</h1>
          <div class="col-md-9 col-sm-7 col-xs-12">
            <div class="row">
              <div class="col-12">
                <div class="row q-py-sm-sm q-mt-md sm-hide xs-hide title-items">
                  <h5 class="col-5 offset-1 text-uppercase text-h6 q-ma-none">Товар</h5>
                  <div class="col-5 flex q-pl-md">
                    <h5 class="q-ml-xl q-mr-xl text-uppercase text-h6 q-ma-none">Количество</h5>
                    <h5 class="q-mr-sm text-uppercase text-h6 q-ma-none">Цена</h5>
                  </div>
                </div>
              </div>
              <div class="col-12 q-py-xs-sm q-py-md-none">
                <cart-item
                  v-for="line in cart.lines"
                  :key="line.product_id"
                  :line="line"
                />
              </div>
            </div>
          </div>
          <div class="col-md-3 col-sm-5 col-xs-12 q-py-xs-sm q-py-md-none">
            <div class="row">
              <div class="col-12">
                <div class="row q-py-sm-sm q-mt-md sm-hide xs-hide title-items">
                  <h3 class="col-12 text-uppercase text-h6 q-ma-none">Оформление заказа</h3>
                </div>
              </div>
              <div class="col-12 item-shadow q-pa-md" style="background: #FAFAFA; color: #3C3C3C;">
                <q-form
                  @submit="sendOrder"
                >
                  <h3 class="text-subtitle1 q-pb-sm" style="font-size: 18px; margin-bottom: 0;">Способ доставки</h3>
                  <q-option-group
                    :options="shippings"
                    v-model="shipping_id"
                  />
                  <div class="q-my-md total" style="position: relative;">
                    Доставка: {{ activeShipping.cost }} руб.
                  </div>
                  <div class="q-my-md text-weight-bold total" style="position: relative;">
                    Cумма:
                  </div>
                  <div class="text-h5 q-mt-lg-none q-pb-sm q-mt-xl text-weight-bold">{{ countTotal }} руб.</div>
                  <q-separator class="q-mb-sm"/>
                  <h3 class="text-subtitle1 q-pb-sm" style="font-size: 18px;">Контактная информация</h3>
                  <q-input
                    @input="$v.customer.first_name.$touch()"
                    v-model.trim="customer.first_name"
                    filled
                    label="имя"
                    type="text"
                    class="q-mb-md"
                    :rules="[
                        val => $v.customer.first_name.required || 'Имя обязательно'
                    ]"
                  />
                  <q-input
                    @input="$v.customer.last_name.$touch()"
                    v-model.trim="customer.last_name"
                    filled
                    label="фамилия"
                    type="text"
                    class="q-mb-md"
                    :rules="[
                        val => $v.customer.last_name.required || 'Фddамилия обязательна'
                    ]"
                  />
                  <q-input
                    filled
                    v-model.trim="customer.email"
                    label="email"
                    type="email"
                    class="q-mb-md"
                  />
                  <q-input
                    @input="$v.customer.phone.$touch()"
                    v-model.trim="customer.phone"
                    filled
                    type="tel"
                    label="телефон"
                    mask="+7 (###) ### - ####"
                    unmasked-value
                    fill-mask
                    class="q-mb-md"
                    :rules="[
                        val => $v.customer.phone.required || 'Номер обязателен'
                    ]"
                  />
                  <template v-if="activeShipping.need_address === true">
                    <q-input
                      filled
                      v-model.trim="customer.street"
                      label="улица"
                      type="text"
                      class="q-mb-md"
                    />
                    <q-input
                      filled
                      v-model.trim="customer.house"
                      label="дом"
                      class="q-mb-md"
                    />
                    <q-input
                      filled
                      v-model.trim="customer.corps"
                      label="корпус"
                      class="q-mb-md"
                    />
                    <q-input
                      filled
                      v-model.trim="customer.flat"
                      label="квартира"
                      class="q-mb-md"
                    />
                  </template>
                  <div class="flex items-center no-wrap checkbox">
                    <q-checkbox label="Подписка на рассылку" style="margin-left: -10px;" v-model="customer.is_subscribe" @click="customer.is_subscribe = !customer.is_subscribe"/>
                  </div>
                  <div class="flex items-center no-wrap checkbox q-pb-sm">
                    <q-checkbox label="Соглашение пользователя на обработку персональных данных" style="margin-left: -10px;" v-model="personal" @click="personal = !personal"/>
                  </div>
                  <div>
                    <q-btn label="Оформить заказ" type="submit" color="primary" class="full-width q-mt-md text-weight-bold"/>
                  </div>
                </q-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-page>
    <q-page class="bg-grey-2 flex items-center" v-else>
      <div class="row justify-center q-py-lg full-width">
        <div class="row container q-col-gutter-x-lg q-pb-md-xl">
          <div class="col-12 text-h5 text-center empty flex column">
            <i class="material-icons">
              sentiment_dissatisfied
            </i>
            <span>Корзина пуста</span>
          </div>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CartItem from '../components/front/cart/Item'
import { required } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      customer: {
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        street: null,
        house: null,
        corpus: null,
        flat: null,
        is_subscribe: false
      },
      shipping_id: null,
      personal: true,
      subscription: true
    }
  },
  validations: {
    customer: {
      first_name: {
        required
      },
      last_name: {
        required
      },
      phone: {
        required
      }
    }
  },
  components: {
    CartItem
  },
  computed: {
    ...mapGetters({
      shippings: 'orders/orders/shippings/list',
      cart: 'orders/orders/cart/cart',
      attributes: 'catalog/attributes/list'
    }),
    activeShipping () {
      return this.shippings.find(shipping => {
        if (shipping.value === this.shipping_id) {
          return shipping
        }
      })
    },
    countTotal () {
      let total = 0

      this.cart.lines.map(line => {
        const productInfo = this.getProductInfo(line)
        if (productInfo.sale_price > 0) {
          total += productInfo.sale_price * line.qty
        } else {
          total += productInfo.price * line.qty
        }
        return total.toFixed(2)
      })

      return total + this.activeShipping.cost
    }
  },
  methods: {
    ...mapActions({
      attributesIndex: 'catalog/attributes/index',
      orderStore: 'orders/orders/store',
      shippingsIndex: 'orders/orders/shippings/index',
      clearCart: 'orders/orders/cart/clear',
      cartCustomer: 'orders/orders/cart/addCustomer',
      cartShipping: 'orders/orders/cart/addShipping'
    }),
    getProductInfo (line) {
      if (line.product.variant_of === null) {
        return line.product
      }

      return line.product.variant_of
    },
    sendOrder () {
      this.cartShipping(this.shipping_id)
      if (this.cart.customer_id === null) {
        this.customer.name = `${this.customer.first_name} ${this.customer.last_name}`
        this.cartCustomer(this.customer)
      }
      if (
        this.customer.street !== null ||
        this.customer.corpus !== null ||
        this.customer.house !== null ||
        this.customer.flat !== null
      ) {
        this.customer.address = `${this.customer.street} ${this.customer.corpus} ${this.customer.house} ${this.customer.flat}`
      }
      this.orderStore(this.cart)
        .then(response => {
          if (response.status === 201) {
            this.$q.notify({
              message: response.data.message,
              color: 'positive',
              position: 'top'
            })
            this.clearCart()
            this.$router.push('/')
          }
        })
    }
  },
  created () {
    this.attributesIndex()
    this.shippingsIndex()
      .then(response => {
        this.shippings = response.data.data
        this.shipping_id = this.shippings[0].value
      })
  }
}
</script>

<style lang="stylus" scoped>
  .margin-fix
    margin-left 0
    margin-bottom 15px
  .product-name
    max-width 300px
    font-size 16px
    color #3C3C3C
  .close
    position absolute
    right 8px
    top 8px
  .title-items
    color #3C3C3C
    font-size 16px
  .price
    font-size 22px
    color #3c3c3c
  .sail
    color #B61118
    padding-top 0
    font-size 22px
  .not-sail
    color #868686
    text-decoration line-through
    font-size 16px
  .sail-label
    background #CC0008
    padding 3px 5px
    display initial
    color #fff
    font-weight 700
  .item-shadow
    box-shadow 0px 2px 6px -2px rgba(0,0,0,0.75)
    border-radius 3px
  .product-info
    font-weight 300
    font-size 14px
  .total
    font-size 18px
    span
      color #3C3C3C
      text-transform lowercase
      position absolute
      top 23px
      font-size 14px
      font-weight 300
  .text-subtitle1
    span
      font-size 12px
      padding-top -15px
  .checkbox
    font-size 12px
  .empty
    color #9E9E9E

  @media (max-width $breakpoint-xs)
    .price
      font-size 18px
      color #3c3c3c
      line-height 18px
    .sail
      color #B61118
      padding-top 0
      font-size 18px
    .not-sail
      color #868686
      text-decoration line-through
      font-size 14px

</style>
