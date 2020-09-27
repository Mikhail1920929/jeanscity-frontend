<template>
    <q-drawer
            v-model="drawer"
            side="left"
            bordered
    >
        <q-сard>
            <q-item v-if="auth">
                <q-item-section>
                    <q-item-label>{{ auth.full_name }}</q-item-label>
                    <q-item-label caption>{{ auth.role.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-btn @click="logoutRedirect" color="red" round flat icon="logout"/>
                </q-item-section>
            </q-item>
        </q-сard>
        <q-separator></q-separator>
        <q-list>
            <q-item clickable :to="{ name: 'front.home' }">
                <q-item-section>Магазин</q-item-section>
            </q-item>
            <template
                    v-for="item in menu.children"
            >
                <q-item
                        clickable
                        v-if="item.meta.access.includes(auth.role.name)"
                        :to="getPath(item)"
                        :key="item.name"
                >
                    <q-item-section>{{ item.meta.label }}</q-item-section>
                    <template v-if="item.children.length > 0">
                        <template v-if="item.children.find(child => child.path === 'new')">
                            <q-item-section side>
                                <q-btn
                                        unelevated
                                        color="primary"
                                        outline
                                        icon="add"
                                        size="sm"
                                        round
                                        :to="item.children.find(child => child.path === 'new')"
                                />
                            </q-item-section>
                        </template>
                    </template>
                </q-item>
            </template>
        </q-list>
    </q-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AdminMenu',
  data () {
    return {
      menu: {}
    }
  },
  props: {
    drawer: Boolean
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    }),
    logoutRedirect () {
      this.logout()
        .then(response => {
          this.$router.push('/login')
        })
    },
    getPath (item) {
      if (item.children.length === 0) {
        return item
      }

      return item.children.find(child => child.path === '/')
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth/authUser',
      callbacksUnanswered: 'communications/callbacks/unanswered',
      ordersOnHold: 'orders/orders/onhold'
    })
  },
  created () {
    this.menu = this.$router.options.routes.find(route => route.name === 'admin.home')
  }
}
</script>

<style scoped>

</style>
