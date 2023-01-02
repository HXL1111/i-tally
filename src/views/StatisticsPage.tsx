import { NavBarLayout } from '@/layouts/NavBarLayout'
import { defineComponent, PropType } from 'vue'
import s from './StatisticsPage.module.scss'
export const StatisticsPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => <NavBarLayout iconName="left" title="统计图表"></NavBarLayout>
  },
})
