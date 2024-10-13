import { sxzz } from '@sxzz/eslint-config'
export default sxzz(
  [
    /* your custom config */
  ],
  {
    prettier: true,
    markdown: true,
    vue: true, // auto detection
    unocss: false // auto detection
  }
)
