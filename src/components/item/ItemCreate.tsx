import { NavBarLayout } from '@/layouts/NavBarLayout'
import { Icon } from '@/shared/Icon'
import { Tabs, Tab } from '@/shared/Tabs'
import { defineComponent, PropType, ref } from 'vue'
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
    return () => (
      <div class={s.wrapper}>
        <NavBarLayout iconName="left" title="记一笔">
          {{
            default: () => (
              <div class={s.wrapper}>
                <Tabs v-model:selected={refKind.value} class={s.tabs}>
                  <Tab name="支出">
                    <ol>
                      <li>
                        <Icon name="add" />
                        <span>新增</span>
                      </li>
                      <li>
                        <Icon name="add" />
                        <span>新增</span>
                      </li>
                      <li>
                        <Icon name="add" />
                        <span>新增</span>
                      </li>
                      <li>
                        <Icon name="add" />
                        <span>新增</span>
                      </li>
                      <li>
                        <Icon name="add" />
                        <span>新增</span>
                      </li>
                      <li>
                        <Icon name="add" />
                        <span>新增</span>
                      </li>
                      <li>
                        <Icon name="add" />
                        <span>新增</span>
                      </li>
                      <li>
                        <Icon name="add" />
                        <span>新增</span>
                      </li>
                    </ol>
                  </Tab>
                  <Tab name="收入"></Tab>
                </Tabs>

                <InputPad />
              </div>
            ),
          }}
        </NavBarLayout>
      </div>
    )
  },
})
