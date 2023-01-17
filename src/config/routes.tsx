import { ItemCreate } from '@/components/item/ItemCreate'
import { ItemList } from '@/components/item/ItemList'
import { TagCreate } from '@/components/tag/TagCreate'
import { TagEdit } from '@/components/tag/TagEdit'
import { First } from '@/components/welcome/First'
import { FirstActions } from '@/components/welcome/FirstActions'
import { Fourth } from '@/components/welcome/Fourth'
import { FourthActions } from '@/components/welcome/FourthAction'
import { Second } from '@/components/welcome/Second'
import { SecondActions } from '@/components/welcome/SecondActions'
import { Third } from '@/components/welcome/Third'
import { ThirdActions } from '@/components/welcome/ThirdAction'
import { ExportPage } from '@/views/ExportPage'
import { ItemPage } from '@/views/ItemPage'
import { NotifyPage } from '@/views/NotifyPage'
import { SignInPage } from '@/views/SignInPage'
import { StatisticsPage } from '@/views/StatisticsPage'
import { TagPage } from '@/views/TagPage'
import { WelcomePage } from '@/views/WelcomePage'

import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    component: WelcomePage,
    beforeEnter: (to, from, next) => {
      localStorage.getItem('skipFeatures') === 'yes' ? next('/item') : next()
    },
    children: [
      { path: '', redirect: '/welcome/1' },
      {
        path: '1',
        name: 'Welcome1',
        components: { main: First, footer: FirstActions },
      },
      {
        path: '2',
        name: 'Welcome2',
        components: { main: Second, footer: SecondActions },
      },
      {
        path: '3',
        name: 'Welcome3',
        components: { main: Third, footer: ThirdActions },
      },
      {
        path: '4',
        name: 'Welcome4',
        components: { main: Fourth, footer: FourthActions },
      },
    ],
  },
  {
    path: '/item',
    component: ItemPage,
    redirect: '/item/list',
    children: [
      { path: 'list', component: ItemList },
      { path: 'create', component: ItemCreate },
    ],
  },
  {
    path: '/tag',
    component: TagPage,
    redirect: '/tag/create',
    children: [
      { path: 'create', component: TagCreate },
      { path: ':id/edit', component: TagEdit },
    ],
  },
  { path: '/sign_in', component: SignInPage },
  { path: '/statistics', component: StatisticsPage },
  { path: '/export', component: ExportPage },
  { path: '/notify', component: NotifyPage },
]
