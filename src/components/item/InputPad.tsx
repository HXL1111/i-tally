import { Icon } from '@/shared/Icon'
import { defineComponent, PropType, ref } from 'vue'
import s from './InputPad.module.scss'
import { DatePicker, Popup } from 'vant'
import 'vant/es/picker/style'
import 'vant/es/popup/style'
import { Time } from '@/shared/time'

export const InputPad = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const appendText = (n: string) => {
      if (refAmount.value.length >= 13) {
        return
      }
      if (refAmount.value === '0' && n !== '.') {
        refAmount.value = n
      } else if (refAmount.value.indexOf('.') >= 0 && n === '.') {
        return
      } else {
        refAmount.value += n
      }
    }
    const remove = () => {
      if (refAmount.value.length === 1) {
        refAmount.value = '0'
      } else {
        refAmount.value = refAmount.value.slice(0, -1)
      }
    }
    const buttons = [
      {
        text: '1',
        onClick: () => {
          appendText('1')
        },
      },
      {
        text: '2',
        onClick: () => {
          appendText('2')
        },
      },
      {
        text: '3',
        onClick: () => {
          appendText('3')
        },
      },
      {
        text: <Icon name="delete" class={s.delete} />,
        onClick: () => {
          remove()
        },
      },
      {
        text: '4',
        onClick: () => {
          appendText('4')
        },
      },
      {
        text: '5',
        onClick: () => {
          appendText('5')
        },
      },
      {
        text: '6',
        onClick: () => {
          appendText('6')
        },
      },
      {
        text: '清空',
        onClick: () => {
          refAmount.value = '0'
        },
      },
      {
        text: '7',
        onClick: () => {
          appendText('7')
        },
      },
      {
        text: '8',
        onClick: () => {
          appendText('8')
        },
      },
      {
        text: '9',
        onClick: () => {
          appendText('9')
        },
      },
      { text: '完成', onClick: () => {} },
      {
        text: '0',
        onClick: () => {
          appendText('0')
        },
      },
      {
        text: '.',
        onClick: () => {
          appendText('.')
        },
      },
    ]
    const refAmount = ref('0')
    const notes = ref('')
    let now = new Date()
    const refCurrentDate = ref([
      new Time(now).format('YYYY'),
      new Time(now).format('MM'),
      new Time(now).format('DD'),
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
          <div class={s.amount}>￥{refAmount.value}</div>
          <div class={s.dateAndNotes}>
            <div
              class={s.date}
              onClick={() => {
                showDatePicker()
              }}
            >
              <Icon name="date" class={s.icon} />
              <span>
                {new Time(new Date(String(refCurrentDate.value))).format()}
              </span>
            </div>
            <Popup
              v-model:show={refDatePickerVisible.value}
              position="bottom"
              close-on-click-overlay={false}
            >
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
