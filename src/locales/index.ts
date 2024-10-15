import { createI18n, type I18n, type I18nOptions } from 'vue-i18n'
import type { App } from 'vue'

const setHtmlPageLang = (locale: string) => {
  document.querySelector('html')?.setAttribute('lang', locale)
}

// eslint-disable-next-line import/no-mutable-exports
let i18n: I18n

const localeMap = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' }
]

const defaultLocale = localeMap[0]

const createI18nOptions = async (): Promise<I18nOptions> => {
  const defaultLocal = await import(`../../locales/langs/${defaultLocale.value}.ts`)
  const message = defaultLocal.default ?? {}
  setHtmlPageLang(defaultLocale.label)
  return {
    legacy: false,
    locale: defaultLocale.label,
    fallbackLocale: defaultLocale.label,
    messages: {
      [defaultLocale.label]: message
    },
    availableLocales: localeMap.map((v: { value: any }) => v.value),
    sync: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true
  }
}

export const setupI18n = async (app: App<Element>) => {
  const options = await createI18nOptions()
  i18n = createI18n(options)
  app.use(i18n)
}

export { i18n }
