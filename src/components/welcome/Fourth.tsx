import { defineComponent, PropType } from 'vue'
import s from './Welcome.module.scss'
export const Fourth = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => <div class={s.wrapper}>Fourth</div>
  },
})
