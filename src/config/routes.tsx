import { First } from '../components/welcome/First'
import { Welcome } from '../views/Welcome'

export const routes = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    component: Welcome,
    redirect: '/welcome/first',
    children: [{ path: 'first', component: First }],
  },
]
