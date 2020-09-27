<template>
  <div class="q-px-none container row q-col-gutter-x-lg q-pb-lg">
    <div class="col-sm-12 col-xs-12">
      <div class="row q-col-gutter-x-lg">

        <div class="col-md-6 col-sm-12 col-xs-12 scroll-item flex no-wrap justify-between q-pb-lg" style="overflow: hidden">
            <div class="row full-width item-height">
          <template v-if="product.gallery && product.gallery.length > 0">
              <q-scroll-area
                class='col-md-2 col-sm-2 col-xs-2 offset-sm-1 offset-xs-0 q-pr-md-sm q-pr-sm-lg q-px-xs-none'
              >
                <div class="item-image" v-for="(image, index) in product.gallery" :key="image.id">
                  <img class='q-mb-sm-xl q-mb-xs-xs'
                       :src="storage_link + `${image.id}/conversions/gallery-thumb/` + image.file_name"
                       width="100%"
                       alt=""
                       @click="changeImage(index)"
                  >
                </div>
              </q-scroll-area>
              <div class="image-back col-md-8 col-sm-6 col-xs-9 offset-1">
                  <img :src="storage_link + `${currentImage.id}/` + currentImage.file_name"
                       width="100%"
                       alt=""
                  >
              </div>
          </template>
          <template v-else>
            <div class="image-back col-md-8 col-sm-6 col-xs-9 offset-3">
              <p>Нет изображений</p>
            </div>
          </template>
            </div>
        </div>

        <div class="col-md-6 col-sm-11 col-xs-12 offset-md-0 offset-sm-1 offset-xs-0 q-pt-lg">
          <div class="row column-md row-sm row-xs q-col-gutter-x-sm">
            <div class="col-md-12 col-sm-6 col-xs-12">
              <h5 class="no-margin item-name">{{ product.name }}</h5>

              <template v-if="common.length > 0 && product.attributes">
                <div v-for="attribute in common.filter(attr => attr.is_select === false)" :key="attribute.id">
                  <p class="text-subtitle1 q-pt-sm" v-if="product.attributes[attribute.slug]">
                    {{ attribute.name }}: {{ product.attributes[attribute.slug] }}
                  </p>
                </div>
              </template>

              <!-- выбираемые атрибуты -->
              <template v-if="attributes.length > 0">
                <div
                        v-for="attribute in attributes.filter(attr => attr.is_select === true)"
                        :key="attribute.id"
                >
                  <component
                          v-on:changeValue="handleVariant($event)"
                          :is="`type-select-${attribute.type}`"
                          :attribute="attribute"
                          :issetValues="variantAttributes[attribute.slug]"
                  />
<!--                  {{ attribute.name }}-->
                </div>
              </template>

              <template v-if="product.sale_price > 0">
                <div class="text-h6 q-pt-md price old">{{ product.price }} р.</div>
                <div class="text-h6 q-pt-md price sale">{{ product.sale_price }} р.</div>
              </template>
              <template v-else>
                <div class="text-h6 q-pt-md price">{{ product.price }} р.</div>
              </template>

              <template v-if="product.variants && product.variants.length > 1 && variant">
                <q-btn
                        v-if="variant.id"
                        @click="itemStore(variant)"
                        color="red-8 item-btn"
                        class="q-mb-xl q-mt-xl"
                        label="Добавить в корзину"
                />
              </template>
              <template v-else>
                <q-btn
                  @click="itemStore(product)"
                  color="red-8 item-btn"
                  class="q-mb-xl q-mt-xl"
                  label="Добавить в корзину"
                />
              </template>
            </div>
            <div class="col-md-12 col-sm-6 col-xs-12">
              <div class="product-info q-pt-md-xl q-pt-sm-xs q-pb-xl q-mb-lg">
                <template v-if="attributes.length > 0">
                  <div class="text-subtitle1 q-pb-md">О товаре:</div>
                  <p
                          class="no-margin q-pb-sm"
                          v-for="attribute in attributes.filter(attr => attr.is_select === false)"
                          :key="attribute.id"
                  >
                    <template v-if="product.attributes[attribute.slug]">
                      <span>{{ attribute.name }}: </span>{{ product.attributes[attribute.slug] }}
                    </template>
                  </p>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
  .item-image
    overflow hidden

  .image-back
    background #fff
    display: flex;
    justify-content: center;
    align-items: center;

  .item-height
    max-height 500px

  .text-subtitle1
    color #3C3C3C
    font-weight 300

  .item-name
    color #3C3C3C

  .item-btn
    width 250px
    height 49px
    font-weight 500
    font-size 18px

  .product-info
    color #3C3C3C
    font-size 16px

    span
      font-weight 300

  .price
    color #868686
    padding-top 0
    font-size 28px

    &.sale
      color #B61118

    &.old
      text-decoration line-through

  .q-scrollarea__thumb--v
    width 5px

  @media (max-width $breakpoint-xs)
    .item-height
      max-height 400px

</style>

<script>
import { mapActions, mapGetters } from 'vuex'
import { STORAGE_URL } from '../api'
import TypeSelectColor from '../components/front/attribute/select/Color'
import TypeSelectText from '../components/front/product/attributes/select/Text'

export default {
  data () {
    return {
      product: {},
      variant: {},
      attributes: {},
      variantAttr: {},
      currentImageIndex: 0
    }
  },
  components: {
    TypeSelectColor,
    TypeSelectText
  },
  watch: {
    '$route.params.slug': function (slug) {
      this.loadProduct(slug)
    }
  },
  computed: {
    ...mapGetters({
      common: 'catalog/attributes/common'
    }),
    currentImage () {
      return this.product.gallery[this.currentImageIndex]
    },
    storage_link () {
      return STORAGE_URL
    },
    selectableVariants () {
      if (this.product.variants.length < 1) {
        return null
      }
      return this.product.variants.map(variant => {
        return {
          variant_id: variant.id,
          ...variant.attributes
        }
      })
    },
    variantAttributes () {
      let attributes = {}

      this.product.variants.forEach(variant => {
        const variantAttrs = Object.keys(variant.attributes)

        variantAttrs.forEach(attribute => {
          if (!this.$_.isArray(attributes[attribute])) {
            attributes[attribute] = []
          }

          attributes[attribute].push(variant.attributes[attribute])
        })
      })

      return attributes
    }
  },
  methods: {
    ...mapActions({
      productShow: 'catalog/products/show',
      productView: 'catalog/products/view',
      addToCart: 'orders/orders/cart/addToCart',
      commonAttributes: 'catalog/attributes/common',
      categoryAttributes: 'catalog/categories/attributes'
    }),
    loadProduct (slug) {
      this.productShow(slug)
        .then(response => {
          this.product = response.data.data
          this.productView(this.product.slug)
          this.categoryAttributes(this.product.categories)
            .then(response => {
              this.attributes = response.data.data
            })
        })
    },
    handleVariant (value) {
      this.variantAttr = value
      this.attributes.filter(attr => attr.is_select === true)
      if (Object.keys(this.variantAttr).length === this.attributes.filter(attr => attr.is_select === true).length) {
        this.variant = this.product.variants.filter(variant => {
          if (this.$_.isEqual(variant.attributes, this.variantAttr)) {
            return variant
          }
          return null
        }
        )[0]
      }
    },
    itemStore (variant) {
      this.addToCart(variant)
    },
    changeImage (index) {
      this.currentImageIndex = index
    }
  },
  created () {
    if (this.common.length === 0) {
      this.commonAttributes()
    }
    this.loadProduct(this.$route.params.slug)
  }
}
</script>
