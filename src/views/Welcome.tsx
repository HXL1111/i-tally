import { defineComponent, PropType } from 'vue'
import { RouterView } from 'vue-router'

export const Welcome = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => (
      <div>
        <RouterView />
      </div>
    )
  },
})
