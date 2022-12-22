import { Icon } from '@/shared/Icon'
import { NavBar } from '@/shared/NavBar'
import { defineComponent, PropType } from 'vue'
import s from './NavBarLayout.module.scss'
export const NavBarLayout = defineComponent({
  props: {
    iconName: {
      type: String as PropType<string>,
      required: true,
    },
    title: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const { slots } = context
    return () => (
      <div class={s.wrapper}>
        <NavBar>
          {{
            icon: () => <Icon name={props.iconName} class={s.icon} />,
            title: () => <span class={s.title}>{props.title}</span>,
          }}
        </NavBar>
        {slots.default?.()}
      </div>
    )
  },
})
