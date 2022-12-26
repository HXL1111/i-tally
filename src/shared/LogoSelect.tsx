import { computed, defineComponent, PropType, ref } from 'vue'
import { Icon } from './Icon'
import s from './LogoSelect.module.scss'
import { tagLogoList } from './tagLogoList'
export const LogoSelect = defineComponent({
  props: {
    modelValue: {
      type: String,
    },
  },
  setup: (props, context) => {
    const refSelected = ref('日常')
    const logos = computed(() => {
      return tagLogoList.find((item) => item.kind === refSelected.value)
    })

    return () => (
      <div class={s.logoList}>
        <nav>
          {tagLogoList.map((item) => (
            <span
              class={item.kind === refSelected.value ? s.selected : ''}
              onClick={() => {
                refSelected.value = item.kind
              }}
            >
              {item.kind}
            </span>
          ))}
        </nav>
        <ol>
          {logos.value?.iconName.map((name) => (
            <li>
              <div
                onClick={() => context.emit('update:modelValue', name)}
                class={name === props.modelValue ? s.selectedLogo : ''}
              >
                <Icon name={name} class={s.icon} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    )
  },
})
