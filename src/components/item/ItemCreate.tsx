import { NavBarLayout } from '@/layouts/NavBarLayout'
import { http } from '@/shared/Http'
import { Icon } from '@/shared/Icon'
import { Tabs, Tab } from '@/shared/Tabs'
import { defineComponent, onMounted, PropType, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { InputPad } from './InputPad'
import s from './ItemCreate.module.scss'
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refKind = ref('支出')
    onMounted(async () => {
      const response = await http.get<{ resources: Tag[] }>('/tags', {
        kind: 'expense',
        _mock: 'tagIndex',
      })
      refExpenseTags.value = response.data.resources
      console.log(refExpenseTags.value)
    })
    const refExpenseTags = ref<Tag[]>([])
    onMounted(async () => {
      const response = await http.get<{ resources: Tag[] }>('/tags', {
        kind: 'income',
        _mock: 'tagIndex',
      })
      refIncomeTags.value = response.data.resources
      console.log(refIncomeTags.value)
    })
    const refIncomeTags = ref<Tag[]>([])
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
                <Tabs v-model:selected={refKind.value} class={s.tabs}>
                  <Tab name="支出" class={s.tab}>
                    <ol>
                      <li>
                        <RouterLink to="/tag/create" class={s.icon_wrapper}>
                          <Icon name="add" class={s.icon} />
                        </RouterLink>
                        <span>新增</span>
                      </li>
                      {refExpenseTags.value.map((item) => (
                        <li>
                          <div class={s.icon_wrapper}>
                            <Icon name={item.sign} class={s.icon} />
                          </div>
                          <span>{item.name}</span>
                        </li>
                      ))}
                    </ol>
                  </Tab>
                  <Tab name="收入" class={s.tab}>
                    <ol>
                      <li>
                        <RouterLink to="/tag/create" class={s.icon_wrapper}>
                          <Icon name="add" class={s.icon} />
                        </RouterLink>
                        <span>新增</span>
                      </li>
                      {refIncomeTags.value.map((item) => (
                        <li>
                          <div class={s.icon_wrapper}>
                            <Icon name={item.sign} class={s.icon} />
                          </div>
                          <span>{item.name}</span>
                        </li>
                      ))}
                    </ol>
                  </Tab>
                </Tabs>
                <InputPad />
              </div>
            ),
          }}
        </NavBarLayout>
      </>
    )
  },
})
