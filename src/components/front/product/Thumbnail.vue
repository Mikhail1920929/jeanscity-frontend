<template>
    <div style="width: 100%">
        <template v-if="typeof gallery !== 'undefined' && gallery.length > 0">
            <q-img
                    style="width: 100%; height: 308px; border: 2px solid white;"
                    v-if="gallery.length > 0"
                    :src="`${storage_link}${gallery[0].id}/conversions/list-thumb/${gallery[0].file_name}`"
            />
        </template>
        <template v-else>
            <div style="width: 100%; height: 308px; border: 2px solid white;" class="bg-grey-4 row justify-center items-center">
                <q-icon
                        color="grey-5"
                        size="60px"
                        name="clear"
                />
            </div>
        </template>
    </div>
</template>

<script>
import { STORAGE_URL } from '../../../api'

export default {
  name: 'ProductThumbnail',
  props: {
    gallery: Array
  },
  computed: {
    storage_link () {
      return STORAGE_URL
    }
  }
}
</script>

<style scoped>

</style>
