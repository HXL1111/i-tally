import { Icon } from '@/shared/Icon'
import { NavBar } from '@/shared/NavBar'
import { defineComponent, PropType } from 'vue'
import s from './NavBarLayout.module.scss'
import { useRoute, useRouter } from 'vue-router'
export const NavBarLayout = defineComponent({
  props: {
    iconName: {
      type: String as PropType<string>,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      required: true,
    },
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
  },
  setup: (props, context) => {
    const { slots } = context
    const route = useRoute()
    const router = useRouter()
    const onBackClick = () => {
      const { return_to } = route.query
      if (return_to) {
        router.push(return_to.toString())
      } else {
        router.back()
      }
    }
    return () => (
      <div class={s.wrapper}>
        <NavBar>
          {{
            icon: () => (
              <Icon
                onClick={props.onClick || onBackClick}
                name={props.iconName}
                class={s.icon}
              />
            ),
            title: () => <span class={s.title}>{props.title}</span>,
          }}
        </NavBar>
        {slots.default?.()}
      </div>
    )
  },
})
