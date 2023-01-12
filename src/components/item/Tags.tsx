import { http } from '@/shared/Http'
import { Icon } from '@/shared/Icon'
import { defineComponent, onMounted, PropType, ref } from 'vue'
import { RouterLink } from 'vue-router'
import s from './Tags.module.scss'
export const Tags = defineComponent({
  props: {
    kind: {
      type: String as PropType<string>,
      required: true,
    },
    selected: Number,
  },
  emits: ['update:selected'],
  setup: (props, context) => {
    onMounted(async () => {
      const response = await http.get<Resources<Tag>>('/tags', {
        kind: props.kind,
        _mock: 'tagIndex',
      })
      refTags.value = response.data.resources
    })
    const refTags = ref<Tag[]>([])
    const onSelect = (tag: Tag) => {
      context.emit('update:selected', tag.id)
    }
    return () => (
      <ol class={s.tags}>
        <li>
          <RouterLink to="/tag/create" class={s.icon_wrapper}>
            <Icon name="add" class={s.icon} />
          </RouterLink>
          <span>新增</span>
        </li>
        {refTags.value.map((tag) => (
          <li>
            <div
              class={[
                s.icon_wrapper,
                props.selected === tag.id ? s.selectedLogo : '',
              ]}
              onClick={() => onSelect(tag)}
            >
              <Icon name={tag.sign} class={s.icon} />
            </div>
            <span>{tag.name}</span>
          </li>
        ))}
      </ol>
    )
  },
})
