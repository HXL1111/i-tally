import { ItemCreate } from '@/components/item/ItemCreate'
import { ItemList } from '@/components/item/ItemList'
import { First } from '@/components/welcome/First'
import { FirstActions } from '@/components/welcome/FirstActions'
import { Fourth } from '@/components/welcome/Fourth'
import { FourthActions } from '@/components/welcome/FourthAction'
import { Second } from '@/components/welcome/Second'
import { SecondActions } from '@/components/welcome/SecondActions'
import { Third } from '@/components/welcome/Third'
import { ThirdActions } from '@/components/welcome/ThirdAction'
import { ItemPage } from '@/views/ItemPage'
import { StartPage } from '@/views/StartPage'
import { WelcomePage } from '@/views/WelcomePage'
import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    component: WelcomePage,
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
  { path: '/start', component: StartPage },
  {
    path: '/item',
    component: ItemPage,
    redirect: '/item/list',
    children: [
      { path: 'list', component: ItemList },
      { path: 'create', component: ItemCreate },
    ],
  },
]
