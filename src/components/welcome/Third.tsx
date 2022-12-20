import s from './Welcome.module.scss'
import { Welcome } from './Welcome'
import { RouterLink } from 'vue-router'
import { FunctionalComponent } from 'vue'
import { Icon } from '@/shared/Icon'
export const Third: FunctionalComponent = () => {
  return (
    <Welcome>
      {{
        icon: () => <Icon name="statistics" />,
        title: () => (
          <h2>
            数据可视化
            <br />
            收支一目了然
          </h2>
        ),
        buttons: () => (
          <>
            <RouterLink class={s.fake} to="/start">
              跳过
            </RouterLink>
            <RouterLink to="/welcome/4">下一页</RouterLink>
            <RouterLink to="/start">跳过</RouterLink>
          </>
        ),
      }}
    </Welcome>
  )
}

Third.displayName = 'third'
