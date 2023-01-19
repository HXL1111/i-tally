import { FormItem } from '@/shared/Form'
import { http } from '@/shared/Http'
import { Time } from '@/shared/time'
import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { Bars } from './Bars'
import s from './Charts.module.scss'
import { LineChart } from './LineChart'
import { PieChart } from './PieChart'
type Data1Item = { happen_at: string; amount: number }
type Data2Item = { tag_id: string; tag: Tag; amount: number }
type Data1 = Data1Item[]
type Data2 = Data2Item[]
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
    const refKind = ref('expenses')
    watch(
      () => refKind.value,
      () => {}
    )
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
        const time = new Time(props.startDate + 'T00:00:00.000Z').add(i, 'day').getTimestamp()
        if (data1.value[data1Index] && new Date(data1.value[data1Index].happen_at).getTime() === time) {
          array.push([new Date(time).toISOString(), data1.value[data1Index].amount])
          data1Index += 1
        } else {
          array.push([new Date(time).toISOString(), 0])
        }
      }
      return array as [string, number][]
    })
    const fetchData1 = async () => {
      const response = await http.get<{ groups: Data1 }>('/items/summary', {
        happen_after: props.startDate!,
        happen_before: props.endDate!,
        kind: refKind.value,
        group_by: 'happen_at',
        _mock: 'itemSummary',
      })
      data1.value = response.data.groups
    }
    onMounted(fetchData1)
    watch(() => refKind.value, fetchData1)
    const data2 = ref<Data2>([])
    const betterData2 = computed<{ name: string; value: number }[]>(() =>
      data2.value.map((item) => ({
        name: item.tag.name,
        value: item.amount,
      }))
    )
    const fetchData2 = async () => {
      const response = await http.get<{ groups: Data2 }>(
        '/items/summary',
        {
          happen_after: props.startDate!,
          happen_before: props.endDate!,
          kind: refKind.value,
          group_by: 'tag_id',
          _mock: 'itemSummary',
        },
        { _autoLoading: true }
      )
      data2.value = response.data.groups
    }
    onMounted(fetchData2)
    watch(() => refKind.value, fetchData2)
    const betterData3 = computed<{ tag: Tag; amount: number; percent: number }[]>(() => {
      const total = data2.value.reduce((sum, item) => sum + item.amount, 0)
      return data2.value.map((item) => ({
        ...item,
        percent: Math.round((item.amount / total) * 100),
      }))
    })
    return () => (
      <div class={s.charts}>
        <FormItem
          label="类型"
          type="select"
          options={[
            { value: 'expenses', text: '支出' },
            { value: 'income', text: '收入' },
          ]}
          v-model={refKind.value}
          direction="row"
        />
        <LineChart data={betterData1.value} />
        <PieChart data={betterData2.value} />
        <Bars data={betterData3.value} />
      </div>
    )
  },
})
