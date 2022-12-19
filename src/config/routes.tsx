import { First } from '../components/welcome/First'
import { Fourth } from '../components/welcome/Fourth'
import { Second } from '../components/welcome/Second'
import { Third } from '../components/welcome/Third'
import { Welcome } from '../views/Welcome'

export const routes = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    component: Welcome,
    redirect: '/welcome/first',
    children: [
      { path: 'first', component: First },
      { path: 'second', component: Second },
      { path: 'third', component: Third },
      { path: 'fourth', component: Fourth },
    ],
  },
]
