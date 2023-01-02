import { FormItem } from '@/shared/Form'
import { defineComponent, PropType, ref } from 'vue'
import s from './Charts.module.scss'
export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true,
    },
    endDate: {
      type: String as PropType<string>,
      required: true,
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
      </div>
    )
  },
})
