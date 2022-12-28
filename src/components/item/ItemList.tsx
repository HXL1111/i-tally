import { NavBarLayout } from '@/layouts/NavBarLayout'
import { FloatButton } from '@/shared/FloatButton'
import { MenuOverlay } from '@/shared/MenuOverlay'
import { Form, Overlay } from 'vant'
import { Tabs, Tab } from '@/shared/Tabs'
import { Time } from '@/shared/time'
import { defineComponent, PropType, reactive, ref, watchEffect } from 'vue'
import { RouterLink } from 'vue-router'
import s from './ItemList.module.scss'
import { ItemSummary } from './ItemSummary'
import { FormItem } from '@/shared/Form'
const timeMap = [
  {
    name: '本月',
    timeList: {
      start: new Time().firstDayOfMonth().format(),
      end: new Time().lastDayOfMonth().format(),
    },
  },
  {
    name: '上个月',
    timeList: {
      start: new Time().add(-1, 'month').firstDayOfMonth().format(),
      end: new Time().add(-1, 'month').lastDayOfMonth().format(),
    },
  },
  {
    name: '今年',
    timeList: {
      start: new Time().firstDayOfYear().format(),
      end: new Time().lastDayOfYear().format(),
    },
  },
]
export const ItemList = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refKind = ref('本月')
    const refMenuOverlayVisible = ref(false)
    const overlayOnClick = () => {
      refMenuOverlayVisible.value = !refMenuOverlayVisible.value
    }
    const refDateOverlayVisible = ref(false)
    watchEffect(() => {
      if (refKind.value === '自定义时间') {
        refDateOverlayVisible.value = true
      }
    })
    const customTime = reactive({
      start: new Time().format(),
      end: new Time().format(),
    })
    return () => (
      <div class={s.wrapper}>
        <NavBarLayout iconName="menu" title="i 记账" onClick={overlayOnClick}>
          {{
            default: () => (
              <>
                <Tabs v-model:selected={refKind.value} class={s.tabs}>
                  <Tab name={timeMap[0].name} class={s.tab}>
                    <ItemSummary
                      startDate={timeMap[0].timeList.start}
                      endDate={timeMap[0].timeList.end}
                    />
                  </Tab>
                  <Tab name={timeMap[1].name}>
                    <ItemSummary
                      startDate={timeMap[1].timeList.start}
                      endDate={timeMap[1].timeList.end}
                    />
                  </Tab>
                  <Tab name={timeMap[2].name}>
                    <ItemSummary
                      startDate={timeMap[2].timeList.start}
                      endDate={timeMap[2].timeList.end}
                    />
                  </Tab>
                  <Tab name="自定义时间">
                    <ItemSummary
                      startDate={customTime.start}
                      endDate={customTime.end}
                    />
                  </Tab>
                </Tabs>
                <Overlay show={refDateOverlayVisible.value} class={s.overlay}>
                  <div class={s.overlay_inner}>
                    <header>请选择时间</header>
                    <main>
                      <Form class={s.form}>
                        <FormItem
                          type="date"
                          label="开始时间"
                          v-model={customTime.start}
                        />
                        <FormItem
                          type="date"
                          label="结束时间"
                          v-model={customTime.end}
                        />
                        <div class={s.actions}>
                          <button type="button">取消</button>
                          <button type="submit">确定</button>
                        </div>
                      </Form>
                    </main>
                  </div>
                </Overlay>
                {/* <div class={s.center}>
                  <Icon name="bill" class={s.icon} />
                  <span>暂无数据</span>
                </div>
                <RouterLink to="/item/create">
                  <div class={s.button_wrapper}>
                    <Button>开始记账</Button>
                  </div>
                </RouterLink> */}
                <RouterLink to="/item/create">
                  <FloatButton />
                </RouterLink>
                {refMenuOverlayVisible.value && (
                  <MenuOverlay
                    onClose={() => {
                      refMenuOverlayVisible.value = false
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
