import { defineComponent, PropType } from 'vue'
import { RouterView } from 'vue-router'

export const WelcomePage = defineComponent({
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
