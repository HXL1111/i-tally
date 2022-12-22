import { Icon } from '@/shared/Icon'
import { NavBar } from '@/shared/NavBar'
import { defineComponent, PropType } from 'vue'
import s from './StartPage.module.scss'
export const StartPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <NavBar>
          {{
            icon: () => <Icon name="menu" class={s.icon} />,
            title: () => <span class={s.title}>i 记账</span>,
          }}
        </NavBar>
      </div>
    )
  },
})
