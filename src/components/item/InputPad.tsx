import { Icon } from '@/shared/Icon'
import { defineComponent, PropType, ref } from 'vue'
import s from './InputPad.module.scss'
import { DatePicker, Popup } from 'vant'
import 'vant/es/picker/style'
import 'vant/es/popup/style'
import { time } from '@/shared/time'
import { join } from 'path'
export const InputPad = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const buttons = [
      { text: '1', onClick: () => {} },
      { text: '2', onClick: () => {} },
      { text: '3', onClick: () => {} },
      { text: <Icon name="delete" class={s.delete} />, onClick: () => {} },
      { text: '4', onClick: () => {} },
      { text: '5', onClick: () => {} },
      { text: '6', onClick: () => {} },
      { text: '清空', onClick: () => {} },
      { text: '7', onClick: () => {} },
      { text: '8', onClick: () => {} },
      { text: '9', onClick: () => {} },
      { text: '完成', onClick: () => {} },
      { text: '0', onClick: () => {} },
      { text: '.', onClick: () => {} },
    ]
    const notes = ref('')
    let now = new Date()
    const refCurrentDate = ref([
      time(now).format('YYYY'),
      time(now).format('MM'),
      time(now).format('DD'),
    ])
    const refDatePickerVisible = ref(false)
    const showDatePicker = () => (refDatePickerVisible.value = true)
    const hideDatePicker = () => (refDatePickerVisible.value = false)
    const setDate = (date: any) => {
      refCurrentDate.value = date.selectedValues
      hideDatePicker()
    }
    return () => (
      <div class={s.inputPad}>
        <div class={s.amountDateAndNotes}>
          <div class={s.amount}>￥100</div>
          <div class={s.dateAndNotes}>
            <div
              class={s.date}
              onClick={() => {
                showDatePicker()
              }}
            >
              <Icon name="date" class={s.icon} />
              <span>
                {time(new Date(String(refCurrentDate.value))).format()}
              </span>
            </div>
            <Popup v-model:show={refDatePickerVisible.value} position="bottom">
              <DatePicker
                modelValue={refCurrentDate.value}
                title="选择日期"
                onConfirm={setDate}
                onCancel={hideDatePicker}
              />
            </Popup>
            <form class={s.notes}>
              <input
                type="text"
                placeholder="点击填写备注"
                v-model={notes.value}
              />
            </form>
          </div>
        </div>
        <div class={s.numberPad}>
          {buttons.map((button) => (
            <button onClick={button.onClick}>{button.text}</button>
          ))}
        </div>
      </div>
    )
  },
})
