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
          <RouterView name="main" />
        </main>
        <footer>
          <RouterView name="footer" />
        </footer>
      </div>
    )
  },
})
