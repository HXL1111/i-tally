import { NavBarLayout } from '@/layouts/NavBarLayout'
import { http } from '@/shared/Http'
import { Icon } from '@/shared/Icon'
import { Tabs, Tab } from '@/shared/Tabs'
import { defineComponent, onMounted, PropType, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
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
    const refKind = ref('支出')
    const refTagId = ref<number>(0)
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
                    <Tags kind="expense" v-model:selected={refTagId.value} />
                  </Tab>
                  <Tab name="收入" class={s.tab}>
                    <Tags kind="income" v-model:selected={refTagId.value} />
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
