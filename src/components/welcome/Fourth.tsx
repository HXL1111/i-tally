import s from './Welcome.module.scss'
import { FunctionalComponent } from 'vue'
import { Icon } from '@/shared/Icon'
export const Fourth: FunctionalComponent = () => {
  return (
    <div class={s.card}>
      <Icon name="clock" />
      <h2>
        云备份
        <br />
        再也不怕数据丢失
      </h2>
    </div>
  )
}

Fourth.displayName = 'fourth'
