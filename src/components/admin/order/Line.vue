<template>
    <q-item>
        <q-item-section top>
            <q-item-label>{{ localLine.product_info.name }}</q-item-label>
            <q-item-label caption>
                <ul v-if="localLine.product_info.attributes" class="listless q-ma-none">
                    <li
                            v-for="attribute in Object.keys(localLine.product_info.attributes)"
                            :key="attribute"
                    >
                        {{ attributes.find(attr => attr.slug === attribute).name }}: {{ localLine.product_info.attributes[attribute] }}
                    </li>
                </ul>
            </q-item-label>
        </q-item-section>
        <q-item-section top>
            <ul class="listless q-ma-none">
                <li>Кол-во: {{ localLine.qty }} шт.</li>
            </ul>
        </q-item-section>
        <q-item-section side>
            <q-btn
                    color="primary"
                    outline
                    round
                    size="sm"
                    icon="edit"
            />
        </q-item-section>
    </q-item>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: function () {
    return {
      localLine: this.line || null
    }
  },
  name: 'OrderLine',
  props: {
    line: Object
  },
  computed: {
    ...mapGetters({
      attributes: 'catalog/attributes/list'
    })
  },
  methods: {
    productLine () {
      if (this.localLine.product.variant_of === null) {
        this.localLine.product_info = this.localLine.product

        return this.localLine
      }

      Object.assign(this.localLine.product.variant_of.attributes, this.localLine.product.attributes)
      this.localLine.product_info = this.localLine.product.variant_of
      return this.localLine
    }
  },
  created () {
    this.productLine()
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
