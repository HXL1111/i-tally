import { defineComponent, PropType } from 'vue'
import { Icon } from './Icon'
import s from './LogoSelect.module.scss'
export const LogoSelect = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => (
      <div class={s.logoList}>
        <nav>
          <span>财务</span>
          <span>财务</span>
          <span>财务</span>
          <span>财务</span>
          <span>财务</span>
          <span>财务</span>
          <span>财务</span>
          <span>财务</span>
          <span>财务</span>
          <span>财务</span>
          <span>财务</span>
          <span>财务</span>
        </nav>
        <ol>
          <li>
            <div class={s.selectedLogo}>
              <Icon name="add" class={s.icon} />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
          <li>
            <div>
              <Icon name="add" />
            </div>
          </li>
        </ol>
      </div>
    )
  },
})
