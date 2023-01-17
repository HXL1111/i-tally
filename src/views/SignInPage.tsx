import { useBool } from '@/hooks/useBool'
import { NavBarLayout } from '@/layouts/NavBarLayout'
import { Button } from '@/shared/Button'
import { Form, FormItem } from '@/shared/Form'
import { http } from '@/shared/Http'
import { Icon } from '@/shared/Icon'
import { refreshMe } from '@/shared/me'
import { hasError, validate } from '@/shared/validate'
import { defineComponent, PropType, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import s from './SignInPage.module.scss'
export const SignInPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const formData = reactive({
      email: '',
      code: '',
    })
    const refValidationCode = ref<any>()
    const { ref: refDisabled, on: disabled, off: enabled } = useBool(false)
    const router = useRouter()
    const route = useRoute()
    const errors = reactive({
      email: [],
      code: [],
    })
    const onSubmit = async (e: Event) => {
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
      if (!hasError(errors)) {
        const response = await http.post<{ jwt: string }>('session', formData).catch(onSubmitError)
        localStorage.setItem('jwt', response.data.jwt)
        // router.push('/sign_in?return_to='+ encodeURIComponent(route.fullPath))
        // const returnTo = localStorage.getItem('returnTo')
        const returnTo = route.query.return_to?.toString()
        refreshMe()
        router.push(returnTo || '/')
      }
    }

    const onError = (error: any) => {
      if (error.response.status === 422) {
        Object.assign(errors, error.response.data.errors)
      }
      throw error
    }
    const onSubmitError = (error: any) => {
      if (error.response.status === 422) {
        Object.assign(errors, {
          email: [],
          code: error.response.data.errors.email,
        })
      }
      throw error
    }
    const onClickSendValidationCode = async () => {
      disabled()
      await http
        .post(
          'validation_codes',
          {
            email: formData.email,
          },
          { _autoLoading: true }
        )
        .catch(onError)
        .finally(enabled)
      // 成功
      refValidationCode.value.startCount()
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
              ref={refValidationCode}
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
