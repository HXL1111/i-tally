import { defineStore } from 'pinia'
import { http } from '../shared/Http'

type State = {
  expenses: number
  income: number
  balance: number
}
type Actions = {
  fetchItemsBalance: (startDate?: string, endDate?: string) => void
}

export const useBalanceStore = (id: string | string[]) =>
  defineStore<string, State, {}, Actions>(typeof id === 'string' ? id : id.join('-'), {
    state: () => ({
      expenses: 0,
      income: 0,
      balance: 0,
    }),
    actions: {
      async fetchItemsBalance(startDate, endDate) {
        if (!startDate || !endDate) {
          return
        }
        const response = await http.get(
          '/items/balance',
          {
            happen_after: startDate,
            happen_before: endDate,
          },
          { _mock: 'itemIndexBalance' }
        )
        Object.assign(this.$state, response.data)
      },
    },
  })()
