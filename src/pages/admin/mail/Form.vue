<template>
    <q-form @submit="confirmForm">
        <template v-if="mailId">
            <h2 class="text-h6">Редактирование рассылки</h2>
        </template>
        <template v-else>
            <h2 class="text-h6">Создание новой рассылки</h2>
        </template>
        <q-card>
            <q-card-section>
                <q-input
                    @input="$v.localMail.subject.$touch()"
                    v-model.trim="localMail.subject"
                    label="Тема рассылки"
                    :rules="[
                        val => $v.localMail.subject.required || 'Тема обязательна'
                    ]"
                />
                <q-input
                    @input="$v.localMail.text.$touch()"
                    type="textarea"
                    v-model.trim="localMail.text"
                    label="Текст рассылки"
                    :rules="[
                        val => $v.localMail.text.required || 'Текст обязателен'
                    ]"
                />
                <q-input
                    @input="$v.localMail.delay.$touch()"
                    label="Дата отправки"
                    v-model="localMail.delay"
                    :rules="[
                        val => $v.localMail.delay.required || 'Дата обязательна'
                    ]"
                >
                    <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-date v-model="localMail.delay" mask="YYYY-MM-DD HH:mm:ss" />
                            </q-popup-proxy>
                        </q-icon>
                    </template>

                    <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-time v-model="localMail.delay" mask="YYYY-MM-DD HH:mm:ss" with-seconds />
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </q-card-section>
            <q-separator/>
            <q-card-actions>
                <q-btn to="/admin/mails" unelevated>Отменить</q-btn>
                <q-space/>
                <q-btn type="submit" unelevated color="grey-4" class="text-black">Сохранить</q-btn>
                <q-btn unelevated color="primary">Отправить</q-btn>
            </q-card-actions>
        </q-card>
    </q-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'Form',
  data () {
    return {
      mailId: null,
      localMessage: {},
      localMail: {},
      localErrors: []
    }
  },
  validations: {
    localMail: {
      subject: {
        required
      },
      text: {
        required
      },
      delay: {
        required
      }
    }
  },
  methods: {
    ...mapActions({
      mailShow: 'communications/mails/show',
      mailStore: 'communications/mails/store',
      mailUpdate: 'communications/mails/update'
    }),
    loadMail (mailId) {
      this.localMail = {}
      if (mailId !== 'undefined') {
        this.mailId = mailId

        if (this.mailId) {
          this.mailShow(this.mailId)
            .then(response => {
              this.localMail = response.data.data
            })
        }
      }
    },
    confirmForm () {
      this.localMail.creator_id = this.auth.id
      if (this.mailId) {
        this.mailUpdate(this.localMail)
          .then(
            response => {
              this.$q.notify({
                message: response.data.message,
                color: 'positive',
                position: 'top'
              })
              this.localErrors = []
            },
            error => {
              this.$q.notify({
                message: error.response.data.message,
                color: 'negative',
                position: 'top'
              })
              this.localErrors = error.response.data.errors
            })
      } else {
        this.mailStore(this.localMail)
          .then(
            response => {
              this.$q.notify({
                message: response.data.message,
                color: 'positive',
                position: 'top'
              })
              this.localErrors = []
            },
            error => {
              this.$q.notify({
                message: error.response.data.message,
                color: 'negative',
                position: 'top'
              })
              this.localErrors = error.response.data.errors
            })
      }
    }
  },
  watch: {
    '$route.params.id': function (mailId) {
      this.loadMail(mailId)
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/authUser'
    })
  },
  created () {
    this.loadMail(this.$route.params.id)
  }
}
</script>

<style scoped>

</style>
