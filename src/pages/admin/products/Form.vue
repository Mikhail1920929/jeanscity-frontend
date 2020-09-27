<template>
  <div class="row" style="height: calc(100vh - 48px)">
    <div class="col-5 bg-grey-1">
      <div class="row q-pa-sm bg-grey-2">
        <q-checkbox
          v-model="product.is_sell"
          label="Включить товар"
        />
        <q-space/>
        <q-btn
          @click.native="confirmForm()"
          unelevated
          color="primary"
          label="Сохранить товар"
        />
      </div>
      <q-scroll-area style="height: calc(100% - 68px)">
        <div class="q-ma-lg">
          <span class="text-h6">Данные товара</span>
          <br>
          <ProductsAttributesCommon
            :attributes="product.attributes"
          />
          <br>
          <q-input
            v-model="product.name"
            label="Название товара"
          />
          <q-input
            v-model="product.sku"
            label="Артикул"
          />
          <q-input
            suffix="руб."
            v-model="product.price"
            label="Цена"
          />
          <div class="q-mb-xs">
            <q-input
              suffix="руб."
              ref="input"
              v-model="product.sale_price"
              label="Скидка"
              bottom-slots
              :error="!isValidSale"
            >
              <template v-slot:error>
                Цена со скидкой должна быть меньше основной цены
              </template>
            </q-input>
          </div>
          <!--<q-input
            suffix="руб."
            v-model="product.sale_price"
            label="Цена со скидкой"
          />-->
          <br>
          <q-input
            filled
            type="textarea"
            v-model="product.description"
            label="Описание товара"
          />
          <br>
          <q-separator/>
          <br>
          <ProductGallery
            :gallery="product.gallery"
          />
          <br>
          <q-separator/>
          <br>
          <ProductCategories
            :category="product.categories[0]"
          />
          <br>
          <q-separator/>
          <br>
          <SelectableAttributes
            :category="product.categories"
          />
          <br>
          <q-separator/>
          <br>
          <ProductsAttributesCategory
            :productAttrs="product.attributes"
            :category="product.categories"
          />
        </div>
      </q-scroll-area>
    </div>
    <div class="col q-pa-lg">
      <ProductVariant
        :variant-of="product.id"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProductEventBus from '../../../events/products'

import ProductGallery from '../../../components/admin/products/Gallery'
import ProductCategories from '../../../components/admin/products/Categories'

import SelectableAttributes from '../../../components/admin/products/SelectableAttributes'
import ProductsAttributesCategory from '../../../components/admin/products/attributes/Category'
import ProductsAttributesCommon from '../../../components/admin/products/attributes/Common'

import ProductVariant from '../../../components/admin/products/Variant'

export default {
  components: {
    ProductGallery,
    ProductCategories,
    SelectableAttributes,
    ProductsAttributesCategory,
    ProductsAttributesCommon,
    ProductVariant
  },
  data () {
    return {
      product: {
        gallery: [],
        attributes: {},
        categories: [null],
        is_sell: false
      }
    }
  },
  computed: {
    isValidSale () {
      return this.product.sale_price < this.product.price
    }
  },
  methods: {
    ...mapActions({
      productClear: 'catalog/products/clear',
      productShow: 'catalog/products/show',
      productStore: 'catalog/products/store',
      productUpdate: 'catalog/products/update',
      productVariants: 'catalog/products/variants'
    }),
    confirmForm () {
      ProductEventBus.$emit('saveProduct', true)

      ProductEventBus.$once('mediaLoaded', (media) => {
        this.product.media = media
        if (this.product.id) {
          this.productUpdate(this.product)
            .then(response => {
              this.product = response.data.data

              this.$q.notify({
                message: response.data.message,
                color: 'positive',
                position: 'top'
              })
            })
        } else {
          this.productStore(this.product)
            .then(response => {
              this.product = response.data.data
              this.$q.notify({
                message: response.data.message,
                color: 'positive',
                position: 'top'
              })
            })
        }
      })
    }
  },
  created () {
    if (this.$route.params.slug) {
      this.product.categories = null
      this.productShow(this.$route.params.slug)
        .then(response => {
          this.product = response.data.data
          if (this.product.attributes.length === 0) {
            this.product.attributes = {}
          }
        })
    } else {
      this.productClear()
    }
    ProductEventBus.$on('selectCategory', (payload) => {
      this.product.categories[0] = payload
      console.log(this.product.categories)
    })
    ProductEventBus.$on('changeProductCategoryAttribute', (payload) => {
      this.product.attributes = payload
      // console.log(payload)
    })
    ProductEventBus.$on('changeCommonAttributes', (payload) => {
      this.product.attributes = payload
      // console.log(payload)
    })
  }
}
</script>

