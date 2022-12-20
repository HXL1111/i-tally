import s from './Welcome.module.scss'
import { Welcome } from './Welcome'
import { RouterLink } from 'vue-router'
import { FunctionalComponent } from 'vue'
import { Icon } from '@/shared/Icon'
export const Second: FunctionalComponent = () => {
  return (
    <Welcome>
      {{
        icon: () => <Icon name="clock" />,
        title: () => (
          <h2>
            每日提醒
            <br />
            不会遗漏每一笔账单
          </h2>
        ),
        buttons: () => (
          <>
            <RouterLink class={s.fake} to="/start">
              跳过
            </RouterLink>
            <RouterLink to="/welcome/3">下一页</RouterLink>
            <RouterLink to="/start">跳过</RouterLink>
          </>
        ),
      }}
    </Welcome>
  )
}

Second.displayName = 'second'
