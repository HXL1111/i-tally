import { FormItem } from '@/shared/Form'
import { http } from '@/shared/Http'
import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
import { Bars } from './Bars'
import s from './Charts.module.scss'
import { LineChart } from './LineChart'
type Data1Item = { happen_at: string; amount: number }
type Data1 = Data1Item[]
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
    const batterData1 = computed(() => data1.value.map((item) => [item.happen_at, item.amount] as [string, number]))
    onMounted(async () => {
      const response = await http.get<{ groups: Data1; summary: number }>('/items/summary', {
        happen_after: props.startDate!,
        happen_before: props.endDate!,
        kind: refKind.value,
        _mock: 'itemSummary',
      })
      console.log('response.data')
      console.log(response.data)
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
        <LineChart data={batterData1.value} />
        <Bars />
      </div>
    )
  },
})
