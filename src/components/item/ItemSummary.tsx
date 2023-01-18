import { Button } from '@/shared/Button'
import { DateTime } from '@/shared/DateTime'
import { http } from '@/shared/Http'
import { Icon } from '@/shared/Icon'
import { Money } from '@/shared/Money'
import { defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue'
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
    const items = ref<Item[]>([])
    const hasMore = ref(false)
    const page = ref(0)
    const fetchItems = async () => {
      if (!props.startDate || !props.endDate) {
        return
      }
      const response = await http.get<Resources<Item>>(
        '/items',
        {
          happen_after: props.startDate,
          happen_before: props.endDate,
          page: page.value + 1,
        },
        { _mock: 'itemIndex', _autoLoading: true }
      )
      const { resources, pager } = response.data
      items.value?.push(...resources)
      hasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count
      page.value += 1
    }
    watch(
      () => [props.startDate, props.endDate],
      () => {
        items.value = []
        hasMore.value = false
        page.value = 0
        fetchItems()
      }
    )
    onMounted(() => {
      fetchItems()
    })
    const itemsBalance = reactive({
      expenses: 0,
      income: 0,
      balance: 0,
    })
    const fetchItemsBalance = async () => {
      if (!props.startDate || !props.endDate) {
        return
      }
      const response = await http.get('/item/balance', {
        happen_after: props.startDate,
        happen_before: props.endDate,
        page: page.value + 1,
        _mock: 'itemIndexBalance',
      })
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
        {items.value && items.value.length > 0 ? (
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
              {items.value.map((item) => (
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
                  <div class={[s.right, s.expense]}>
                    ￥<Money value={item.amount} />
                  </div>
                </li>
              ))}
            </ol>
            <div class={s.more}>
              {hasMore.value ? <Button onClick={fetchItems}>加载更多</Button> : <span>没有更多</span>}
            </div>
          </>
        ) : (
          <>
            <div class={s.center}>
              <Icon name="bill" class={s.icon} />
              <span>暂无数据</span>
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
