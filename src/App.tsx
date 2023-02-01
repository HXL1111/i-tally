import { defineComponent, onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import './App.scss'

export const App = defineComponent({
  setup() {
    const displayApp = ref(true)
    onMounted(() => {
      const w = document.getElementById('page')?.clientWidth
      if (w && w > 500) {
        displayApp.value = false
      }
    })
    return () => (
      <div class="page" id="page">
        {displayApp.value ? (
          <RouterView />
        ) : (
          <div class="prompt">
            <span>为保证体验效果，请使用手机扫描下方二维码浏览本页面</span>
            <img src="/src/assets/images/qrcode.png" />
          </div>
        )}
      </div>
    )
  },
})
