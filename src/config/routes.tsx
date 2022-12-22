import { First } from '@/components/welcome/First'
import { FirstActions } from '@/components/welcome/FirstActions'
import { Fourth } from '@/components/welcome/Fourth'
import { FourthActions } from '@/components/welcome/FourthAction'
import { Second } from '@/components/welcome/Second'
import { SecondActions } from '@/components/welcome/SecondActions'
import { Third } from '@/components/welcome/Third'
import { ThirdActions } from '@/components/welcome/ThirdAction'
import { WelcomePage } from '@/views/WelcomePage'
import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    component: WelcomePage,
    children: [
      { path: '', redirect: '/welcome/1' },
      { path: '1', components: { main: First, footer: FirstActions } },
      { path: '2', components: { main: Second, footer: SecondActions } },
      { path: '3', components: { main: Third, footer: ThirdActions } },
      { path: '4', components: { main: Fourth, footer: FourthActions } },
    ],
  },
]
