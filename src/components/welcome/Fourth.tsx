import s from './Welcome.module.scss'
import { Welcome } from './Welcome'
import { RouterLink } from 'vue-router'
import { FunctionalComponent } from 'vue'
import { Icon } from '@/shared/Icon'
export const Fourth: FunctionalComponent = () => {
  return (
    <Welcome>
      {{
        icon: () => <Icon name="clock" />,
        title: () => (
          <h2>
            云备份
            <br />
            再也不怕数据丢失
          </h2>
        ),
        buttons: () => (
          <>
            <RouterLink class={s.fake} to="/start">
              跳过
            </RouterLink>
            <RouterLink to="/start">开启应用</RouterLink>
            <RouterLink to="/start" class={s.fake}>
              跳过
            </RouterLink>
          </>
        ),
      }}
    </Welcome>
  )
}

Fourth.displayName = 'fourth'
