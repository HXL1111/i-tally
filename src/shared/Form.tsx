import { defineComponent, PropType } from 'vue'
import s from './Form.module.scss'
export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>,
    },
  },
  setup: (props, context) => {
    return () => (
      <form class={s.form} onSubmit={props.onSubmit}>
        {context.slots.default?.()}
      </form>
    )
  },
})

// export const FormItem = defineComponent({
//   props: {
//     name: {
//       type: String as PropType<string>,
//     },
//   },
//   setup: (props, context) => {
//     return () => (
//       <label>
//         <div class={s.text}>
//           <span>标签名</span>
//           <span class={s.error}>{errors.name}</span>
//         </div>
//         <input
//           type="text"
//           placeholder="标签名称(不超过4个字符)"
//           v-model={formData.name}
//         />
//       </label>
//     )
//   },
// })
