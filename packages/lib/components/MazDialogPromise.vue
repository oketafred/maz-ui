<script lang="ts">
/* eslint-disable import/first */
export {
  useMazDialogPromise,
  type DialogState,
  type DialogData,
} from './MazDialogPromise/use-maz-dialog-promise'
export type { Color, Size } from './types'
</script>

<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue'
import {
  type DialogCustomButton,
  type DialogData,
  type DialogState,
  defaultData,
  useMazDialogPromise,
} from './MazDialogPromise/use-maz-dialog-promise'

import MazDialog, { type Props as MazDialogProps } from './MazDialog.vue'

export interface InternalProps extends MazDialogProps {
  /** Dialog Data - @type DialogData */
  data?: DialogData
  /** Uniq identifier */
  identifier: string
  /** Custom buttons - @type DialogCustomButton[] */
  buttons?: DialogCustomButton[]
}
export type Props = InternalProps

const props = withDefaults(defineProps<InternalProps>(), {
  data: undefined,
  buttons: undefined,
})

const MazBtn = defineAsyncComponent(() => import('./MazBtn.vue'))

const customButtons = computed(() => props.buttons ?? composableData.value.buttons)

const { dialogState, rejectDialog, resolveDialog, data: composableData } = useMazDialogPromise()

const cancelButtonData = computed(() => {
  const hasButton
      = composableData.value?.cancelButton ?? props.data?.cancelButton ?? defaultData.cancelButton

  if (!hasButton)
    return false

  return {
    ...defaultData.cancelButton,
    ...composableData.value?.cancelButton,
    ...props.data?.cancelButton,
  }
})
const confirmButtonData = computed(() => {
  const hasButton
      = composableData.value?.confirmButton ?? props.data?.confirmButton ?? defaultData.confirmButton

  if (!hasButton)
    return false

  return {
    ...defaultData.confirmButton,
    ...composableData.value?.confirmButton,
    ...props.data?.confirmButton,
  }
})

const currentData = computed<DialogData>(() => ({
  ...defaultData,
  ...composableData.value,
  ...props.data,
}))

const currentModal = computed(
  () => dialogState.value.find(({ id }) => id === props.identifier) as DialogState,
)
</script>

<template>
  <MazDialog
    :model-value="currentModal?.isActive ?? false"
    @update:model-value="rejectDialog(currentModal)"
  >
    <template #title>
      <!--
        @slot title slot - Place your title
      -->
      <slot name="title">
        {{ currentData?.title }}
      </slot>
    </template>
    <template #default>
      <!--
        @slot Default slot - Place your content
          @binding {Function} resolve resolve function
          @binding {Function} reject reject function
      -->
      <slot
        :resolve="(reason?: string | boolean) => resolveDialog(currentModal, reason)"
        :reject="(reason?: string | boolean) => rejectDialog(currentModal, reason)"
      >
        {{ currentData?.message }}
      </slot>
    </template>
    <template #footer>
      <!--
        @slot Footer slot
          @binding {Function} resolve resolve function
          @binding {Function} reject reject function
      -->
      <slot
        :resolve="(reason?: string | boolean) => resolveDialog(currentModal, reason)"
        :reject="(reason?: string | boolean) => rejectDialog(currentModal, reason)"
        name="footer-button"
      >
        <div class="maz-flex maz-items-center maz-gap-2">
          <template v-if="customButtons && customButtons.length > 0">
            <MazBtn
              v-for="(button, i) in customButtons"
              :key="i"
              :color="button.color"
              :size="button.size"
              :outline="button.outline"
              :rounded="button.rounded"
              :disabled="button.disabled"
              :block="button.block"
              :loading="button.loading"
              @click="
                button.type === 'resolve'
                  ? resolveDialog(currentModal, button.response)
                  : rejectDialog(currentModal, button.response)
              "
            >
              {{ button.text }}
            </MazBtn>
          </template>
          <template v-else>
            <MazBtn
              v-if="cancelButtonData"
              v-bind="cancelButtonData"
              outline
              @click="rejectDialog(currentModal)"
            >
              <!--
                @slot cancel-text slot - Place your cancel text
              -->
              <slot name="cancel-text">
                {{ cancelButtonData.text ?? currentData?.cancelText }}
              </slot>
            </MazBtn>

            <MazBtn
              v-if="confirmButtonData"
              v-bind="confirmButtonData"
              @click="resolveDialog(currentModal)"
            >
              <!--
                @slot confirm-text slot - Place your confirm text
              -->
              <slot name="confirm-text">
                {{ confirmButtonData.text ?? currentData.confirmText }}
              </slot>
            </MazBtn>
          </template>
        </div>
      </slot>
    </template>
  </MazDialog>
</template>
