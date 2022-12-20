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
    redirect: '/welcome/1',
    children: [
      { path: '1', component: First },
      { path: '2', component: Second },
      { path: '3', component: Third },
      { path: '4', component: Fourth },
    ],
  },
]
