<template>
    <div>
        <q-form @submit="confirmForm">
            <template v-if="attributeId">
                <h2 class="text-h6">Редактирование атрибута</h2>
            </template>
            <template v-else>
                <h2 class="text-h6">Создание нового атрибута</h2>
            </template>
            <q-card>
                <q-card-section>
                    <q-input
                        v-model="attribute.name"
                        label="Название"
                    />
                    <q-input
                        v-model="attribute.slug"
                        label="Отображение в ссылке"
                    />
                    <q-select
                        v-model="attribute.type"
                        label="Тип атрибута"
                        :options="types"
                    />
                    <q-checkbox
                        v-model="attribute.is_select"
                        label="Выбираемый?"
                    />
                </q-card-section>
                <q-separator/>
                <q-card-actions>
                    <q-btn to="/admin/attributes" unelevated>Отменить</q-btn>
                    <q-space/>
                    <q-btn type="submit" unelevated color="primary">Сохранить</q-btn>
                </q-card-actions>
            </q-card>
        </q-form>
        <q-card class="q-mt-lg q-mb-lg" v-if="attribute.categories">
            <q-card-section>
                <div class="text-h6">Категории атрибута:</div>
            </q-card-section>
            <q-separator/>
            <q-list separator>
                <q-expansion-item v-for="category in categories" :label="category.name" :key="category.id">
                    <q-option-group
                        :options="selectableChildren(category.children)"
                        v-model="attribute.categories"
                        type="checkbox"
                    />
                </q-expansion-item>
            </q-list>
        </q-card>

        <q-card style="height: 400px; overflow-y: auto" class="q-mt-lg q-mb-lg" v-if="valuesLocal">
            <q-card-section>
                <div class="text-h6">Значения атрибута:</div>
            </q-card-section>
            <q-separator/>
            <q-list>
                <q-item :key="value.content" v-for="value in valuesLocal">
                    <q-item-section>
                        <q-input
                            v-model="value.value"
                            label="Значение атрибута"
                        />
<!--                        {{ value.content }}-->
                    </q-item-section>
                    <q-item-section side>
                        <q-btn-group unelevated rounded>
                            <q-btn color="primary" size="sm" round outline icon="save" @click="updateValues(value)"/>
                        </q-btn-group>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-card>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AttributeForm',
  data () {
    return {
      attributeId: null,
      attribute: {},
      types: [],
      categories: [],
      valuesLocal: [],
      updateItem: {}
    }
  },
  watch: {
    '$route.params.id': function (attributeId) {
      this.loadAttribute(attributeId)
    }
  },
  computed: {
    ...mapGetters({
      values: 'values/list'
    })
  },
  methods: {
    ...mapActions({
      attributeShow: 'catalog/attributes/show',
      attributeStore: 'catalog/attributes/store',
      attributeUpdate: 'catalog/attributes/update',
      attributeTypes: 'catalog/attributes/types',
      valuesUpdate: 'catalog/attributes/values/update',
      categoriesArray: 'catalog/categories/parents',
      mediaStore: 'other/media/store',
      mediaDestroy: 'other/media/destroy',
      mediaShow: 'other/media/show'
    }),
    selectableChildren (children) {
      const select = []
      children.forEach(child => {
        select.push({
          label: child.name,
          value: child.id
        })
      })

      return select
    },
    dispatchMediaDestroy () {
      this.mediaDestroy(this.attribute.thumbnail.id)
        .then(response => {
          this.message = {
            text: response.data.message,
            status: response.status
          }
          this.loadAttribute(this.attributeId)
        })
    },
    uploadFile (files) {
      let formData = new FormData()
      formData.append('media', files[0])
      this.mediaStore(formData)
        .then(response => {
          this.message = {
            text: response.data.message,
            status: response.status
          }
          this.attribute.media = response.data.data.id
        })
    },
    loadAttribute (attributeId) {
      this.attribute = {}
      this.attributeId = attributeId
      if (attributeId !== 'undefined') {
        this.attributeId = attributeId

        if (this.attributeId) {
          this.attributeShow(this.attributeId)
            .then(response => {
              this.attribute = response.data.data
              // console.log(this.attribute)
              this.valuesLocal = response.data.data.values
              // console.log(this.valuesLocal)
            })
        }
      }
    },
    confirmForm () {
      if (this.attributeId) {
        this.attributeUpdate(this.attribute)
          .then(
            response => {
              this.$q.notify({
                message: response.data.message,
                color: 'positive',
                position: 'top'
              })
            },
            error => {
              this.$q.notify({
                message: error.response.data.message,
                color: 'negative',
                position: 'top'
              })
            })
      } else {
        this.attributeStore(this.attribute)
          .then(
            response => {
              this.$q.notify({
                message: response.data.message,
                color: 'positive',
                position: 'top'
              })
            },
            error => {
              this.$q.notify({
                message: error.response.data.message,
                color: 'negative',
                position: 'top'
              })
            })
      }
    },
    updateValues (item) {
      item.attribute_id = this.attribute.slug
      this.valuesUpdate(item)
      // console.log(item)
    }
  },
  created () {
    this.categoriesArray({
      return: 'parents'
    })
      .then(response => {
        this.categories = response.data.data
        // console.log(response.data.data)
      })
    this.loadAttribute(this.$route.params.id)
    this.attributeTypes()
      .then(response => {
        this.types = response.data.data
      })
    // this.valuesIndex(this.$route.params.id)
  }
}
</script>

<style scoped>

</style>
