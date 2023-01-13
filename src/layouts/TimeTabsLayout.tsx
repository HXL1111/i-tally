import { NavBarLayout } from '@/layouts/NavBarLayout'
import { Overlay } from 'vant'
import { Tabs, Tab } from '@/shared/Tabs'
import { Time } from '@/shared/time'
import { defineComponent, PropType, reactive, ref } from 'vue'
import s from './TimeTabsLayout.module.scss'
import { Form, FormItem } from '@/shared/Form'
const demo = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true,
    },
    endDate: {
      type: String as PropType<string>,
      required: true,
    },
  },
})
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
export const TimeTabsLayout = defineComponent({
  props: {
    component: {
      type: Object as PropType<typeof demo>,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    iconName: {
      type: String,
      required: true,
    },
    iconOnClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
  },
  setup: (props, context) => {
    const refKind = ref('本月')
    const refDateOverlayVisible = ref(false)
    const onSelectTime = (name: string) => {
      if (name === '自定义时间') {
        refDateOverlayVisible.value = true
      }
    }
    const customTime = reactive({
      start: new Time().format(),
      end: new Time().format(),
    })
    return () => (
      <div class={s.wrapper}>
        <NavBarLayout
          iconName={props.iconName}
          title={props.title}
          onClick={props.iconOnClick}
        >
          {{
            default: () => (
              <>
                <Tabs
                  v-model:selected={refKind.value}
                  class={s.tabs}
                  onUpdate:selected={onSelectTime}
                >
                  <Tab name={timeMap[0].name} class={s.tab}>
                    <props.component
                      startDate={timeMap[0].timeList.start}
                      endDate={timeMap[0].timeList.end}
                    />
                  </Tab>
                  <Tab name={timeMap[1].name}>
                    <props.component
                      startDate={timeMap[1].timeList.start}
                      endDate={timeMap[1].timeList.end}
                    />
                  </Tab>
                  <Tab name={timeMap[2].name}>
                    <props.component
                      startDate={timeMap[2].timeList.start}
                      endDate={timeMap[2].timeList.end}
                    />
                  </Tab>
                  <Tab name="自定义时间">
                    <props.component
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
                          <button
                            type="button"
                            onClick={() =>
                              (refDateOverlayVisible.value = false)
                            }
                          >
                            取消
                          </button>
                          <button
                            type="submit"
                            onClick={() =>
                              (refDateOverlayVisible.value = false)
                            }
                          >
                            确定
                          </button>
                        </div>
                      </Form>
                    </main>
                  </div>
                </Overlay>
              </>
            ),
          }}
        </NavBarLayout>
      </div>
    )
  },
})
