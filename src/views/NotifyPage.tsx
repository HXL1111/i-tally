import { ComingSoon } from '@/shared/ComingSoon'
import { defineComponent, PropType } from 'vue'
export const NotifyPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => <ComingSoon title="记账提醒" />
  },
})
export default NotifyPage
