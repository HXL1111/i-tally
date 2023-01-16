import { FormItem } from '@/shared/Form'
import { http } from '@/shared/Http'
import { Time } from '@/shared/time'
import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
import { Bars } from './Bars'
import s from './Charts.module.scss'
import { LineChart } from './LineChart'
type Data1Item = { happen_at: string; amount: number }
type Data1 = Data1Item[]
const DAY = 24 * 3600 * 1000
export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
    },
    endDate: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refKind = ref('expense')
    const data1 = ref<Data1>([])
    const betterData1 = computed<[string, number][]>(() => {
      if (!props.startDate || !props.endDate) {
        return []
      }
      const array = []
      const diff = new Date(props.endDate).getTime() - new Date(props.startDate).getTime()
      const n = diff / DAY + 1
      let data1Index = 0
      for (let i = 0; i < n; i++) {
        const time = new Time(props.startDate + 'T00:00:00.000+0800').add(i, 'day').getTimestamp()
        if (data1.value[data1Index] && new Date(data1.value[data1Index].happen_at).getTime() === time) {
          array.push([new Date(time).toISOString(), data1.value[data1Index].amount])
          data1Index += 1
        } else {
          array.push([new Date(time).toISOString(), 0])
        }
      }
      return array as [string, number][]
    })
    onMounted(async () => {
      const response = await http.get<{ groups: Data1; summary: number }>('/items/summary', {
        happen_after: props.startDate!,
        happen_before: props.endDate!,
        kind: refKind.value,
        _mock: 'itemSummary',
      })
      data1.value = response.data.groups
    })
    return () => (
      <div class={s.charts}>
        <FormItem
          label="类型"
          type="select"
          options={[
            { value: 'expense', text: '支出' },
            { value: 'income', text: '收入' },
          ]}
          v-model={refKind.value}
          direction="row"
        />
        <LineChart data={betterData1.value} />
        <Bars />
      </div>
    )
  },
})
