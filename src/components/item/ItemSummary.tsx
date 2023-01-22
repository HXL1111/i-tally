import { Button } from '@/shared/Button'
import { DateTime } from '@/shared/DateTime'
import { http } from '@/shared/Http'
import { Icon } from '@/shared/Icon'
import { Money } from '@/shared/Money'
import { useItemStore } from '@/stores/useItemStore'
import { defineComponent, onMounted, PropType, reactive, watch } from 'vue'
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
    if (!props.startDate || !props.endDate) {
      return () => <div>请先选择时间范围</div>
    }
    const itemStore = useItemStore(['items', props.startDate, props.endDate])

    onMounted(() => {
      itemStore.fetchItems(props.startDate, props.endDate)
    })
    watch(
      () => [props.startDate, props.endDate],
      () => {
        itemStore.reset()
        itemStore.fetchItems()
      }
    )

    const itemsBalance = reactive({
      expenses: 0,
      income: 0,
      balance: 0,
    })
    const fetchItemsBalance = async () => {
      if (!props.startDate || !props.endDate) {
        return
      }
      const response = await http.get(
        '/items/balance',
        {
          happen_after: props.startDate,
          happen_before: props.endDate,
          page: itemStore.page + 1,
        },
        { _mock: 'itemIndexBalance' }
      )
      Object.assign(itemsBalance, response.data)
    }
    onMounted(fetchItemsBalance)
    watch(
      () => [props.endDate, props.startDate],
      () => {
        Object.assign(itemsBalance, {
          expenses: 0,
          income: 0,
          balance: 0,
        })
        fetchItemsBalance()
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
                  <Money value={itemsBalance.expenses} />
                </span>
              </li>
              <li class={s.income}>
                <span>收入</span>
                <span>
                  <Money value={itemsBalance.income} />
                </span>
              </li>
              <li>
                <span class={s.netIncome}>结余</span>
                <span>
                  <Money value={itemsBalance.balance} />
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
