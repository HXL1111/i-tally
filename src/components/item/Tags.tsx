import { http } from '@/shared/Http'
import { Icon } from '@/shared/Icon'
import { defineComponent, onMounted, PropType, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
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
    const timer = ref<number>()
    const currentTag = ref<HTMLDivElement>()
    const router = useRouter()
    const onLongPress = (tagId: Tag['id']) => {
      router.push(
        `/tag/${tagId}/edit?kind=${props.kind}&return_to=${router.currentRoute.value.fullPath}`
      )
    }
    const onTouchStart = (e: TouchEvent, tag: Tag) => {
      currentTag.value = e.currentTarget as HTMLDivElement
      timer.value = window.setTimeout(() => {
        onLongPress(tag.id)
      }, 500)
    }
    const onTouchEnd = (e: TouchEvent) => {
      clearTimeout(timer.value)
    }
    const onTouchMove = (e: TouchEvent) => {
      const pointedElement = document.elementFromPoint(
        e.touches[0].clientX,
        e.touches[0].clientY
      )
      if (
        currentTag.value !== pointedElement &&
        currentTag.value?.contains(pointedElement) === false
      ) {
        clearTimeout(timer.value)
      }
    }
    return () => (
      <ol class={s.tags} onTouchmove={onTouchMove}>
        <li>
          <RouterLink
            to={`/tag/create?kind=${props.kind}`}
            class={s.icon_wrapper}
          >
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
              onTouchstart={(e) => onTouchStart(e, tag)}
              onTouchend={onTouchEnd}
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
