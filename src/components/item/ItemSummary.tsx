import { Button } from '@/shared/Button'
import { DateTime } from '@/shared/DateTime'
import { Icon } from '@/shared/Icon'
import { Money } from '@/shared/Money'
import { useBalanceStore } from '@/stores/useBalanceStore'
import { useItemStore } from '@/stores/useItemStore'
import { defineComponent, onMounted, PropType, watch } from 'vue'
import { RouterLink } from 'vue-router'
import s from './ItemSummary.module.scss'
export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
    },
    endDate: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const itemStore = useItemStore(['items', props.startDate!, props.endDate!])
    onMounted(() => {
      itemStore.fetchItems(props.startDate, props.endDate)
    })

    watch(
      () => [props.startDate, props.endDate],
      () => {
        itemStore.$reset()
        itemStore.fetchItems(props.startDate, props.endDate)
      }
    )
    const balanceStore = useBalanceStore(['balance', props.startDate!, props.endDate!])
    onMounted(() => {
      balanceStore.fetchItemsBalance(props.startDate, props.endDate)
    })
    watch(
      () => [props.endDate, props.startDate],
      () => {
        balanceStore.$reset()
        balanceStore.fetchItemsBalance(props.startDate, props.endDate)
      }
    )
    return () => (
      <div class={s.itemSummary}>
        {itemStore.items && itemStore.items.length > 0 ? (
          <>
            <ol class={s.total}>
              <li class={s.expense}>
                <span>支出</span>
                <span>
                  <Money value={balanceStore.expenses} />
                </span>
              </li>
              <li class={s.income}>
                <span>收入</span>
                <span>
                  <Money value={balanceStore.income} />
                </span>
              </li>
              <li>
                <span class={s.netIncome}>结余</span>
                <span>
                  <Money value={balanceStore.balance} />
                </span>
              </li>
            </ol>
            <ol class={s.recordList}>
              {itemStore.items.map((item) => (
                <li>
                  <div class={s.left}>
                    <div class={s.logo}>
                      <Icon name={item.tags![0].sign} class={s.icon} />
                    </div>
                    <div class={s.nameAndDate}>
                      <div>{item.tags?.[0].name}</div>
                      <div class={s.date}>
                        <DateTime value={item.happen_at} />
                      </div>
                    </div>
                  </div>
                  <div class={[s.right, item.kind === 'expenses' ? s.expense : s.income]}>
                    ￥<Money value={item.amount} />
                  </div>
                </li>
              ))}
            </ol>
            <div class={s.more}>
              {itemStore.hasMore ? (
                <Button onClick={() => itemStore.fetchNextPage(props.startDate, props.endDate)}>加载更多</Button>
              ) : (
                <span>没有更多</span>
              )}
            </div>
          </>
        ) : (
          <>
            <div class={s.center}>
              <Icon name="bill" class={s.icon} />
              <span>未发现账单，试着记一笔哦~</span>
            </div>
            <RouterLink to="/item/create">
              <div class={s.button_wrapper}>
                <Button>开始记账</Button>
              </div>
            </RouterLink>
          </>
        )}
      </div>
    )
  },
})
