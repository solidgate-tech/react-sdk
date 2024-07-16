import {
  FC,
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  memo,
  useCallback
} from 'react'
import styled from "styled-components"

import {
  ClientSdkInstance,
  ResignRequest,
  ResignFormConfig,
  SdkLoader,
} from "@solidgate/client-sdk-loader"

import ClientSdkEventsProvider from "../../types/ClientSdkEventProvider"
import ResignConfig from "../../types/ResignConfig"

import { IFRAME_CONTAINER_ID } from '../../constants'

import useResignSubscriptions from '../hooks/useResignSubscriptions'

import '../../boot'

interface ResignProps extends Partial<Omit<ClientSdkEventsProvider, 'onCard'>> {
  resignRequest: ResignRequest,
  container?: NonNullable<ResignFormConfig['container']>,
  appearance?: NonNullable<ResignFormConfig['appearance']>,
  styles?: NonNullable<ResignFormConfig['styles']>,
  onReadyResignInstance?: (paymentInstance: ClientSdkInstance) => void
  onResignInitFailed?: (error: Error) => void
}

const StyledPayment = styled.div`
  iframe {
    border: none;
  }
`

const Resign: FC<ResignProps> = (props) => {
  const previousResignConfig = useRef<{
    config: ResignConfig
    key: string
  }>()

  const [sdkInstance, setSdkInstance] = useState<ClientSdkInstance | null>(null)

  const {
    resignRequest,
    container,
    appearance,
    styles,
    onMounted = () => {},
    onError = () => {},
    onSuccess = () => {},
    onFail = () => {},
    onSubmit = () => {},
    onVerify = () => {},
    onCustomStylesAppended = () => {},
    onFormRedirect = () => {},
    onInteraction = () => {},
    onOrderStatus = () => {},
    onResize = () => {},
    onReadyResignInstance = () => {},
    onResignInitFailed = () => {}
  } = props

  const getResignConfig = () => {
    const formConfig: ResignFormConfig = {
      container: {
        ...container,
        id: IFRAME_CONTAINER_ID
      }
    };

    if (appearance) {
      formConfig.appearance = appearance
    }
    if (styles) {
      formConfig.styles = styles
    }

    const result: ResignConfig = {
      request: resignRequest,
      formConfig
    };

    return result;
  }

  const { subscribeListeners } = useResignSubscriptions({
    onMounted,
    onError,
    onSuccess,
    onFail,
    onSubmit,
    onVerify,
    onCustomStylesAppended,
    onFormRedirect,
    onInteraction,
    onOrderStatus,
    onResize,
  }, sdkInstance);

  const initClientSdk = useCallback(async (resignConfig: ResignConfig) => {
    try {
      const clientSdk = await SdkLoader.load()

    const clientSdkInstance = await clientSdk.resign(resignConfig.request, resignConfig.formConfig)

      if (!sdkInstance) {
        subscribeListeners(clientSdkInstance)
        setSdkInstance(clientSdkInstance)
      }
    } catch (error) {
      onResignInitFailed(error as Error);
    }
  }, [])

  useLayoutEffect(() => {
    const config = getResignConfig()
    const key = JSON.stringify(config)

    if (previousResignConfig.current?.key !== key) {
      previousResignConfig.current = {
        config,
        key
      }

      initClientSdk(config)
    }
  })

  useEffect(() => {
    if (sdkInstance) {
      onReadyResignInstance(sdkInstance)
    }
  }, [sdkInstance])

  return (
    <StyledPayment id={IFRAME_CONTAINER_ID}/>
  )
}

export default memo(Resign)
