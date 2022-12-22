import { Icon } from '@/shared/Icon'
import { defineComponent, Transition, VNode } from 'vue'
import { RouteLocationNormalizedLoaded, RouterView } from 'vue-router'
import s from './WelcomePage.module.scss'

export const WelcomePage = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <header>
          <Icon name="wallet" class={s.icon} />
          <h1>山竹记账</h1>
        </header>
        <main>
          <RouterView name="main">
            {({
              Component: X,
              route: R,
            }: {
              Component: VNode
              route: RouteLocationNormalizedLoaded
            }) => (
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