<style lang="scss">
  .group-btns {
    box-shadow: none;

    .q-btn {
      font-weight: 500;
    }

    .q-btn + .q-btn {
      margin-left: 10px;
    }
  }
</style>

<!--
<template>
    <div class="row" style="height: calc(100vh - 48px)">
      <div class="col-5 bg-grey-1">
        <div class="row q-pa-sm bg-grey-2">
          <q-checkbox
                  v-model="product.is_sell"
                  label="Включить товар"
          />
          <q-space/>
          <q-btn
                  @click.native="confirmForm()"
                  unelevated
                  color="primary"
                  label="Сохранить товар"
          />
        </div>
        <q-scroll-area style="height: calc(100% - 68px)">
            <div class="q-ma-lg">
                <span class="text-h6">Данные товара</span>
                <br>
                <ProductsAttributesCommon
                        :attributes="product.attributes"
                />
                <br>
                <q-input
                        v-model="product.name"
                        label="Название товара"
                />
                <q-input
                        v-model="product.sku"
                        label="Артикул"
                />
                <q-input
                        suffix="руб."
                        v-model="product.price"
                        label="Цена"
                />
                <q-input
                        suffix="руб."
                        v-model="product.sale_price"
                        label="Цена со скидкой"
                />
                <br>
                <q-input
                        filled
                        type="textarea"
                        v-model="product.description"
                        label="Описание товара"
                />
                <br>
                <q-separator/>
                <br>
                <ProductGallery
                        :gallery="product.gallery"
                />
                <br>
                <q-separator/>
                <br>
                <ProductCategories
                        :category="product.categories[0]"
                />
                <br>
                <q-separator/>
                <br>
                <SelectableAttributes
                        :category="product.categories[0]"
                />
                <br>
                <q-separator/>
                <br>
                <ProductsAttributesCategory
                        :productAttrs="product.attributes"
                        :category="product.categories[0]"
                />
            </div>
        </q-scroll-area>
      </div>
        <div class="col q-pa-lg">
            <ProductVariant
                    :variant-of="product.id"
            />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ProductEventBus from '../../../events/products'

import ProductGallery from '../../../components/admin/products/Gallery'
import ProductCategories from '../../../components/admin/products/Categories'

import SelectableAttributes from '../../../components/admin/products/SelectableAttributes'
import ProductsAttributesCategory from '../../../components/admin/products/attributes/Category'
import ProductsAttributesCommon from '../../../components/admin/products/attributes/Common'

import ProductVariant from '../../../components/admin/products/Variant'

export default {
  components: {
    ProductGallery,
    ProductCategories,
    SelectableAttributes,
    ProductsAttributesCategory,
    ProductsAttributesCommon,
    ProductVariant
  },
  data () {
    return {
      product: {
        attributes: {},
        categories: [],
        is_sell: false
      }
    }
  },
  methods: {
    ...mapActions({
      productShow: 'catalog/products/show',
      productStore: 'catalog/products/store',
      productUpdate: 'catalog/products/update',
      productVariants: 'catalog/products/variants'
    }),
    confirmForm () {
      ProductEventBus.$emit('saveProduct', true)

      ProductEventBus.$once('mediaLoaded', (media) => {
        // console.log(media)
        this.product.media = media
        // console.log(this.product)
        if (this.product.id) {
          this.productUpdate(this.product)
            .then(response => {
              this.$q.notify({
                message: response.data.message,
                color: 'positive',
                position: 'top'
              })
            })
        } else {
          this.productStore(this.product)
            .then(response => {
              this.$q.notify({
                message: response.data.message,
                color: 'positive',
                position: 'top'
              })
            })
        }
      })
    }
  },
  created () {
    // this.product.categories = []
    if (this.$route.params.slug) {
      this.product.categories = null
      this.productShow(this.$route.params.slug)
        .then(response => {
          this.product = response.data.data
          // this.product.categories = response.data.data.categories
          // console.log(this.product)
          // console.log(response.data.data)
          // if (this.product.categories) {
          //   this.product.categories = this.product.categories
          //   this.product.categories = []
          // }
        })
    }
    ProductEventBus.$on('selectCategory', (payload) => {
      this.product.categories[0] = payload
    })
    ProductEventBus.$on('changeProductCategoryAttribute', (payload) => {
      this.product.attributes = payload
    })
  }
}
</script>

<style lang="scss">
    .group-btns {
        box-shadow: none;

        .q-btn {
            font-weight: 500;
        }

        .q-btn + .q-btn {
            margin-left: 10px;
        }
    }
</style>
-->
