export const front = [
  {
    path: '/',
    component: () => import('layouts/Front.vue'),
    meta: {
      label: 'Главная'
    },
    children: [
      {
        path: '',
        name: 'front.home',
        component: () => import('pages/Home.vue')
      },
      {
        path: 'products',
        component: () => import('pages/Products.vue'),
        children: [
          {
            path: 'product/:slug',
            component: () => import('pages/Product.vue'),
            name: 'front.product'
          },
          {
            path: ':parent?',
            name: 'front.catalog',
            component: () => import('pages/Catalog.vue')
          }
        ]
      },
      {
        path: 'cart',
        name: 'front.cart',
        component: () => import('pages/Cart.vue')
      },
      {
        path: '/contacts',
        name: 'front.contacts',
        component: () => import('pages/Contacts.vue')
      },
      {
        path: ':slug',
        name: 'front.page',
        component: () => import('pages/Page.vue')
      }
    ]
  }
]
