<template>
  <q-layout view="lhh lpR lFf" class="bg-blue-grey-1">

    <q-header class="bg-blue-grey-2 text-black q-pl-lg q-pr-lg">
      <q-toolbar class="q-gutter-lg">
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-breadcrumbs active-color="blue-10">
          <q-breadcrumbs-el :to="breadcrumb.path" v-for="breadcrumb in breadcrumbs" :key="breadcrumb.path" :label="breadcrumb.meta.label" />
        </q-breadcrumbs>
        <q-space/>
        <!--                <q-btn @click="help = true" flat color="grey-8" dark icon="help" label="Помощь"/>-->
      </q-toolbar>
    </q-header>

    <admin-menu :drawer="left"/>

    <q-page-container>
      <q-page>
        <!-- This is where pages get injected -->
        <router-view />
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
import AdminMenu from '../components/admin/Menu'

export default {
  name: 'LayoutAdmin',
  components: {
    AdminMenu
  },
  data () {
    return {
      left: true
    }
  },
  computed: {
    breadcrumbs () {
      return this.$route.matched
    }
  }
}
</script>
