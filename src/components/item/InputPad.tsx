import { Icon } from '@/shared/Icon'
import { defineComponent, PropType, ref } from 'vue'
import s from './InputPad.module.scss'
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
    return () => (
      <div class={s.inputPad}>
        <div class={s.amountDateAndNotes}>
          <div class={s.amount}>￥ 100</div>
          <div class={s.dateAndNotes}>
            <div class={s.date}>
              <Icon name="date" class={s.icon} />
              <span>2022-11-30</span>
            </div>
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
