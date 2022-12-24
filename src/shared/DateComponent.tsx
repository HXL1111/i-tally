import { defineComponent, PropType } from 'vue'
import s from './DateComponent.module.scss'
import { Icon } from './Icon'
export const DateComponent = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <Icon name="date" />
        <span>2022-11-30</span>
      </div>
    )
  },
})
