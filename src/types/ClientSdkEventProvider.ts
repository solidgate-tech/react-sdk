import {
  SdkMessage,
  WalletCardTypeEventData,
  WalletCardTypeSideEffect
} from "@solidgate/client-sdk-loader"

type ClientSdkEventsProvider = {
  [key in keyof SdkMessage as `on${Capitalize<key>}`]: (e: SdkMessage[key]) => void
}

export type WalletCardTypeCallback = (
  data: WalletCardTypeEventData,
  pauseUntil: (sideEffect: WalletCardTypeSideEffect) => void
) => void

export default ClientSdkEventsProvider
