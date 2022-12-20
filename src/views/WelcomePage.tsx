import { Icon } from '@/shared/Icon'
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
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
          <RouterView />
        </main>
      </div>
    )
  },
})
