import { NavBarLayout } from '@/layouts/NavBarLayout'
import { Button } from '@/shared/Button'
import { Form, FormItem } from '@/shared/Form'
import { Icon } from '@/shared/Icon'
import { defineComponent, PropType } from 'vue'
import s from './SignInPage.module.scss'
export const SignInPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => (
      <NavBarLayout iconName="left" title="登录">
        <div class={s.main}>
          <div class={s.title}>
            <Icon name="wallet" class={s.icon} />
            <h1>i 记账</h1>
          </div>
          <Form>
            <FormItem
              label="邮箱地址"
              type="text"
              placeholder="请输入邮箱，然后点击发送验证码"
            />
            <FormItem
              label="验证码"
              type="validationCode"
              placeholder="6 位数字"
            />
            <div class={s.button_wrapper}>
              <Button class={s.button}>登录</Button>
            </div>
          </Form>
        </div>
      </NavBarLayout>
    )
  },
})
