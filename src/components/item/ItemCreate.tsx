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
    const formData = reactive({
      kind: '支出',
      tags_id: [],
      amount: 0,
      happen_at: new Date().toISOString(),
    })
    const onError = (error: AxiosError<ResourceError>) => {
      if (error.response?.status === 422) {
        showDialog({
          title: '出错',
          message: Object.values(error.response.data.error).join('\n'),
        })
      }
      throw error
    }
    const onSubmit = async () => {
      const response = await http
        .post<Resource<Item>>('/items', formData, {
          params: { _mock: 'itemCreate' },
        })
        .catch(onError)
      router.push('/item')
    }
    const router = useRouter()
    return () => (
      <>
        <NavBarLayout
          iconName="left"
          title="记一笔"
          onClick={() => router.back()}
        >
          {{
            default: () => (
              <div class={s.wrapper}>
                {JSON.stringify(formData)}
                <Tabs v-model:selected={formData.kind} class={s.tabs}>
                  <Tab name="支出" class={s.tab}>
                    <Tags
                      kind="expense"
                      v-model:selected={formData.tags_id[0]}
                    />
                  </Tab>
                  <Tab name="收入" class={s.tab}>
                    <Tags
                      kind="income"
                      v-model:selected={formData.tags_id[0]}
                    />
                  </Tab>
                </Tabs>
                <InputPad
                  v-model:amount={formData.amount}
                  v-model:happenAt={formData.happen_at}
                  onSubmit={onSubmit}
                />
              </div>
            ),
          }}
        </NavBarLayout>
      </>
    )
  },
})
