<template>
  <q-page-container>
    <q-page class="bg-grey-2 row justify-center">
      <div class="row container gallery-top q-col-gutter-x-lg q-pb-md-xl q-pt-md-md">
        <div class="col-md-6 col-sm-12 col-xs-12 q-py-lg-sm q-py-sm-md q-py-xs-xs">
          <template v-if="homeslides.length === 0">
            <div class="row items-center full-height justify-center">
              <q-spinner
                      color="primary"
                      size="3em"
              />
            </div>
          </template>
          <template v-else>
            <q-carousel
              animated
              arrows
              v-model="slide"
              :autoplay="5500"
              infinite
              height="325px"
              class="slider"
            >
              <q-carousel-slide v-for="(item, index) in homeslides" :key="item.id" class="slider-item" :name="index"
                                :img-src="item.image">
                <q-btn class="slider-btn" type="a" :href="item.link" replace color="primary text-white" size="18px"
                       :label="item.link_label"></q-btn>
                <div class="text-h4 text-white"
                     style="position:absolute; top: 18px; left: 18px; color: #fff; z-index: 99;">{{item.title}}
                </div>
              </q-carousel-slide>
            </q-carousel>
          </template>
        </div>

        <div v-for="category in parents" :key="category.id"
             class="col-md-3 col-md-auto col-md-grow col-sm-6 col-xs-12 q-py-lg-sm q-py-sm-sm q-py-xs-xs">
          <q-card
            @click="$router.push({ name: 'front.catalog', params: { parent: category.slug } })"
            class="my-card col-12 flex items-center shadow-0 cursor-pointer"
            style="border-radius: 4px"
          >
            <q-img
              :src="category.thumbnail_image"
              basic
            />
            <div style="z-index: 99"
                 class="q-pa-lg-md q-pa-sm-sm q-pa-xs-xs q-pa-md-md text-h5 q-pb-lg text-white absolute-bottom">{{
              category.name }}
            </div>
          </q-card>
        </div>
      </div>
        <home-expand
          :row-lg="6"
          :row-md="4"
          :row-sm="3"
          :row-xs="2"
          id="brands"
        />

    </q-page>
  </q-page-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import HomeExpand from '../components/front/home/Expand'

export default {
  name: 'Home',
  components: {
    HomeExpand
  },
  data () {
    return {
      slide: 1,
      slides: [],
      attribute: []
    }
  },
  computed: {
    ...mapGetters({
      homeslides: 'other/homeslides/list',
      categoriesLoading: 'catalog/categories/isLoading',
      parents: 'catalog/categories/parents'
    })
  },
  methods: {
    ...mapActions({
      homeslidesIndex: 'other/homeslides/index',
      categoriesParents: 'catalog/categories/parents'
    })
  },
  beforeMount () {
    this.homeslidesIndex()
    if (this.parents.length === 0 && this.categoriesLoading === false) { this.categoriesParents() }
  }
}
</script>

<style lang="scss" scoped>
.gallery-top {
  .q-card {
    height: 325px;
    border-right: 2px;
  }

  .my-card {
    justify-content: space-between;

    .q-card__actions {
      justify-content: flex-end;
    }
  }

  .card-btn {
    .q-btn {
      padding: 0 18px;
    }
  }
}

.btn-dropdown {
  .q-btn {
    width: 100%;
  }
}

.gallery-animation {
  transition: all .5s ease-in-out;
  height: auto;
  opacity: 1;
}

.collapsed {
  height: 0px;
  overflow: hidden;
  padding: 0px;
  opacity: 0;
}

.q-carousel {
  position: relative;
}

.q-carousel:after {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: -moz-linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 1) 100%); /* ff3.6+ */
  background: -webkit-gradient(linear, left top, right bottom, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(100%, rgba(255, 255, 255, 0))); /* safari4+,chrome */
  background: -webkit-linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 1) 100%); /* safari5.1+,chrome10+ */
  background: -o-linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 1) 100%); /* opera 11.10+ */
  background: -ms-linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 1) 100%); /* ie10+ */
  background: linear-gradient(315deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 1) 100%); /* w3c */
  opacity: 0.5;
}

.my-card:after {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: -moz-linear-gradient(135deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%); /* ff3.6+ */
  background: -webkit-gradient(linear, left top, right bottom, color-stop(100%, rgba(255, 255, 255, 0)), color-stop(0%, rgba(0, 0, 0, 1))); /* safari4+,chrome */
  background: -webkit-linear-gradient(135deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%); /* safari5.1+,chrome10+ */
  background: -o-linear-gradient(135deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%); /* opera 11.10+ */
  background: -ms-linear-gradient(135deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%); /* ie10+ */
  background: linear-gradient(315deg, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%); /* w3c */
  opacity: 0.5;
  border-radius: 4px;
}

.slider {
  border-radius: 4px;

  .slider-item {
    position: relative;

    .slider-btn {
      position: absolute;
      bottom: 16px;
      right: 16px;
    }
  }
}
</style>
