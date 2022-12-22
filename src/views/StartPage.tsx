import { NavBarLayout } from '@/layouts/NavBarLayout'
import { Button } from '@/shared/Button'
import { FloatButton } from '@/shared/FloatButton'
import { Tabs, Tab } from '@/shared/Tabs'
import { defineComponent, PropType, ref } from 'vue'
import s from './StartPage.module.scss'
export const StartPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refKind = ref('本月')
    return () => (
      <div class={s.wrapper}>
        <NavBarLayout iconName="menu" title="i 记账">
          {{
            default: () => (
              <>
                <Tabs v-model:selected={refKind.value}>
                  <Tab name="本月"></Tab>
                  <Tab name="上个月"></Tab>
                  <Tab name="今年"></Tab>
                  <Tab name="自定义时间"></Tab>
                </Tabs>
                <Button>开始记账</Button>
              </>
            ),
          }}
        </NavBarLayout>
        <FloatButton />
      </div>
    )
  },
})
