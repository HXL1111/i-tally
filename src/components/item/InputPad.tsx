import { Icon } from '@/shared/Icon'
import { defineComponent, PropType, ref } from 'vue'
import s from './InputPad.module.scss'
import { DatePicker, Popup } from 'vant'
import 'vant/es/picker/style'
import 'vant/es/popup/style'
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
    const now = new Date()
    const currentDate = ref(['2021', '01', '01'])
    const datePickerVisible = ref(false)
    return () => (
      <div class={s.inputPad}>
        <div class={s.amountDateAndNotes}>
          <div class={s.amount}>￥ 100</div>
          <div class={s.dateAndNotes}>
            <div
              class={s.date}
              onClick={() => (datePickerVisible.value = true)}
            >
              <Icon name="date" class={s.icon} />
              <span>{currentDate.value}</span>
            </div>
            <Popup v-model:show={datePickerVisible.value} position="bottom">
              <DatePicker modelValue={currentDate.value} title="选择日期" />
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
