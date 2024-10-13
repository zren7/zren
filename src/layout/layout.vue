<script lang="ts" setup>
// import { Toaster, VbenBackTop, VbenLogo } from '@vben-core/shadcn-ui'
import { $t } from '@vben/locales'
import { preferences, updatePreferences, usePreferences } from '@vben/preferences'
import { computed, useSlots, watch } from 'vue'
import { useRefresh } from '@/hooks/web/use-refresh'
import { useLockStore } from '@/store/modules/lock'
import { mapTree } from '@/utils/tree'
import { BasicLayout } from './components/basic-layout'
import { LayoutContent, LayoutContentSpinner } from './components/content'
import { Copyright } from './components/copyright'
import { LayoutFooter } from './components/footer'
import { LayoutHeader } from './components/header'

import {
  LayoutExtraMenu,
  LayoutMenu,
  LayoutMixedMenu,
  useExtraMenu,
  useMixedMenu
} from './components/menu'
import { LayoutTabbar } from './components/tabbar'
import { Breadcrumb, CheckUpdates, Preferences } from './components/widgets'

defineOptions({ name: 'BasicLayout' })

const emit = defineEmits<{ clearPreferencesAndLogout: [] }>()

const {
  isDark,
  isHeaderNav,
  isMixedNav,
  isMobile,
  isSideMixedNav,
  layout,
  preferencesButtonPosition,
  sidebarCollapsed,
  theme
} = usePreferences()
const lockStore = useLockStore()
const { refresh } = useRefresh()

const sidebarTheme = computed(() => {
  const dark = isDark.value || preferences.theme.semiDarkSidebar
  return dark ? 'dark' : 'light'
})

const headerTheme = computed(() => {
  const dark = isDark.value || preferences.theme.semiDarkHeader
  return dark ? 'dark' : 'light'
})

const logoClass = computed(() => {
  const { collapsedShowTitle } = preferences.sidebar
  const classes: string[] = []

  if (collapsedShowTitle && sidebarCollapsed.value && !isMixedNav.value) {
    classes.push('mx-auto')
  }

  if (isSideMixedNav.value) {
    classes.push('flex-center')
  }

  return classes.join(' ')
})

const isMenuRounded = computed(() => {
  return preferences.navigation.styleType === 'rounded'
})

const logoCollapsed = computed(() => {
  if (isMobile.value && sidebarCollapsed.value) {
    return true
  }
  if (isHeaderNav.value || isMixedNav.value) {
    return false
  }
  return sidebarCollapsed.value || isSideMixedNav.value
})

const showHeaderNav = computed(() => {
  return !isMobile.value && (isHeaderNav.value || isMixedNav.value)
})

// 侧边多列菜单
const {
  extraActiveMenu,
  extraMenus,
  handleDefaultSelect,
  handleMenuMouseEnter,
  handleMixedMenuSelect,
  handleSideMouseLeave,
  sidebarExtraVisible
} = useExtraMenu()

const { handleMenuSelect, headerActive, headerMenus, sidebarActive, sidebarMenus, sidebarVisible } =
  useMixedMenu()

function wrapperMenus(menus: any[]) {
  // TODO ...deepToRaw(item)
  return mapTree(menus, (item: { name: any }) => {
    return { ...item, name: $t(item.name) }
  })
}

function toggleSidebar() {
  updatePreferences({
    sidebar: {
      hidden: !preferences.sidebar.hidden
    }
  })
}

function clearPreferencesAndLogout() {
  emit('clearPreferencesAndLogout')
}

watch(
  () => preferences.app.layout,
  (val) => {
    if (val === 'sidebar-mixed-nav' && preferences.sidebar.hidden) {
      updatePreferences({
        sidebar: {
          hidden: false
        }
      })
    }
  }
)

// 语言更新后，刷新页面
watch(() => preferences.app.locale, refresh)

const slots = useSlots()
const headerSlots = computed(() => {
  return Object.keys(slots).filter((key) => key.startsWith('header-'))
})
</script>

