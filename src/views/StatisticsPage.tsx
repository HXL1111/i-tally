import { Charts } from '@/components/statistics/Charts'
import { TimeTabsLayout } from '@/layouts/TimeTabsLayout'
import { defineComponent, PropType } from 'vue'
export const StatisticsPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => (
      <TimeTabsLayout component={Charts} iconName="left" title="统计图表" />
    )
  },
})
