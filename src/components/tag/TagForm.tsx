import { NavBarLayout } from '@/layouts/NavBarLayout'
import { Button } from '@/shared/Button'
import { Form, FormItem } from '@/shared/Form'
import { http } from '@/shared/Http'
import { onFormError } from '@/shared/onFormError'
import { hasError, Rules, validate } from '@/shared/validate'
import { defineComponent, onMounted, PropType, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import s from './Tag.module.scss'
export const TagForm = defineComponent({
  props: {
    id: Number,
  },
  setup: (props, context) => {
    const route = useRoute()
    const router = useRouter()
    const formData = reactive<Partial<Tag>>({
      id: undefined,
      kind: route.query.kind!.toString(),
      name: '',
      sign: '',
    })
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})
    const onSubmit = async (e: Event) => {
      e.preventDefault()
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
        name: [],
        sign: [],
      })
      Object.assign(errors, validate(formData, rules))
      if (!hasError(errors)) {
        const promise = (await formData.id)
          ? http.patch(`/tags/${formData.id}`, formData, {
              params: { _mock: 'tagEdit' },
            })
          : http.post('/tags', formData, {
              params: { _mock: 'tagCreate' },
            })
        await promise.catch((error) => {
          onFormError(error, (data) => Object.assign(errors, data.error))
        })
        router.back()
      }
    }
    onMounted(async () => {
      if (!props.id) {
        return
      }
      const response = await http.get<Resource<Tag>>(`/tags/${props.id}`, {
        _mock: 'tagShow',
      })
      Object.assign(formData, response.data.resource)
      console.log(response.data.resource)
    })
    return () => (
      <div class={s.wrapper}>
        <NavBarLayout iconName="left" title="新建标签">
          <Form onSubmit={onSubmit} class={s.form}>
            <FormItem
              label="标签名"
              type="text"
              placeholder="标签名称(不超过4个字符)"
              v-model={formData.name}
              error={errors.name?.[0]}
            />
            <FormItem
              label="符号"
              type="logoList"
              v-model={formData.sign}
              error={errors.sign?.[0]}
            />
            <p>记账时长按标签，即可进行编辑</p>
            <div class={s.buttons}>
              <Button type="submit" class={s.button}>
                确定
              </Button>
              {context.slots.default?.()}
            </div>
          </Form>
        </NavBarLayout>
      </div>
    )
  },
})
