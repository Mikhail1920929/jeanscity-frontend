<template>
    <q-layout class="bg-grey-2">
        <q-page-container>
            <q-page>
                <div class="row justify-center items-center" style="height: 100vh">
                    <div class="col-sm-6 col-xs-12 col-md-3">
                        <router-link to="/" class="logo-link"><img src="/statics/images/logo.svg" alt=""></router-link>
                        <q-form
                                @submit="loginRedirect"
                                ref="form"
                        >
                            <q-card>
                                <q-card-section>
                                    <q-input
                                            @input="$v.credentials.email.$touch(); errors = null"
                                            v-model.trim="credentials.email"
                                            label="Email"
                                            :rules="[
                                                val => $v.credentials.email.required || 'Email обязателен',
                                                val => $v.credentials.email.email || 'Неверный формат email'
                                            ]"
                                    />
                                    <q-input
                                            @input="$v.credentials.password.$touch()"
                                            v-model.trim="credentials.password"
                                            type="password"
                                            ref="password"
                                            label="Пароль"
                                            :rules="[
                                                val => $v.credentials.password.required || 'Пароль обязателен',
                                                val => $v.credentials.password.minLength || 'Минимальная длина пароля 8 символов'
                                            ]"
                                    />
                                    <q-checkbox
                                            v-model="credentials.remember"
                                            label="Запомнить"
                                    />
                                </q-card-section>
                                <q-card-actions>
                                    <q-space/>
                                    <q-btn
                                            unelevated
                                            type="submit"
                                            label="Войти"
                                            color="primary"
                                    />
                                </q-card-actions>
                            </q-card>
                        </q-form>
                    </div>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'AdminLogin',
  data () {
    return {
      errors: null,
      credentials: {
        remember: false
      }
    }
  },
  validations: {
    credentials: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      }
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    loginRedirect () {
      this.login(this.credentials)
        .then(response => {
          this.$router.push('/admin')
        })
        .catch(error => {
          this.$q.notify({
            message: error.response.data.message,
            color: 'negative',
            position: 'top'
          })
        })
    }
  }
}
</script>

<style scoped>
    .logo-link {
        width: 100%;
        display: inline-block;
        margin-bottom: 20px;
        text-align: center;
    }
</style>
