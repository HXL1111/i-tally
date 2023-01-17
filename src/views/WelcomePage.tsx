import { useSwipe } from '@/hooks/useSwipe'
import { Icon } from '@/shared/Icon'
import { throttle } from '@/shared/throttle'
import { defineComponent, ref, Transition, VNode, watchEffect } from 'vue'
import { RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter } from 'vue-router'
import s from './WelcomePage.module.scss'
const pushMap: Record<string, string> = {
  Welcome1: '/welcome/2',
  Welcome2: '/welcome/3',
  Welcome3: '/welcome/4',
  Welcome4: '/item',
}
export const WelcomePage = defineComponent({
  setup: (props, context) => {
    const main = ref<HTMLElement>()
    const { direction, swiping } = useSwipe(main)
    const route = useRoute()
    const router = useRouter()
    const replace = throttle(() => {
      const name = (route.name || 'Welcome1').toString()
      router.replace(pushMap[name])
    }, 500)
    watchEffect(() => {
      if (swiping.value && direction.value === 'left') {
        replace()
      }
    })
    return () => (
      <div class={s.wrapper}>
        <header>
          <Icon name="wallet" class={s.icon} />
          <h1>i 记账</h1>
        </header>
        <main ref={main}>
          <RouterView name="main">
            {({ Component: X, route: R }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => (
              <Transition
                enterFromClass={s.slide_fade_enter_from}
                enterActiveClass={s.slide_fade_enter_active}
                leaveToClass={s.slide_fade_leave_to}
                leaveActiveClass={s.slide_fade_leave_active}
              >
                {X}
              </Transition>
            )}
          </RouterView>
        </main>
        <RouterView name="footer" />
      </div>
    )
  },
})
