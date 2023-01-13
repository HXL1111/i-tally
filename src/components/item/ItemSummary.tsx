import { Icon } from '@/shared/Icon'
import { defineComponent, PropType } from 'vue'
import s from './ItemSummary.module.scss'
export const ItemSummary = defineComponent({
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
  setup: (props, context) => {
    return () => (
      <div class={s.itemSummary}>
        <ol class={s.total}>
          <li class={s.expense}>
            <span>支出</span>
            <span>128</span>
          </li>
          <li class={s.income}>
            <span>收入</span>
            <span>100</span>
          </li>
          <li>
            <span class={s.netIncome}>结余</span>
            <span>-28</span>
          </li>
        </ol>
        <ol class={s.recordList}>
          <li>
            <div class={s.left}>
              <div class={s.logo}>
                <Icon name="caiWu2" class={s.icon} />
              </div>
              <div class={s.nameAndDate}>
                <div>吃饭</div>
                <div class={s.date}>2022-11-30 12:31</div>
              </div>
            </div>
            <div class={[s.right, s.expense]}>￥500</div>
          </li>
        </ol>
        <div class={s.more}>向下滑动加载更多</div>
      </div>
    )
  },
})
