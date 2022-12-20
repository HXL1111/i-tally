import { RouteRecordRaw } from 'vue-router'
import { First } from '../components/welcome/First'
import { Fourth } from '../components/welcome/Fourth'
import { Second } from '../components/welcome/Second'
import { Third } from '../components/welcome/Third'
import { WelcomePage } from '../views/WelcomePage'

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    component: WelcomePage,
    redirect: '/welcome/first',
    children: [
      { path: 'first', component: First },
      { path: 'second', component: Second },
      { path: 'third', component: Third },
      { path: 'fourth', component: Fourth },
    ],
  },
]
