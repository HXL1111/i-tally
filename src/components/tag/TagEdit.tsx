import { Button } from '@/shared/Button'
import { defineComponent, PropType } from 'vue'
import { TagForm } from './TagForm'
import s from './Tag.module.scss'
import { useRoute } from 'vue-router'
export const TagEdit = defineComponent({
  setup: (props, context) => {
    const route = useRoute()
    const numberId = parseInt(route.params.id.toString())
    if (Number.isNaN(numberId)) {
      return () => <div>id 不存在</div>
    }
    return () => (
      <TagForm id={numberId}>
        <Button class={[s.button, s.danger]}>删除标签</Button>
      </TagForm>
    )
  },
})
