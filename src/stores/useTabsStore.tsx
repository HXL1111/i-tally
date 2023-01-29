import { defineStore } from 'pinia'

type State = {
  itemSummaryTab: String
  statisticsTab: String
  typeTab: 'expenses' | 'income' | undefined
}
type Actions = {
  fetchTab: (tabName: string) => void
  setTab: (tabName: string, tab: string) => void
}
export const useTabsStore = defineStore<string, State, {}, Actions>('tab', {
  state: () => ({
    itemSummaryTab: '本月',
    statisticsTab: '本月',
    typeTab: 'expenses',
  }),
  actions: {
    fetchTab(tabName: string) {
      localStorage.getItem(tabName)
    },
    setTab(tabName: string, tab: string) {
      localStorage.setItem(tabName, tab)
    },
  },
})
