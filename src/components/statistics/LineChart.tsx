import { defineComponent, onMounted, PropType, ref } from 'vue'
import s from './LineChart.module.scss'
import * as echarts from 'echarts'
export const LineChart = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refDiv = ref<HTMLDivElement>()
    onMounted(() => {
      if (refDiv.value === undefined) {
        return
      }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(refDiv.value)
      // 绘制图表
      myChart.setOption({
        grid: [{ left: 0, top: 0, right: 0, bottom: 20 }],
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(67,136,131,0.30)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(67,136,131,0.00)', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
        ],
      })
    })
    return () =>  <div ref={refDiv} class={s.lineChart}></div>
  },
})
