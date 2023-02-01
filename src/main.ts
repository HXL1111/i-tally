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


if (document.documentElement.clientWidth > 500) {
  window.alert('为保证体验效果，请使用手机浏览本页面，点击确定请用手机扫描出现二维码')
  const img = document.createElement('img')
  img.src = '/src/assets/images/qrcode.png'
  img.style.position = 'fixed'
  img.style.left = '50%'
  img.style.top = '50%'
  img.style.transform = 'translate(-50%,-50%)'
  img.style.boxShadow = '0 0 10px rgba(0,0,0,0.25)'
  document.body.appendChild(img)
}