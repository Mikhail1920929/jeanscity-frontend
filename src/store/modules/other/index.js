import HomeslidesModule from './homeslides.module'
import MediaModule from './media.module'
import PagesModule from './pages.module'

export default {
  namespaced: true,
  modules: {
    homeslides: {
      ...HomeslidesModule
    },
    media: {
      ...MediaModule
    },
    pages: {
      ...PagesModule
    }
  }
}
