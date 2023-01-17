import { Icon } from '@/shared/Icon'
import { computed, defineComponent, PropType } from 'vue'
import s from './Bars.module.scss'
export const Bars = defineComponent({
  props: {
    data: {
      type: Array as PropType<{ tag: Tag; amount: number; percent: number }[]>,
      required: true,
    },
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        {props.data.map(({ tag, amount, percent }) => {
          return (
            <div class={s.topItem}>
              <div class={s.sign}>
                <Icon name={tag.sign} class={s.icon} />
              </div>
              <div class={s.bar_wrapper}>
                <div class={s.bar_text}>
                  <span>
                    {' '}
                    {tag.name} - {percent}%{' '}
                  </span>
                  <span> ￥{amount} </span>
                </div>
                <div class={s.bar}>
                  <div class={s.bar_inner} style={{ width: `${percent}%` }}></div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  },
})
