import { defineComponent, PropType } from 'vue'
import s from './Welcome.module.scss'
export const Welcome = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <header>
          <svg>
            <use xlinkHref="#pig" />
          </svg>
        </header>
        <main></main>
        <footer></footer>
      </div>
    )
  },
})
