import { NavBarLayout } from '@/layouts/NavBarLayout'
import { Button } from '@/shared/Button'
import { LogoSelect } from '@/shared/LogoSelect'
import { defineComponent, PropType } from 'vue'
import s from './TagCreate.module.scss'
export const TagCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <NavBarLayout iconName="left" title="新建标签">
          <form class={s.form}>
            <label>
              <span class={s.tagName}>标签名</span>
              <input type="text" placeholder="标签名称(不超过4个字符)" />
            </label>
            <label>
              <span class={s.logo}>符号</span>
              <LogoSelect />
            </label>
            <p>记账时长按标签，即可进行编辑</p>
            <div class={s.buttons}>
              <Button class={s.button}>完成</Button>
            </div>
          </form>
        </NavBarLayout>
      </div>
    )
  },
})
