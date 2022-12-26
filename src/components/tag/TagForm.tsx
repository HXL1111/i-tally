import { NavBarLayout } from '@/layouts/NavBarLayout'
import { Button } from '@/shared/Button'
import { LogoSelect } from '@/shared/LogoSelect'
import { Rules, validate } from '@/shared/validate'
import { defineComponent, PropType, reactive } from 'vue'
import s from './Tag.module.scss'
export const TagForm = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const formData = reactive({
      name: '',
      sign: '',
    })
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})
    const onSubmit = (e: Event) => {
      const rules: Rules<typeof formData> = [
        { key: 'name', type: 'required', message: '必填' },
        {
          key: 'name',
          type: 'pattern',
          regex: /^.{1,4}$/,
          message: '只能填 1 到 4 个字符',
        },
        {
          key: 'sign',
          type: 'required',
          message: '必填',
        },
      ]
      Object.assign(errors, {
        name: undefined,
        sign: undefined,
      })
      Object.assign(errors, validate(formData, rules))
      e.preventDefault()
      console.log(errors)
    }
    return () => (
      <div class={s.wrapper}>
        <NavBarLayout iconName="left" title="新建标签">
          <form class={s.form} onSubmit={onSubmit}>
            <label>
              <div class={s.text}>
                <span>标签名</span>
                <span class={s.error}>{errors.name}</span>
              </div>
              <input
                type="text"
                placeholder="标签名称(不超过4个字符)"
                v-model={formData.name}
              />
            </label>
            <label>
              <div class={s.text}>
                <span>符号</span>
                <span class={s.error}>{errors.sign}</span>
              </div>
              <LogoSelect v-model={formData.sign} />
            </label>
            <p>记账时长按标签，即可进行编辑</p>
            <div class={s.buttons}>
              <Button class={s.button}>确定</Button>
              {context.slots.default?.()}
            </div>
          </form>
        </NavBarLayout>
      </div>
    )
  },
})
