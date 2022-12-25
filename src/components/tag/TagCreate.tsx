import { defineComponent, PropType } from 'vue'
import { TagForm } from './TagForm'
export const TagCreate = defineComponent({
  setup: (props, context) => {
    return () => <TagForm />
  },
})
