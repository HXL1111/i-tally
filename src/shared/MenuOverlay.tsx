import { useMeStore } from '@/stores/useMeStore'
import { showConfirmDialog } from 'vant'
import { defineComponent, onMounted, PropType, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { Icon } from './Icon'

import s from './MenuOverlay.module.scss'
export const MenuOverlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
  },
  setup: (props, context) => {
    const meStore = useMeStore()
    const router = useRouter()
    const route = useRoute()
    const refMe = ref<User>()
    onMounted(async () => {
      const response = await meStore.mePromise
      refMe.value = response?.data.resource
    })
    const onSignOut = async () => {
      await showConfirmDialog({
        title: '确认',
        message: '确定要退出登录吗?',
      })
      localStorage.removeItem('jwt')
      router.go(0)
    }
    const onClickStatistics = () => {
      router.push('/statistics')
    }
    const onClickExport = () => {
      router.push('/export')
    }
    const onClickNotify = () => {
      router.push('/notify')
    }
    return () => (
      <>
        <div class={s.mask} onClick={props.onClose}></div>
        <div class={s.overlay}>
          <section>
            {refMe.value ? (
              <div>
                <h2 class={s.email}>{refMe.value.email}</h2>
                <p onClick={onSignOut}>点击这里退出登录</p>
              </div>
            ) : (
              <RouterLink to={`/sign_in?return_to=${route.fullPath}`}>
                <h2>未登录用户</h2>
                <p>点击这里登录</p>
              </RouterLink>
            )}
          </section>
          <ol>
            <li onClick={onClickStatistics}>
              <div class={s.left}>
                <Icon name="statistics" class={s.logo} />
                <span>统计图表</span>
              </div>
              <Icon name="right" class={s.right} />
            </li>
            <li onClick={onClickExport}>
              <div class={s.left}>
                <Icon name="export" class={s.logo} />
                <span>导出数据</span>
              </div>
              <Icon name="right" class={s.right} />
            </li>
            <li onClick={onClickNotify}>
              <div class={s.left}>
                <Icon name="clock" class={s.logo} />
                <span>记账提醒</span>
              </div>
              <Icon name="right" class={s.right} />
            </li>
          </ol>
        </div>
      </>
    )
  },
})
