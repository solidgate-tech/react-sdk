import {
  FC,
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  RefObject,
  memo,
} from 'react'
import styled from "styled-components"

import {
  ClientSdkInstance,
  InitConfig,
  SdkLoader,
} from "@solidgate/client-sdk-loader"

import ClientSdkEventsProvider from "../../types/ClientSdkEventProvider"

import { IFRAME_CONTAINER_ID } from '../../constants'

import usePaymentSubscriptions from "./usePaymentSubscriptions"

import getPayButtonParams from "../../utils/getPayButtonParams"
import '../../boot'

interface PaymentProps extends Partial<ClientSdkEventsProvider> {
  merchantData: InitConfig['merchantData']
  width?: string
  styles?: InitConfig['styles']
  formParams?: InitConfig['formParams']
  googlePayButtonParams?: Omit<InitConfig['googlePayButtonParams'], 'containerId'>
  applePayButtonParams?: Omit<InitConfig['applePayButtonParams'], 'containerId'>
  onReadyPaymentInstance?: (paymentInstance: ClientSdkInstance) => void
  googlePayContainerRef?: RefObject<HTMLDivElement>
  applePayContainerRef?: RefObject<HTMLDivElement>
}

const StyledPayment = styled.div`
  iframe {
    border: none;
  }
`

const Payment: FC<PaymentProps> = (props) => {
  const previousInitConfig = useRef<{
    config: InitConfig
    key: string
  }>()

  const [sdkInstance, setSdkInstance] = useState<ClientSdkInstance | null>(null)

  const {
    merchantData,
    width,
    styles,
    formParams,
    googlePayContainerRef,
    applePayContainerRef,
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
    onReadyPaymentInstance = () => {},
    onCard = () => {}
  } = props

  const getInitConfig = () => {
    if (!merchantData) {
      throw new Error("Attribute 'merchantData' is required")
    }

    const config: InitConfig = {
      merchantData: merchantData,
      iframeParams: {
        containerId: IFRAME_CONTAINER_ID,
        ...(width && {width})
      },
      ...(formParams && {formParams}),
      ...(styles && {styles}),
    }

    if (googlePayContainerRef?.current) {
      const googleButtonParams = getPayButtonParams(
        props,
        'googlePayButtonParams',
        googlePayContainerRef.current
      )

      if (googleButtonParams) {
        config.googlePayButtonParams = googleButtonParams
      }
    }

    if (applePayContainerRef?.current) {
      const appleButtonParams = getPayButtonParams(
        props,
        'applePayButtonParams',
        applePayContainerRef.current
      )
      if (appleButtonParams) {
        config.applePayButtonParams = appleButtonParams
      }
    }

    return config
  }

  const initClientSdk = async (config: InitConfig) => {
    const clientSdk = await SdkLoader.load()
    const clientSdkInstance = clientSdk.init(config)
    if (!sdkInstance) {
      setSdkInstance(clientSdkInstance)
    }
  }

  useLayoutEffect(() => {
    const config = getInitConfig()
    const key = JSON.stringify(config)

    if (previousInitConfig.current?.key !== key) {
      previousInitConfig.current = {
        config,
        key
      }

      initClientSdk(config)
    }
  })

  useEffect(() => {
    if (sdkInstance) {
      onReadyPaymentInstance(sdkInstance)
    }
  }, [sdkInstance])

  usePaymentSubscriptions({
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
    onCard,
  }, sdkInstance)

  return (
    <StyledPayment id={IFRAME_CONTAINER_ID}/>
  )
}

export default memo(Payment)
