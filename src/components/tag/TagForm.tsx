import { NavBarLayout } from '@/layouts/NavBarLayout'
import { Button } from '@/shared/Button'
import { Form, FormItem } from '@/shared/Form'
import { http } from '@/shared/Http'
import { onFormError } from '@/shared/onFormError'
import { hasError, Rules, validate } from '@/shared/validate'
import { defineComponent, onMounted, reactive, ref } from 'vue'
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
      kind: route.query.kind!.toString() as 'expenses' | 'income',
      name: '',
      sign: '',
    })
    const array = ref<string[]>([])
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
        { key: 'name', type: 'repeat', data: array.value, message: '标签名重复' },
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
              _autoLoading: true,
            })
          : http.post('/tags', formData, {
              params: { _mock: 'tagCreate', _autoLoading: true },
            })
        await promise.catch((error) => {
          onFormError(error, (data) => Object.assign(errors, data.errors))
        })
        router.back()
      }
    }
    onMounted(async () => {
      const response = await http.get<Resources<Tag>>('/tags')
      Object.assign(
        array.value,
        response.data.resources.map((item) => item.name)
      )
    })
    onMounted(async () => {
      if (!props.id) {
        return
      }
      const response = await http.get<Resource<Tag>>(
        `/tags/${props.id}`,
        {
          _mock: 'tagShow',
        },
        { _autoLoading: true }
      )
      Object.assign(formData, response.data.resource)
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
            <FormItem label="符号" type="logoList" v-model={formData.sign} error={errors.sign?.[0]} />
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
