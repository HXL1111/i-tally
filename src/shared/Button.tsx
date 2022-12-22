import { defineComponent, PropType } from 'vue'
import s from './Button.module.scss'
export const Button = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <button>{context.slots.default?.()}</button>
      </div>
    )
  },
})
