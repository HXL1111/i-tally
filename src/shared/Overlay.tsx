import { defineComponent, PropType } from 'vue'
import { Icon } from './Icon'
import s from './Overlay.module.scss'
export const Overlay = defineComponent({
  props:{
    onClose:{
      type:Function as PropType<(e:MouseEvent)=>void>
    }
  },
  setup: (props, context) => {
    return () => (
      <>
        <div class={s.mask} onClick={props.onClose}></div>
        <div class={s.overlay}>
          <section>
            <h2>未登录用户</h2>
            <span>点击这里登录</span>
          </section>
          <ol>
            <li>
              <div class={s.left}>
                <Icon name="statistics" class={s.logo} />
                <span>统计图表</span>
              </div>
              <Icon name="right" class={s.right} />
            </li>
            <li>
              <div class={s.left}>
                <Icon name="export" class={s.logo} />
                <span>导出数据</span>
              </div>
              <Icon name="right" class={s.right} />
            </li>
            <li>
              <div class={s.left}>
                <Icon name="clock" class={s.logo} />
                <span>记账提醒</span>
              </div>
              <Icon name="right" class={s.right} />
            </li>
          </ol>
        </div>
      </>
    )
  },
})
