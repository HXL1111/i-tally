import { DatePicker, Popup } from 'vant'
import { computed, defineComponent, PropType, ref } from 'vue'
import { Button } from './Button'
import s from './Form.module.scss'
import { LogoSelect } from './LogoSelect'
import { Time } from './time'

export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>,
    },
  },
  setup: (props, context) => {
    return () => (
      <form class={s.form} onSubmit={props.onSubmit}>
        {context.slots.default?.()}
      </form>
    )
  },
})

export const FormItem = defineComponent({
  props: {
    label: {
      type: String,
    },
    type: {
      type: String as PropType<
        'text' | 'logoList' | 'date' | 'validationCode' | 'select'
      >,
    },
    placeholder: {
      type: String,
    },
    modelValue: {
      type: String,
    },
    error: {
      type: String,
    },
    options: {
      type: Array as PropType<Array<{ value: string; text: string }>>,
    },
    direction: {
      type: String as PropType<'row' | 'column'>,
    },
    onClick: {
      type: Function as PropType<() => void>,
    },
  },
  emits: ['update:modelValue'],
  setup: (props, context) => {
    const refDateVisible = ref(false)
    const content = computed(() => {
      switch (props.type) {
        case 'text':
          return (
            <input
              type="text"
              placeholder={props.placeholder}
              value={props.modelValue}
              onInput={(e: any) => {
                context.emit('update:modelValue', e.target.value)
              }}
              class={s.textInput}
            />
          )
        case 'logoList':
          return (
            <LogoSelect
              modelValue={props.modelValue}
              onUpdateModelValue={(value) =>
                context.emit('update:modelValue', value)
              }
            />
          )
        case 'date':
          return (
            <>
              <input
                readonly={true}
                value={props.modelValue}
                onClick={() => {
                  refDateVisible.value = true
                }}
                class={s.dateInput}
              />
              <Popup
                position="bottom"
                v-model:show={refDateVisible.value}
                close-on-click-overlay={false}
              >
                <DatePicker
                  modelValue={props.modelValue?.split('-')}
                  title="选择年月日"
                  onConfirm={(date: any) => {
                    context.emit(
                      'update:modelValue',
                      new Time(new Date(date.selectedValues)).format()
                    )
                    refDateVisible.value = false
                  }}
                  onCancel={() => (refDateVisible.value = false)}
                />
              </Popup>
            </>
          )
        case 'validationCode':
          return (
            <div class={s.signInput_wrapper}>
              <input class={s.signInput} placeholder={props.placeholder} />
              <Button onClick={props.onClick} class={s.button}>
                发送验证码
              </Button>
            </div>
          )
        case 'select':
          return (
            <select
              class={s.select}
              value={props.modelValue}
              onChange={(e: any) => {
                context.emit('update:modelValue', e.target.value)
              }}
            >
              {props.options?.map((option) => (
                <option value={option.value} class={s.option}>
                  {option.text}
                </option>
              ))}
            </select>
          )
      }
    })
    return () => (
      <label class={props.direction && s.row}>
        <div class={s.text}>
          <span>{props.label}</span>
          {props.error && <span class={s.error}>{props.error}</span>}
        </div>
        {content.value}
      </label>
    )
  },
})
