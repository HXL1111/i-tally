import s from './Welcome.module.scss'
import { RouterLink } from 'vue-router'
import { SkipFeatures } from '@/shared/SkipFeatures'
const onClick = () => {
  localStorage.setItem('skipFeatures', 'yes')
}
export const FourthActions = () => (
  <div class={s.actions}>
    <SkipFeatures class={s.fake} />
    <span onClick={onClick}>
      <RouterLink to="/item">开启应用</RouterLink>
    </span>
    <SkipFeatures class={s.fake} />
  </div>
)

FourthActions.displayName = 'fourthActions'
