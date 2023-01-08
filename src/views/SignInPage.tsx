import { NavBarLayout } from '@/layouts/NavBarLayout'
import { Button } from '@/shared/Button'
import { Form, FormItem } from '@/shared/Form'
import { Icon } from '@/shared/Icon'
import { validate } from '@/shared/validate'
import axios from 'axios'
import { defineComponent, PropType, reactive } from 'vue'
import s from './SignInPage.module.scss'
export const SignInPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const formData = reactive({
      email: '2521556749@qq.com',
      code: '',
    })
    const errors = reactive({
      email: [],
      code: [],
    })
    const onSubmit = (e: Event) => {
      e.preventDefault()
      Object.assign(errors, {
        email: [],
        code: [],
      })
      Object.assign(
        errors,
        validate(formData, [
          { key: 'email', type: 'required', message: '必填' },
          {
            key: 'email',
            type: 'pattern',
            regex: /.+@.+/,
            message: '必须是邮箱地址',
          },
          { key: 'code', type: 'required', message: '必填' },
        ])
      )
    }
    const onClickSendValidationCode = async () => {
      const response = await axios.post('/api/v1/validation_codes', {
        email: formData.email,
      })
      console.log(response)
    }
    return () => (
      <NavBarLayout iconName="left" title="登录">
        <div class={s.main}>
          <div class={s.title}>
            <Icon name="wallet" class={s.icon} />
            <h1>i 记账</h1>
          </div>
          <Form onSubmit={onSubmit}>
            <FormItem
              label="邮箱地址"
              type="text"
              placeholder="请输入邮箱，然后点击发送验证码"
              v-model={formData.email}
              error={errors.email?.[0]}
            />
            <FormItem
              onClick={onClickSendValidationCode}
              label="验证码"
              type="validationCode"
              placeholder="6 位数字"
              v-model={formData.code}
              error={errors.code?.[0]}
            />
            <div class={s.button_wrapper}>
              <Button type="submit" class={s.button}>
                登录
              </Button>
            </div>
          </Form>
        </div>
      </NavBarLayout>
    )
  },
})
