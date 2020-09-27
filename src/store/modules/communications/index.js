import Callbacks from './callbacks'
import MailsModule from './mails.module'

export default {
  namespaced: true,
  modules: {
    callbacks: {
      ...Callbacks
    },
    mails: {
      ...MailsModule
    }
  }
}
