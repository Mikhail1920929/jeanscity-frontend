<template>
    <q-form @submit="confirmForm">
        <template v-if="userId">
            <h2 class="text-h6">Редактирование пользователя</h2>
        </template>
        <template v-else>
            <h2 class="text-h6">Создание нового пользователя</h2>
        </template>
        <q-card>
            <q-card-section>
                <q-input
                    @input="$v.localUser.last_name.$touch()"
                    v-model.trim="localUser.last_name"
                    label="Фамилия"
                    lazy-rules
                    :rules="[
                      val => $v.localUser.last_name.required || 'Фамилия обязательна'
                    ]"
                />
                <q-input
                    @input="$v.localUser.first_name.$touch()"
                    v-model.trim="localUser.first_name"
                    label="Имя"
                    lazy-rules
                    :rules="[
                      val => $v.localUser.first_name.required || 'Имя обязательно'
                    ]"
                />
                <q-input
                    @input="$v.localUser.email.$touch()"
                    v-model.trim="localUser.email"
                    label="Почта"
                    lazy-rules
                    :rules="[
                      val => $v.localUser.email.required || 'Email обязателен',
                      val => $v.localUser.email.email || 'Неверный формат email'
                    ]"
                />
                <q-input
                    @input="$v.localUser.phone.$touch()"
                    v-model.trim="localUser.phone"
                    label="Телефон"
                    lazy-rules
                    :rules="[
                      val => $v.localUser.phone.required || 'Телефон обязателен'
                    ]"
                />
                <q-select
                    @input="$v.localUser.role_id.$touch()"
                    emit-value
                    map-options
                    v-model="localUser.role_id"
                    label="Роль"
                    :options="localRoles"
                    lazy-rules
                    :rules="[
                      val => $v.localUser.role_id.required || 'Роль обязательна'
                    ]"
                />
            </q-card-section>
            <q-separator/>
            <q-card-actions>
                <q-btn to="/admin/users" unelevated>Отменить</q-btn>
                <q-space/>
                <q-btn type="submit" unelevated color="primary">Сохранить</q-btn>
            </q-card-actions>
        </q-card>
    </q-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'UserForm',
  data () {
    return {
      userId: null,
      localUser: {},
      localErrors: [],
      localRoles: []
    }
  },
  validations: {
    localUser: {
      last_name: {
        required
      },
      first_name: {
        required
      },
      email: {
        required,
        email
      },
      phone: {
        required
      },
      role_id: {
        required
      }
    }
  },
  watch: {
    '$route.params.id': function (userId) {
      this.loadUser(userId)
    }
  },
  computed: {
    ...mapGetters({
      roles: 'auth/users/roles'
    })
  },
  methods: {
    ...mapActions({
      usersRoles: 'auth/users/roles',
      userShow: 'auth/users/show',
      userStore: 'auth/users/store',
      userUpdate: 'auth/users/update'
    }),
    loadUser (userId) {
      this.localUser = {}
      if (userId !== 'undefined') {
        this.userId = userId

        if (this.userId) {
          this.userShow(this.userId)
            .then(response => {
              this.localUser = response.data.data
            })
        }
      }
    },
    confirmForm () {
      if (this.userId) {
        this.userUpdate(this.localUser)
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
        this.userStore(this.localUser)
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
  created () {
    this.loadUser(this.$route.params.id)
    this.usersRoles()
      .then(response => {
        this.localRoles = response.data.data
      })
  }
}
</script>

<style scoped>
    .fade-enter {
        opacity: 0;
    }

    .fade-enter-active {
        transition: opacity .3s ease;
    }

    .fade-leave {}

    .fade-leave-active {
        transition: opacity .3s ease;
        opacity: 0;
    }
</style>
