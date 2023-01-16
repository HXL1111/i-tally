import { FormItem } from '@/shared/Form'
import { defineComponent, onMounted, PropType, ref } from 'vue'
import { Bars } from './Bars'
import s from './Charts.module.scss'
import { LineChart } from './LineChart'

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
        <LineChart />
        <Bars />
      </div>
    )
  },
})
