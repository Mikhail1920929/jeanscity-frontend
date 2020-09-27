import AuthModule from './auth.module'
import UsersModule from './users.module'

export default {
  namespaced: true,
  ...AuthModule,
  modules: {
    users: {
      ...UsersModule
    }
  }
}
