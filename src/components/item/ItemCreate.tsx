import { NavBarLayout } from '@/layouts/NavBarLayout'
import { http } from '@/shared/Http'
import { Tabs, Tab } from '@/shared/Tabs'
import { AxiosError } from 'axios'
import { showDialog } from 'vant'
import { defineComponent, PropType, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { InputPad } from './InputPad'
import s from './ItemCreate.module.scss'
import { Tags } from './Tags'
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const formData = reactive<Partial<Item>>({
      kind: 'expenses',
      tag_ids: [],
      amount: 0,
      happen_at: new Date().toISOString(),
    })
    const onError = (error: AxiosError<ResourceError>) => {
      if (error.response?.status === 422) {
        showDialog({
          title: '出错',
          message: Object.values(error.response.data.errors).join('\n'),
        })
      }
      throw error
    }
    const router = useRouter()
    const onSubmit = async () => {
      await http
        .post<Resource<Item>>('/items', formData, {
          _mock: 'itemCreate',
          _autoLoading: true,
        })
        .catch(onError)
      router.push('/item')
    }
    return () => (
      <>
        <NavBarLayout iconName="left" title="记一笔">
          {{
            default: () => (
              <div class={s.wrapper}>
                <Tabs v-model:selected={formData.kind} class={s.tabs}>
                  <Tab value="expenses" name="支出" class={s.tab}>
                    <Tags kind="expenses" v-model:selected={formData.tag_ids![0]} />
                  </Tab>
                  <Tab value="income" name="收入" class={s.tab}>
                    <Tags kind="income" v-model:selected={formData.tag_ids![0]} />
                  </Tab>
                </Tabs>
                <InputPad v-model:amount={formData.amount} v-model:happenAt={formData.happen_at} onSubmit={onSubmit} />
              </div>
            ),
          }}
        </NavBarLayout>
      </>
    )
  },
})
