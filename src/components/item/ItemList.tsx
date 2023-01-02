import { TimeTabsLayout } from '@/layouts/TimeTabsLayout'
import { FloatButton } from '@/shared/FloatButton'
import { MenuOverlay } from '@/shared/MenuOverlay'
import { defineComponent, PropType, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ItemSummary } from './ItemSummary'
export const ItemList = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refMenuOverlayVisible = ref(false)
    const overlayOnClick = () => {
      refMenuOverlayVisible.value = !refMenuOverlayVisible.value
    }
    return () => (
      <>
        <TimeTabsLayout
          component={ItemSummary}
          iconName="menu"
          title="i 记账"
          iconOnClick={overlayOnClick}
        />
        {refMenuOverlayVisible.value && (
          <MenuOverlay
            onClose={() => {
              refMenuOverlayVisible.value = false
            }}
          />
        )}
        <RouterLink to="/item/create">
          <FloatButton />
        </RouterLink>
      </>
    )
  },
})
