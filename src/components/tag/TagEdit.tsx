import { Button } from '@/shared/Button'
import { defineComponent, PropType } from 'vue'
import { TagForm } from './TagForm'
import s from './Tag.module.scss'
export const TagEdit = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => (
      <TagForm>
        <Button class={[s.button, s.danger]}>删除标签</Button>
      </TagForm>
    )
  },
})
