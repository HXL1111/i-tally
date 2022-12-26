import { NavBarLayout } from '@/layouts/NavBarLayout'
import { Button } from '@/shared/Button'
import { FloatButton } from '@/shared/FloatButton'
import { Icon } from '@/shared/Icon'
import { Overlay } from '@/shared/Overlay'
import { Tabs, Tab } from '@/shared/Tabs'
import { Time } from '@/shared/time'
import { defineComponent, PropType, ref } from 'vue'
import s from './ItemList.module.scss'
import { ItemSummary } from './ItemSummary'
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
  {
    name: '自定义时间',
    timeList: { start: new Time().format(), end: new Time().format() },
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
    const overlayVisible = ref(false)
    const overlayOnClick = () => {
      overlayVisible.value = !overlayVisible.value
    }
    console.log(new Time().firstDayOfMonth().format())
    return () => (
      <div class={s.wrapper}>
        <NavBarLayout iconName="menu" title="i 记账" onClick={overlayOnClick}>
          {{
            default: () => (
              <>
                <Tabs v-model:selected={refKind.value}>
                  <Tab name={timeMap[0].name}>
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
                  <Tab name={timeMap[3].name}>
                    <ItemSummary
                      startDate={timeMap[3].timeList.start}
                      endDate={timeMap[3].timeList.end}
                    />
                  </Tab>
                </Tabs>
                {/* <div class={s.center}>
                  <Icon name="bill" class={s.icon} />
                  <span>暂无数据</span>
                </div>
                <RouterLink to="/item/create">
                  <div class={s.button_wrapper}>
                    <Button>开始记账</Button>
                  </div>
                </RouterLink>
                <RouterLink to="/item/create">
                  <FloatButton />
                </RouterLink> */}
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
