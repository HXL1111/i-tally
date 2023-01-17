import { NavBarLayout } from '@/layouts/NavBarLayout'
import { defineComponent, PropType } from 'vue'

import s from './ComingSoon.module.scss'
import { Icon } from './Icon'
export const ComingSoon = defineComponent({
  props: {
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup: (props, context) => {
    return () => (
      <NavBarLayout iconName="left" title={props.title}>
        <div class={s.center}>
          <Icon name="building" class={s.icon} />
          <span>功能尚未开发，敬请期待哦~</span>
        </div>
      </NavBarLayout>
    )
  },
})
