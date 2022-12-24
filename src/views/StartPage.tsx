import { NavBarLayout } from '@/layouts/NavBarLayout'
import { Button } from '@/shared/Button'
import { FloatButton } from '@/shared/FloatButton'
import { Icon } from '@/shared/Icon'
import { Overlay } from '@/shared/Overlay'
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
    const overlayVisible = ref(false)
    const buttonOnClick = () => {}
    const overlayOnClick = () => {
      overlayVisible.value = !overlayVisible.value
      console.log(overlayVisible.value)
    }
    return () => (
      <div class={s.wrapper}>
        <NavBarLayout iconName="menu" title="i 记账" onClick={overlayOnClick}>
          {{
            default: () => (
              <>
                <Tabs v-model:selected={refKind.value}>
                  <Tab name="本月"></Tab>
                  <Tab name="上个月"></Tab>
                  <Tab name="今年"></Tab>
                  <Tab name="自定义时间"></Tab>
                </Tabs>
                <div class={s.center}>
                  <Icon name="bill" class={s.icon} />
                  <span>暂无数据</span>
                </div>
                <Button onClick={buttonOnClick}>开始记账</Button>
                <FloatButton />
                {overlayVisible.value && (
                  <Overlay
                    onClose={() => {
                      overlayVisible.value = false
                    }}
                  />
                )}
              </>
            ),
          }}
        </NavBarLayout>
      </div>
    )
  },
})
