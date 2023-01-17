import { getMoney } from '@/shared/Money'
import * as echarts from 'echarts'
import { defineComponent, onMounted, PropType, ref, watch } from 'vue'
import s from './PieChart.module.scss'
const echartsOption = {
  tooltip: {
    trigger: 'item',
    formatter: (x: { name: string; value: number; percent: number }) => {
      const { name, value, percent } = x
      return `${name}: ￥${getMoney(value)} 占比 ${percent}%`
    },
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '70%',
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
}
export const PieChart = defineComponent({
  props: {
    data: {
      type: Array as PropType<{ name: string; value: number }[]>,
    },
  },
  setup: (props, context) => {
    const refDiv = ref<HTMLDivElement>()
    let chart: echarts.ECharts | undefined = undefined
    watch(
      () => props.data,
      () => {
        chart?.setOption({
          series: [
            {
              data: props.data,
            },
          ],
        })
      }
    )
    onMounted(() => {
      if (refDiv.value === undefined) {
        return
      }
      chart = echarts.init(refDiv.value)
      chart.setOption(echartsOption)
    })
    return () => <div ref={refDiv} class={s.pieChart}></div>
  },
})
