import { Button } from '@/shared/Button'
import { defineComponent } from 'vue'
import { TagForm } from './TagForm'
import s from './Tag.module.scss'
import { useRoute, useRouter } from 'vue-router'
import { http } from '@/shared/Http'
import { showConfirmDialog, showDialog } from 'vant'

export const TagEdit = defineComponent({
  setup: (props, context) => {
    const route = useRoute()
    const router = useRouter()
    const numberId = parseInt(route.params.id.toString())
    const onError = () => {
      showDialog({
        title: '提示',
        message: '删除失败',
      })
    }
    const onDelete = async () => {
      await showConfirmDialog({
        title: '确认',
        message: '确认要删除吗?',
      })
      await http.delete(`/tags/${numberId}`).catch(onError)
      router.back()
    }
    if (Number.isNaN(numberId)) {
      return () => <div>id 不存在</div>
    }
    return () => (
      <TagForm id={numberId}>
        <Button class={[s.button, s.danger]} onClick={onDelete}>
          删除标签
        </Button>
      </TagForm>
    )
  },
})
