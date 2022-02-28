import { InitConfig } from "@solidgate/client-sdk-loader"

import {
  GOOGLE_PAY_BUTTON_CONTAINER_ID,
  APPLE_PAY_BUTTON_CONTAINER_ID
} from "../constants"

const payButtonIds = {
  googlePayButtonParams: {
    title: 'GooglePay',
    id: GOOGLE_PAY_BUTTON_CONTAINER_ID
  },
  applePayButtonParams: {
    title: 'ApplePay',
    id: APPLE_PAY_BUTTON_CONTAINER_ID
  }
}

const getPayButtonParams = <T extends 'googlePayButtonParams' | 'applePayButtonParams'> (
    config: InitConfig,
    key: T,
    container: HTMLDivElement | null
) => {
  const payParams = {
    ...(config[key] || {})
  } as NonNullable<InitConfig[T]>

  if (payParams.containerId) {
    delete payParams.containerId
  }

  if (container) {
    if (container.id) {
      console.warn(
        `Id attribute "${container.id}" of ${payButtonIds[key].title} container will be overridden`
      )
    }

    payParams.containerId = payButtonIds[key].id
    container.id = payParams.containerId
  }

  if (Object.keys(payParams).length) {
    return payParams
  }
}

export default getPayButtonParams
