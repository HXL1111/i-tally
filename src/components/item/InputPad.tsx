import { defineComponent, PropType } from 'vue'
import s from './InputPad.module.scss'
export const InputPad = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => <div class={s.wrapper}>InputPad</div>
  },
})
