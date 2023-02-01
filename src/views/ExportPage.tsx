import { ComingSoon } from '@/shared/ComingSoon'
import { defineComponent, PropType } from 'vue'
export const ExportPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => <ComingSoon title="导出数据" />
  },
})
export default ExportPage
