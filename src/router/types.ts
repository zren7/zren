import type { RouteRecordRaw } from 'vue-router'

type Recordable<T = any, K extends string | number | symbol = string> = Record<
  K extends null | undefined ? string : K,
  T
>

interface RouteMeta extends Record<string | number | symbol, unknown> {
  hidden?: boolean
  alwaysShow?: boolean
  title?: string
  icon?: string
  noCache?: boolean
  breadcrumb?: boolean
  affix?: boolean
  activeMenu?: string
  noTagsView?: boolean
  followAuth?: string
  canTo?: boolean
}

interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string
  meta: RouteMeta
  component?: Component
  children?: RouteRecordRaw[]
  props?: Recordable
  fullPath?: string
  keepAlive?: boolean
}

interface AppCustomRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  icon: any
  name: string
  meta: RouteMeta
  component: Component
  componentName?: string
  path: string
  redirect: string
  children?: RouteRecordRaw[]
  keepAlive?: boolean
  visible?: boolean
  parentId?: number
  alwaysShow?: boolean
}

export type { AppCustomRouteRecordRaw, AppRouteRecordRaw, RouteMeta }
