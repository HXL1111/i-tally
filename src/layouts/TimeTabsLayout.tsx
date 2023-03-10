import { NavBarLayout } from '@/layouts/NavBarLayout'
import { Overlay } from 'vant'
import { Tabs, Tab } from '@/shared/Tabs'
import { Time } from '@/shared/time'
import { defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue'
import s from './TimeTabsLayout.module.scss'
import { Form, FormItem } from '@/shared/Form'
import { useTabsStore } from '@/stores/useTabsStore'

const demo = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
    },
    endDate: {
      type: String as PropType<string>,
    },
  },
})
const timeMap = [
  {
    name: '本月',
    timeList: {
      start: new Time().firstDayOfMonth().format(),
      end: new Time().lastDayOfMonth().format('YYYY-MM-DD HH:mm:ss'),
    },
  },
  {
    name: '上个月',
    timeList: {
      start: new Time().add(-1, 'month').firstDayOfMonth().format(),
      end: new Time().add(-1, 'month').lastDayOfMonth().format('YYYY-MM-DD HH:mm:ss'),
    },
  },
  {
    name: '今年',
    timeList: {
      start: new Time().firstDayOfYear().format(),
      end: new Time().lastDayOfYear().format('YYYY-MM-DD HH:mm:ss'),
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
    rerenderOnSwitchTab: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props, context) => {
    const tabStore = useTabsStore()
    const refDateOverlayVisible = ref(false)
    const refKind = ref('')
    const onSelectTime = (name: string) => {
      if (name === '自定义时间') {
        refDateOverlayVisible.value = true
      }
    }
    const tempTime = reactive({
      start: new Time().format(),
      end: new Time().format(),
    })
    const customTime = reactive<{ start?: string; end?: string }>({})
    const onSubmitCustomTime = (e: Event) => {
      e.preventDefault()
      refDateOverlayVisible.value = false
      Object.assign(customTime, tempTime)
    }
    onMounted(() => {
      if (props.component.__hmrId === '98990140') {
        refKind.value = tabStore.itemSummaryTab.toString()
        tabStore.fetchTab('itemSummaryTab')
      } else {
        refKind.value = tabStore.statisticsTab.toString()
        tabStore.fetchTab('statisticsTab')
      }
    })
    watch(
      () => refKind.value,
      () => {
        if (props.component.__hmrId === '98990140') {
          tabStore.itemSummaryTab = refKind.value
          tabStore.setTab('itemSummaryTab', tabStore.itemSummaryTab.toString())
        } else {
          tabStore.statisticsTab = refKind.value
          tabStore.setTab('statisticsTab', tabStore.statisticsTab.toString())
        }
      }
    )
    return () => (
      <div class={s.wrapper}>
        <NavBarLayout iconName={props.iconName} title={props.title} onClick={props.iconOnClick}>
          {{
            default: () => (
              <>
                <Tabs
                  v-model:selected={refKind.value}
                  class={s.tabs}
                  onUpdate:selected={onSelectTime}
                  rerenderOnSelect={props.rerenderOnSwitchTab}
                >
                  <Tab value={timeMap[0].name} name={timeMap[0].name} class={s.tab}>
                    <props.component startDate={timeMap[0].timeList.start} endDate={timeMap[0].timeList.end} />
                  </Tab>
                  <Tab value={timeMap[1].name} name={timeMap[1].name}>
                    <props.component startDate={timeMap[1].timeList.start} endDate={timeMap[1].timeList.end} />
                  </Tab>
                  <Tab value={timeMap[2].name} name={timeMap[2].name}>
                    <props.component startDate={timeMap[2].timeList.start} endDate={timeMap[2].timeList.end} />
                  </Tab>
                  <Tab value="自定义时间" name="自定义时间">
                    <props.component
                      startDate={customTime.start}
                      endDate={new Time(customTime.end)
                        .add(1, 'day')
                        .add(-8, 'hour')
                        .add(-1, 'second')
                        .format('YYYY-MM-DD HH:mm:ss')}
                    />
                  </Tab>
                </Tabs>
                <Overlay show={refDateOverlayVisible.value} class={s.overlay}>
                  <div class={s.overlay_inner}>
                    <header>请选择时间</header>
                    <main>
                      <Form class={s.form} onSubmit={onSubmitCustomTime}>
                        <FormItem type="date" label="开始时间" v-model:modelValue={tempTime.start} />
                        <FormItem type="date" label="结束时间" v-model:modelValue={tempTime.end} />
                        <div class={s.actions}>
                          <button type="button" onClick={() => (refDateOverlayVisible.value = false)}>
                            取消
                          </button>
                          <button type="submit">确定</button>
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
