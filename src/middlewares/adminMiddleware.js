function adminMiddleware (to, from, next, store) {
  let token = null

  // check token in localstorage
  if (localStorage.getItem('token') !== null) {
    token = localStorage.getItem('token')
  }

  // check token in vuex
  if (store.getters['auth/token'] !== null) {
    token = store.getters['auth/token']
  }

  to.matched.filter(async route => {
    if (to.matched[0].meta.auth === true && to.name === route.name) {
      if (token === null) {
        next('/login')
      }
      store.dispatch('auth/me')
        .then(response => {
          if (route.name !== 'admin.home') {
            if (!route.meta.access.includes(response.data.data.role.name)) {
              next('/admin')
            }
          }
          next()
        })
        .catch(errors => {
          localStorage.removeItem('token')
          next('/login')
        })
    }
  })

  next()
}

export { adminMiddleware }
