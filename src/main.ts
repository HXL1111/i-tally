import { createApp } from 'vue'
import { App } from './App'
import { routes } from './config/routes'
import { createRouter } from 'vue-router';
import { history } from './shared/history';
import '@/assets/stylesheet/reset.scss'
import '@/assets/stylesheet/vars.scss'
import '@svgstore'
import 'vant/lib/index.css';
import { fetchMe, mePromise } from './shared/me';

const router = createRouter({
  history,
  routes,
})

fetchMe()

router.beforeEach(async (to, from) => {
  if (to.path === '/' || to.path.startsWith('/welcome') || to.path.startsWith('/sign_in') || to.path.startsWith('/item')) {
    return true
  } else {
    return mePromise!.then(() => true, () => {
      return 'sign_in?return_to=' + to.path
    })
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
