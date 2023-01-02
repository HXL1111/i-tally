import { computed, defineComponent, PropType, ref } from 'vue'
import { Icon } from './Icon'
import s from './LogoSelect.module.scss'
import { tagLogoList } from './tagLogoList'
export const LogoSelect = defineComponent({
  props: {
    modelValue: {
      type: String,
    },
    onUpdateModelValue: {
      type: Function as PropType<(value: string) => void>,
    },
  },
  setup: (props, context) => {
    const refSelected = ref('日常')
    const logos = computed(() => {
      return tagLogoList.find((item) => item.kind === refSelected.value)
    })
    const onClickLogo = (logo: string) => {
      if (props.onUpdateModelValue) {
        props.onUpdateModelValue(logo)
      } else {
        context.emit('update:modelValue', logo)
      }
    }
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
                onClick={() => onClickLogo(name)}
                class={[
                  name === props.modelValue ? s.selectedLogo : '',
                  s.logo,
                ]}
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
