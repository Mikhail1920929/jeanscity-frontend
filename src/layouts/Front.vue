<template>
  <q-layout view="hHh lpR fff">
    <front-header/>
    <front-footer/>
    <router-view/>
  </q-layout>
</template>

<script>
import FrontHeader from '../components/front/Header'
import FrontFooter from '../components/front/Footer'

export default {
  name: 'LayoutFront',
  components: {
    FrontHeader,
    FrontFooter
  }
}
</script>
