import {
  useRef,
  useEffect,
  useState,
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

import useSdkEventSubscribers from '../hooks/useSdkEventsSubscribers'

import '../../boot'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'

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

const Resign = (props: ResignProps) => {
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
    onPaymentDetails = () => {},
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

  const subscribe = useSdkEventSubscribers({
    onMounted,
    onError,
    onSuccess,
    onFail,
    onSubmit,
    onVerify,
    onCustomStylesAppended,
    onPaymentDetails,
    onFormRedirect,
    onInteraction,
    onOrderStatus,
    onResize,
  }, sdkInstance);

  const initClientSdk = useCallback(async (resignConfig: ResignConfig) => {
    try {
      const clientSdk = await SdkLoader.load()

    const clientSdkInstance = await clientSdk?.resign(resignConfig.request, resignConfig.formConfig)

      if (!sdkInstance && clientSdkInstance) {
        subscribe(clientSdkInstance)
        setSdkInstance(clientSdkInstance)
      }
    } catch (error) {
      onResignInitFailed(error as Error);
    }
  }, [])

  useIsomorphicLayoutEffect(() => {
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

Resign.displayName = 'Resign'

export default Resign
