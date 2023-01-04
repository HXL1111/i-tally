import { defineComponent, PropType } from 'vue'
import s from './Button.module.scss'
export const Button = defineComponent({
  props: {
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
    type: {
      type: String as PropType<'submit' | 'button'>,
      default: 'button',
    },
  },
  setup: (props, context) => {
    return () => (
      <button class={s.button} onClick={props.onClick} type={props.type}>
        {context.slots.default?.()}
      </button>
    )
  },
})
