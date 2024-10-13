<script lang="ts" setup>
import { Menu } from '@vben-core/menu-ui'
import type { MenuProps } from '@vben-core/menu-ui'

import type { MenuRecordRaw } from '@vben/types'

interface Props extends MenuProps {
  menus: MenuRecordRaw[]
}

const props = withDefaults(defineProps<Props>(), {
  accordion: true,
  menus: () => []
})

const emit = defineEmits<{
  select: [string, string?]
}>()

function handleMenuSelect(key: string) {
  emit('select', key, props.mode)
}
</script>

<template>
  <Menu
    :accordion="accordion"
    :collapse="collapse"
    :collapse-show-title="collapseShowTitle"
    :default-active="defaultActive"
    :menus="menus"
    :mode="mode"
    :rounded="rounded"
    :theme="theme"
    @select="handleMenuSelect"
  />
</template>
