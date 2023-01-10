import { computed, defineComponent, PropType, ref } from 'vue'
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
    autoSelfDisabled: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props, context) => {
    const selfDisable = ref(false)
    const _disabled = computed(() => {
      if (props.autoSelfDisabled === false) {
        return props.disabled
      }
      if (selfDisable.value) {
        return true
      } else {
        return props.disabled
      }
    })
    const onClick = () => {
      props.onClick?.()
      selfDisable.value = true
      setTimeout(() => {
        selfDisable.value = false
      }, 1500)
    }
    return () => (
      <button
        disabled={_disabled.value}
        class={s.button}
        onClick={onClick}
        type={props.type}
      >
        {context.slots.default?.()}
      </button>
    )
  },
})
