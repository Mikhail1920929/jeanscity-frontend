<template>
    <q-btn :to="{ name: 'front.cart' }" flat style="color: #3C3C3C" icon="shopping_cart" label="">
        <q-badge color="red" floating>{{ count }}</q-badge>
    </q-btn>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppCart',
  computed: {
    ...mapGetters({
      count: 'orders/orders/cart/count'
    })
  }
}
</script>

<style scoped>

</style>
