<template>
    <div class="col-md-4 col-sm-6 col-xs-12 q-pb-lg">
        <q-card @mouseover="show = true" @mouseleave="show = false" class="list-product shadow-0 full-height bg-transparent overflow-hidden">
            <router-link :to="{ name: 'front.product', params: { slug: product.slug } }" class="list-item">
                <q-card-section class="info q-pt-none">
                    <front-attribute
                            :show="show"
                            :variantAttributes="variantAttributes"
                    />
                    <product-thumbnail
                            :gallery="product.gallery"
                    />
                    <q-badge class="no-border-radius sale-badge" color="red-8" floating
                             v-if="product.sale_price > 0 && product.sale_price !== 0">
                        {{ product.sale_price }} руб.
                    </q-badge>
                    <div class="row q-pt-xs items-end">
                        <template v-if="product.sale > 0 && product.sale_price > 0">
                            <span class="text-bold sale price">{{ product.sale_price }} руб.</span>
                            <q-space/>
                            <span class="text-bold old price">{{ product.price }} руб.</span>
                        </template>
                        <template v-else>
                            <span class="text-bold price">{{ product.price }} руб.</span>
                        </template>
                    </div>
                    <!--                        <div :to="{ name: 'product', params: { product_slug: product.slug } }" class="text-h6 product-name text-black">{{ product.name }}</div>-->
                    <div class="text-h6 product-name text-black">{{ product.name }}</div>
                </q-card-section>
            </router-link>
        </q-card>
    </div>
</template>

<script>
import { STORAGE_URL } from '../../../api'
import ProductThumbnail from './Thumbnail'
import FrontAttribute from './FrontAttribute'

export default {
  name: 'ListItem',
  components: {
    ProductThumbnail,
    FrontAttribute
  },
  data () {
    return {
      show: false
    }
  },
  props: {
    product: Object
  },
  computed: {
    storageLink () {
      return STORAGE_URL
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
  }
}
</script>

<style lang="stylus" scoped>
    .list-product
        .list-item
            text-decoration none
            z-index 90

        &:hover
            background-color white !important
            transition all .3s ease
            box-shadow 0px 4px 15px rgba(0, 0, 0, 0.25) !important

            .sizes
                opacity 1

        .sale-badge
            top 10px
            right 26px
            font-size 16px
            line-height 22px

        .info
            .product-name
                font-size 16px
                font-weight normal
                text-decoration none

            .price
                font-size 20px
                color #3C3C3C

                &.sale
                    color #B61118

                &.old
                    text-decoration line-through
                    font-size 16px
                    color #868686
</style>
