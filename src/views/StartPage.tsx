import { NavBarLayout } from '@/Layouts/NavBarLayout'
import { Icon } from '@/shared/Icon'
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
        <NavBarLayout iconName="menu" title="i 记账">
          {{ default: () => <div>main</div> }}
        </NavBarLayout>
      </div>
    )
  },
})