<template>
  <BasicLayout
    v-model:sidebar-extra-visible="sidebarExtraVisible"
    :content-compact="preferences.app.contentCompact"
    :footer-enable="preferences.footer.enable"
    :footer-fixed="preferences.footer.fixed"
    :header-hidden="preferences.header.hidden"
    :header-mode="preferences.header.mode"
    :header-theme="headerTheme"
    :header-toggle-sidebar-button="preferences.widget.sidebarToggle"
    :header-visible="preferences.header.enable"
    :is-mobile="preferences.app.isMobile"
    :layout="layout"
    :sidebar-collapse="preferences.sidebar.collapsed"
    :sidebar-collapse-show-title="preferences.sidebar.collapsedShowTitle"
    :sidebar-enable="sidebarVisible"
    :sidebar-expand-on-hover="preferences.sidebar.expandOnHover"
    :sidebar-extra-collapse="preferences.sidebar.extraCollapse"
    :sidebar-hidden="preferences.sidebar.hidden"
    :sidebar-theme="sidebarTheme"
    :sidebar-width="preferences.sidebar.width"
    :tabbar-enable="preferences.tabbar.enable"
    :tabbar-height="preferences.tabbar.height"
    @side-mouse-leave="handleSideMouseLeave"
    @toggle-sidebar="toggleSidebar"
    @update:sidebar-collapse="
      (value: boolean) => updatePreferences({ sidebar: { collapsed: value } })
    "
    @update:sidebar-enable="(value: boolean) => updatePreferences({ sidebar: { enable: value } })"
    @update:sidebar-expand-on-hover="
      (value: boolean) => updatePreferences({ sidebar: { expandOnHover: value } })
    "
    @update:sidebar-extra-collapse="
      (value: boolean) => updatePreferences({ sidebar: { extraCollapse: value } })
    "
  >
    <!-- logo -->
    <template #logo>
      <!-- <VbenLogo
        v-if="preferences.logo.enable"
        :class="logoClass"
        :collapsed="logoCollapsed"
        :src="preferences.logo.source"
        :text="preferences.app.name"
        :theme="showHeaderNav ? headerTheme : theme"
      /> -->
      <div>Logo</div>
    </template>
    <!-- 头部区域 -->
    <template #header>
      <LayoutHeader :theme="theme" @clear-preferences-and-logout="clearPreferencesAndLogout">
        <template v-if="!showHeaderNav && preferences.breadcrumb.enable" #breadcrumb>
          <Breadcrumb
            :hide-when-only-one="preferences.breadcrumb.hideOnlyOne"
            :show-home="preferences.breadcrumb.showHome"
            :show-icon="preferences.breadcrumb.showIcon"
            :type="preferences.breadcrumb.styleType"
          />
        </template>
        <template v-if="showHeaderNav" #menu>
          <LayoutMenu
            :default-active="headerActive"
            :menus="wrapperMenus(headerMenus)"
            :rounded="isMenuRounded"
            :theme="headerTheme"
            class="w-full"
            mode="horizontal"
            @select="handleMenuSelect"
          />
        </template>
        <template #user-dropdown>
          <slot name="user-dropdown" />
        </template>
        <template #notification>
          <slot name="notification" />
        </template>
        <template v-for="item in headerSlots" #[item]>
          <slot :name="item" />
        </template>
      </LayoutHeader>
    </template>
    <!-- 侧边菜单区域 -->
    <template #menu>
      <LayoutMenu
        :accordion="preferences.navigation.accordion"
        :collapse="preferences.sidebar.collapsed"
        :collapse-show-title="preferences.sidebar.collapsedShowTitle"
        :default-active="sidebarActive"
        :menus="wrapperMenus(sidebarMenus)"
        :rounded="isMenuRounded"
        :theme="sidebarTheme"
        mode="vertical"
        @select="handleMenuSelect"
      />
    </template>
    <template #mixed-menu>
      <LayoutMixedMenu
        :active-path="extraActiveMenu"
        :menus="wrapperMenus(headerMenus)"
        :rounded="isMenuRounded"
        :theme="sidebarTheme"
        @default-select="handleDefaultSelect"
        @enter="handleMenuMouseEnter"
        @select="handleMixedMenuSelect"
      />
    </template>

    <!-- 侧边额外区域 -->
    <template #side-extra-title>
      <VbenLogo v-if="preferences.logo.enable" :text="preferences.app.name" :theme="theme" />
    </template>
    <template #side-extra>
      <LayoutExtraMenu
        :accordion="preferences.navigation.accordion"
        :collapse="preferences.sidebar.extraCollapse"
        :menus="wrapperMenus(extraMenus)"
        :rounded="isMenuRounded"
        :theme="sidebarTheme"
      />
    </template>

    <template #tabbar>
      <LayoutTabbar
        v-if="preferences.tabbar.enable"
        :show-icon="preferences.tabbar.showIcon"
        :theme="theme"
      />
    </template>

    <!-- 主体内容 -->
    <template #content>
      <LayoutContent />
    </template>

    <template v-if="preferences.transition.loading" #content-overlay>
      <LayoutContentSpinner />
    </template>

    <!-- 页脚 -->
    <template v-if="preferences.footer.enable" #footer>
      <LayoutFooter>
        <Copyright v-if="preferences.copyright.enable" v-bind="preferences.copyright" />
      </LayoutFooter>
    </template>

    <template #extra>
      <slot name="extra" />
      <CheckUpdates
        v-if="preferences.app.enableCheckUpdates"
        :check-updates-interval="preferences.app.checkUpdatesInterval"
      />

      <Transition v-if="preferences.widget.lockScreen" name="slide-up">
        <slot v-if="lockStore.isLockScreen" name="lock-screen" />
      </Transition>

      <template v-if="preferencesButtonPosition.fixed">
        <Preferences
          class="z-100 fixed bottom-20 right-0"
          @clear-preferences-and-logout="clearPreferencesAndLogout"
        />
      </template>
      <!-- <Toaster /> -->
      <!-- <VbenBackTop /> -->
    </template>
  </BasicLayout>
</template>
