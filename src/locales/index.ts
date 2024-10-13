import { createI18n, type I18n, type I18nOptions } from 'vue-i18n'
import type { App } from 'vue'

const setHtmlPageLang = (locale: string) => {
  document.querySelector('html')?.setAttribute('lang', locale)
}

const localeMap = [
  {
    lang: 'zh-CN',
    name: '简体中文'
  }
]

const createI18nOptions = async (): Promise<I18nOptions> => {
  const locale = {
    lang: 'zh-CN',
    name: '简体中文'
  }
  const defaultLocal = await import(`../../locales/langs/${locale.lang}.ts`)
  const message = defaultLocal.default ?? {}

  setHtmlPageLang(locale.lang)

  return {
    legacy: false,
    locale: locale.lang,
    fallbackLocale: locale.lang,
    messages: {
      [locale.lang]: message
    },
    availableLocales: localeMap.map((v: { lang: any }) => v.lang),
    sync: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true
  }
}

export const setupI18n = async (app: App<Element>) => {
  const options = await createI18nOptions()
  const i18n = createI18n(options) as I18n
  app.use(i18n)
}
