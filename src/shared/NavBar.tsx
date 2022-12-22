import { defineComponent, PropType } from 'vue'
import { Icon } from './Icon'
import s from './NavBar.module.scss'
export const NavBar = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const { slots } = context
    return () => (
      <div class={s.navBar}>
        {slots.icon?.()}
        {slots.title?.()}
      </div>
    )
  },
})
