<template>
  <div class="row full-width justify-center">
    <div class="row container q-col-gutter-x-lg">
      <div
        :class="`col-lg-${12 / rowLg} col-md-${12 / rowMd} col-sm-${12 / rowSm} col-xs-${12 / rowXs} q-py-sm-sm q-py-xs-xs no-border-radius`"
        v-for="item in firstLine"
        :key="item.value"
      >
        <q-card>
          <q-card-section>
            <router-link class="text-subtitle2 text-grey-10" style="text-decoration: none" :to="{ name: 'front.catalog', query: { brand: item.value} }">
              {{ item.label }}
            </router-link>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <transition-group tag="div" class="row container q-col-gutter-x-lg" name="fade" @after-enter="enter"
                      @after-leave="leave"
    >
      <div
        :class="`col-lg-${12 / rowLg} col-md-${12 / rowMd} col-sm-${12 / rowSm} col-xs-${12 / rowXs} q-py-sm-sm q-py-xs-xs no-border-radius`"
        v-for="(item, i) in valueArray"
        v-if="i < idx"
        :key="item.value"
      >
        <q-card>
          <q-card-section>
            <div class="text-subtitle2">{{ item.label }}</div>
          </q-card-section>
        </q-card>
      </div>
    </transition-group>
    <div class="row container justify-center q-py-md q-ma-none">
      <q-btn v-if="valueArray.length > 0" class="text-weight-bold" color="primary" outline label="Показать все бренды" @click="run"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'expand',
  data () {
    return {
      show: false,
      firstLine: [],
      valueArray: [],
      values: [],
      idx: 0
    }
  },
  props: {
    rowLg: Number,
    rowMd: Number,
    rowSm: Number,
    rowXs: Number
  },
  watch: {
    '$q.screen': {
      handler: function (value) {
        this.init()
      },
      deep: true
    }
  },
  mounted () {
    this.attributeShow('brand')
      .then(response => {
        this.values = response.data.data.values
        this.init()
      })
  },
  methods: {
    ...mapActions({
      attributeShow: 'catalog/attributes/show'
    }),
    init () {
      this.firstLine = []
      this.valueArray = []
      this.values.forEach(value => {
        if (
          (this.$q.screen.xs && this.firstLine.length < this.rowXs) ||
          (this.$q.screen.sm && this.firstLine.length < this.rowSm) ||
          (this.$q.screen.md && this.firstLine.length < this.rowMd) ||
          (this.$q.screen.lg && this.firstLine.length < this.rowLg) ||
          ((this.$q.screen.width > 1919.98) && this.firstLine.length < this.rowLg)
        ) {
          this.firstLine.push(value)
        } else {
          this.valueArray.push(value)
        }
      })
    },
    run () {
      this.idx += ({ 0: 1, [this.valueArray.length]: -1 })[this.idx]
    },
    enter () {
      this.idx = Math.min(this.valueArray.length, this.idx + 1)
    },
    leave () {
      this.idx = Math.max(0, this.idx - 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .fade-enter-active {
    transition: all 0.12s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .fade-leave-active {
    transition: all 0.12s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    opacity: 1;
  }

  .fade-enter, .fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
