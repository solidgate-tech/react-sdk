import { isBrowser } from '../utils/isBrowser'

const sdkInitType = 'react'

declare global {
  interface Window {
    __SOLIDGATE_PRIVATE__SDK_INIT_TYPE: string
  }
}

if (isBrowser) {
  window.__SOLIDGATE_PRIVATE__SDK_INIT_TYPE = sdkInitType
}


export {}
