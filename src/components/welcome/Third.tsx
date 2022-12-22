import s from './Welcome.module.scss'
import { FunctionalComponent } from 'vue'
import { Icon } from '@/shared/Icon'
export const Third: FunctionalComponent = () => {
  return (
    <div class={s.card}>
      <Icon name="statistics" />
      <h2>
        数据可视化
        <br />
        收支一目了然
      </h2>
    </div>
  )
}

Third.displayName = 'third'
