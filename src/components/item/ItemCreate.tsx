import { NavBarLayout } from '@/layouts/NavBarLayout'
import { Icon } from '@/shared/Icon'
import { Tabs, Tab } from '@/shared/Tabs'
import { defineComponent, PropType, ref } from 'vue'
import { createRouter, useRouter } from 'vue-router'
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
    const refExpensesTags = ref([
      {
        id: 1,
        name: '餐费',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'expenses',
      },
      {
        id: 2,
        name: '打车',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'expenses',
      },
      {
        id: 3,
        name: '聚餐',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'expenses',
      },
      {
        id: 4,
        name: '打车',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'expenses',
      },
      {
        id: 5,
        name: '聚餐',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'expenses',
      },
      {
        id: 6,
        name: '打车',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'expenses',
      },
      {
        id: 7,
        name: '聚餐',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'expenses',
      },
    ])
    const refIncomeTags = ref([
      {
        id: 4,
        name: '工资',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 5,
        name: '彩票',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 6,
        name: '滴滴',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 11,
        name: '彩票',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 18,
        name: '滴滴',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 17,
        name: '彩票',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 19,
        name: '滴滴',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 4,
        name: '工资',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 5,
        name: '彩票',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 6,
        name: '滴滴',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 11,
        name: '彩票',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 18,
        name: '滴滴',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 17,
        name: '彩票',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 19,
        name: '滴滴',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 4,
        name: '工资',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 5,
        name: '彩票',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 6,
        name: '滴滴',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 11,
        name: '彩票',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 18,
        name: '滴滴',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 17,
        name: '彩票',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 19,
        name: '滴滴',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 4,
        name: '工资',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 5,
        name: '彩票',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 6,
        name: '滴滴',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 11,
        name: '彩票',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 18,
        name: '滴滴',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 17,
        name: '彩票',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 19,
        name: '滴滴',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 4,
        name: '工资',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 5,
        name: '彩票',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 6,
        name: '滴滴',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 11,
        name: '彩票',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 18,
        name: '滴滴',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 17,
        name: '彩票',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
      {
        id: 19,
        name: '滴滴',
        sign: <Icon name="caiWu1" class={s.icon} />,
        category: 'income',
      },
    ])
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
                        <div>
                          <Icon name="add" class={s.icon} />
                        </div>
                        <span>新增</span>
                      </li>
                      {refExpensesTags.value.map((item) => (
                        <li>
                          <div>{item.sign}</div>
                          <span>{item.name}</span>
                        </li>
                      ))}
                    </ol>
                  </Tab>
                  <Tab name="收入" class={s.tab}>
                    <ol>
                      <li>
                        <div>
                          <Icon name="add" class={s.icon} />
                        </div>
                        <span>新增</span>
                      </li>
                      {refIncomeTags.value.map((item) => (
                        <li>
                          <div>{item.sign}</div>
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
