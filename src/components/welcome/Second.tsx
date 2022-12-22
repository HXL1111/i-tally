import s from './Welcome.module.scss'

import { FunctionalComponent } from 'vue'
import { Icon } from '@/shared/Icon'
export const Second: FunctionalComponent = () => {
  return (
    <div class={s.card}>
      <Icon name="clock" class={s.icon} />
      <h2>
        每日提醒
        <br />
        不会遗漏每一笔账单
      </h2>
    </div>
  )
}

Second.displayName = 'second'
