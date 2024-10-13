<script setup lang="ts">
import { VbenDropdownRadioMenu, VbenIconButton } from '@vben-core/shadcn-ui'

import { SUPPORT_LANGUAGES } from '@vben/constants'
import { Languages } from '@vben/icons'
import { loadLocaleMessages } from '@vben/locales'
import { preferences, updatePreferences } from '@vben/preferences'
import type { SupportedLanguagesType } from '@vben/locales'

defineOptions({
  name: 'LanguageToggle'
})

async function handleUpdate(value: string) {
  const locale = value as SupportedLanguagesType
  updatePreferences({
    app: {
      locale
    }
  })
  await loadLocaleMessages(locale)
}
</script>

<template>
  <div>
    <VbenDropdownRadioMenu
      :menus="SUPPORT_LANGUAGES"
      :model-value="preferences.app.locale"
      @update:model-value="handleUpdate"
    >
      <VbenIconButton>
        <Languages class="text-foreground size-4" />
      </VbenIconButton>
    </VbenDropdownRadioMenu>
  </div>
</template>
