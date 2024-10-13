<script lang="ts" setup>
import { VbenIconButton } from '@vben-core/shadcn-ui'
import { Settings } from '@vben/icons'

import Preferences from './preferences.vue'

const emit = defineEmits<{ clearPreferencesAndLogout: [] }>()

function clearPreferencesAndLogout() {
  emit('clearPreferencesAndLogout')
}
</script>

<template>
  <Preferences @clear-preferences-and-logout="clearPreferencesAndLogout">
    <VbenIconButton>
      <Settings class="text-foreground size-4" />
    </VbenIconButton>
  </Preferences>
</template>
