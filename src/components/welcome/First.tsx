import s from './Welcome.module.scss'
import pig from '../../assets/icons/pig.svg'
import { Welcome } from './Welcome'
import { RouterLink } from 'vue-router'
import { FunctionalComponent } from 'vue'
export const First: FunctionalComponent = () => {
  return (
    <Welcome>
      {{
        icon: () => <img src={pig} />,
        title: () => (
          <h2>
            会挣钱
            <br />
            还会省钱
          </h2>
        ),
        buttons: () => (
          <>
            <RouterLink class={s.fake} to="/start">
              跳过
            </RouterLink>
            <RouterLink to="/welcome/2">下一页</RouterLink>
            <RouterLink to="/start">跳过</RouterLink>
          </>
        ),
      }}
    </Welcome>
  )
}

First.displayName = 'First'
