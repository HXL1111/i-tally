import { routes } from './config/routes';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { App } from './App'
import { createRouter } from 'vue-router'
import { history } from './shared/history';
import '@svgstore';
import '@/assets/stylesheet/reset.scss'
import '@/assets/stylesheet/vars.scss'
import 'vant/lib/index.css';
import { useMeStore } from './stores/useMeStore';
const router = createRouter({ history, routes })
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')

const meStore = useMeStore()
meStore.fetchMe()

const whiteList: Record<string, 'exact' | 'startsWith'> = {
  '/': 'exact',
  '/item': 'exact',
  '/welcome': 'startsWith',
  '/sign_in': 'startsWith',
}

router.beforeEach((to, from) => {
  for (const key in whiteList) {
    const value = whiteList[key]
    if (value === 'exact' && to.path === key) {
      return true
    }
    if (value === 'startsWith' && to.path.startsWith(key)) {
      return true
    }
  }
  return meStore.mePromise!.then(
    () => true,
    () => '/sign_in?return_to=' + to.path
  )
})

