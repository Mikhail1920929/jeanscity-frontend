<template>
    <div class="col">
        <span class="text-weight-medium text-bold">Галерея</span>
        <div class="q-pa-md">
            <template v-if="localGallery.length > 0">
                <draggable v-model="localGallery">
                    <transition-group tag="div" class="row">
                        <div
                                style="position: relative"
                                class="col-6"
                                v-for="(image, index) in localGallery" :key="image.name"
                        >
                            <q-badge color="transparent" floating>
                                <q-btn color="negative" round dense unelevated
                                       @click="removeFile(index)" icon="delete"/>
                            </q-badge>
                            <div style="height: 200px; overflow: hidden">
                                <img width="100%" :src="imagePath(image)" alt="">
                            </div>
                        </div>
                    </transition-group>
                </draggable>
            </template>
            <template v-else>
                <p class="text-grey-6">Выберите основное изображение товара и установите
                    желаемый порядок отображения.</p>
            </template>
            <br>
            <q-btn @click="$refs.media_uploader.click()" unelevated color="primary">
                Добавить изображения
            </q-btn>
            <input multiple @input="uploader" ref="media_uploader"
                   style="display: none" type="file">
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'

import { mapActions, mapGetters } from 'vuex'
import { STORAGE_URL } from '../../../api'

import ProductEventBus from '../../../events/products'

export default {
  components: {
    draggable
  },
  name: 'ProductGallery',
  data () {
    return {
      lock: false,
      localGallery: this.gallery || []
    }
  },
  props: {
    gallery: Array
  },
  computed: {
    ...mapGetters({
      product: 'catalog/products/item'
    }),
    storagePath () {
      return STORAGE_URL
    },
    media () {
      return this.localGallery.map(image => image.id)
    }
  },
  methods: {
    ...mapActions({
      mediaStore: 'other/media/store'
    }),
    imagePath (image) {
      if (image.id !== undefined) {
        return this.storagePath + image.id + '/' + image.file_name
      } else {
        return image.file_name
      }
    },
    uploader () {
      const files = Object.values(this.$refs.media_uploader.files)
      files.forEach(file => {
        file.file_name = URL.createObjectURL(file)
      })
      this.localGallery.push(...files)
    },
    removeFile (index) {
      this.localGallery.splice(index, 1)
    },
    saveMedia () {
      if (this.localGallery.length === 0) {
        ProductEventBus.$emit('fileLoaded', true)
      }
      this.localGallery.forEach((image, index) => {
        if (image.id === undefined) {
          const media = new FormData()
          media.append('media', image)
          this.mediaStore(media)
            .then((response) => {
              this.localGallery[index] = response.data.data
              ProductEventBus.$emit('fileLoaded', true)
            })
        } else {
          ProductEventBus.$emit('fileLoaded', true)
        }
      })
    }
  },
  mounted () {
    setTimeout(() => {
      this.localGallery = this.gallery
    }, 1000)
    this.debounceSaveMedia = this.$_.debounce(this.saveMedia, 1)

    ProductEventBus.$on('saveProduct', (payload) => {
      if (payload === true) {
        this.lock = false
        this.debounceSaveMedia()
      }
    })

    ProductEventBus.$on('fileLoaded', (payload) => {
      if (
        this.localGallery.filter(image => image.id === undefined).length === 0 &&
          this.lock === false
      ) {
        ProductEventBus.$emit('mediaLoaded', this.media)
        this.lock = true
      }
    })
  }
}
</script>

<style scoped>

</style>
