import { NavBar } from '@/shared/NavBar'
import { defineComponent, PropType } from 'vue'
import s from './NavBarLayout.module.scss'
export const NavBarLayout = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const { slots } = context
    return () => (
      <div class={s.wrapper}>
        <NavBar>
          {{
            icon: () => slots.icon?.(),
            title: () => slots.title?.(),
          }}
        </NavBar>
        {slots.default?.()}
      </div>
    )
  },
})
