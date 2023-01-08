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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props, context) => {
    return () => (
      <button
        disabled={props.disabled}
        class={s.button}
        onClick={props.onClick}
        type={props.type}
      >
        {context.slots.default?.()}
      </button>
    )
  },
})
