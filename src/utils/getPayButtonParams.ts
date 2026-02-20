import { InitConfig } from "@solidgate/client-sdk-loader"

import {
  GOOGLE_PAY_BUTTON_CONTAINER_ID,
  APPLE_PAY_BUTTON_CONTAINER_ID,
  PAYPAL_BUTTON_CONTAINER_ID,
  PIX_BUTTON_CONTAINER_ID,
  PIX_QR_BUTTON_CONTAINER_ID,
  BIZUM_BUTTON_CONTAINER_ID,
  BLIK_BUTTON_CONTAINER_ID,
  MBWAY_BUTTON_CONTAINER_ID
} from '../constants'

const payButtonIds = {
  googlePayButtonParams: {
    title: 'GooglePay',
    id: GOOGLE_PAY_BUTTON_CONTAINER_ID
  },
  applePayButtonParams: {
    title: 'ApplePay',
    id: APPLE_PAY_BUTTON_CONTAINER_ID
  },
  paypalButtonParams: {
    title: 'PayPal',
    id: PAYPAL_BUTTON_CONTAINER_ID
  },
  pixButtonParams: {
    title: 'Pix',
    id: PIX_BUTTON_CONTAINER_ID
  },
  pixQrButtonParams: {
    title: 'Pix QR',
    id: PIX_QR_BUTTON_CONTAINER_ID
  },
  bizumButtonParams: {
    title: 'Bizum',
    id: BIZUM_BUTTON_CONTAINER_ID
  },
  blikButtonParams: {
    title: 'Blik',
    id: BLIK_BUTTON_CONTAINER_ID
  },
  mbwayButtonParams: {
    title: 'MB WAY',
    id: MBWAY_BUTTON_CONTAINER_ID
  }
}

const getPayButtonParams = <T extends 'googlePayButtonParams' | 'applePayButtonParams' | 'paypalButtonParams' | 'pixButtonParams'  | 'pixQrButtonParams' | 'bizumButtonParams' | 'blikButtonParams' | 'mbwayButtonParams'> (
    config: InitConfig,
    key: T,
    container: HTMLDivElement | null
) => {
  const syntheticContainerId = payButtonIds[key].id;
  const payParams = {
    ...(config[key] || {})
  } as NonNullable<InitConfig[T]>

  if (payParams.containerId) {
    delete payParams.containerId
  }

  if (container) {
    if (container.id && container.id !== syntheticContainerId) {
      console.warn(
        `Id attribute "${container.id}" of ${payButtonIds[key].title} container will be overridden`
      )
    }

    payParams.containerId = syntheticContainerId
    container.id = payParams.containerId
  }

  if (Object.keys(payParams).length) {
    return payParams
  }
}

export default getPayButtonParams
