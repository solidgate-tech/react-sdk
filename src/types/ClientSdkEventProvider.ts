import { SdkMessage } from "@solidgate/client-sdk-loader"

type ClientSdkEventsProvider = {
  [key in keyof SdkMessage as `on${Capitalize<key>}`]: (e: SdkMessage[key]) => void
}

export default ClientSdkEventsProvider
