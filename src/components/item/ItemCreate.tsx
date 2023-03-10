import { NavBarLayout } from '@/layouts/NavBarLayout'
import { http } from '@/shared/Http'
import { Tabs, Tab } from '@/shared/Tabs'
import { hasError, validate } from '@/shared/validate'
import { useTabsStore } from '@/stores/useTabsStore'
import { AxiosError } from 'axios'

import { showDialog } from 'vant'
import { defineComponent, onMounted, PropType, reactive, watch } from 'vue'
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
    const tabStore = useTabsStore()
    const formData = reactive<Partial<Item>>({
      kind: tabStore.typeTab,
      tag_ids: [],
      amount: 0,
      happen_at: new Date().toISOString(),
    })
    const errors = reactive<{ [K in keyof typeof formData]: string[] }>({
      kind: [],
      tag_ids: [],
      amount: [],
      happen_at: [],
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
    watch(
      () => formData.kind,
      () => {
        tabStore.typeTab = formData.kind
        tabStore.setTab('typeTab', tabStore.typeTab!.toString())
      }
    )
    onMounted(() => {
      tabStore.fetchTab('typeTab')
    })
    const router = useRouter()
    const onSubmit = async () => {
      Object.assign(errors, { kind: [], tag_ids: [], amount: [], happen_at: [] })
      Object.assign(
        errors,
        validate(formData, [
          { key: 'kind', type: 'required', message: '类型必填' },
          { key: 'tag_ids', type: 'required', message: '标签必填' },
          { key: 'amount', type: 'notEqual', value: 0, message: '金额不能为零' },
          { key: 'happen_at', type: 'required', message: '时间必填' },
        ])
      )
      if (hasError(errors)) {
        showDialog({
          title: '出错',
          message: Object.values(errors)
            .filter((i) => i.length > 0)
            .join('\n'),
        })
        return
      }
      await http
        .post<Resource<Item>>('/items', formData, {
          _mock: 'itemCreate',
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
