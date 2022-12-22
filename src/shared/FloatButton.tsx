import { defineComponent, PropType } from 'vue'
import s from './FloatButton.module.scss'
import { Icon } from './Icon'
export const FloatButton = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => (
      <div class={s.floatButton} onClick={() => {}}>
        <Icon name="add" class={s.icon} />
      </div>
    )
  },
})
