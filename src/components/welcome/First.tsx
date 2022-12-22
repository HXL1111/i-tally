import s from './Welcome.module.scss'
import { FunctionalComponent } from 'vue'
import { Icon } from '@/shared/Icon'
export const First: FunctionalComponent = () => {
  return (
    <div class={s.card}>
      <Icon name="pig" class={s.icon} />
      <h2>
        会挣钱
        <br />
        还会省钱
      </h2>
    </div>
  )
}

First.displayName = 'first'
