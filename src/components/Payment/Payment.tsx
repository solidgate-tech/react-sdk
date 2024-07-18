import {
  useRef,
  useEffect,
  useState,
  RefObject,
} from 'react'
import styled from "styled-components"
import {
  ClientSdkInstance,
  InitConfig,
  SdkLoader,
} from "@solidgate/client-sdk-loader"

import ClientSdkEventsProvider from "../../types/ClientSdkEventProvider"

import { IFRAME_CONTAINER_ID } from '../../constants'

import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import useSdkEventSubscribers from '../hooks/useSdkEventsSubscribers'

import getPayButtonParams from "../../utils/getPayButtonParams"

import '../../boot'

interface PaymentProps extends Partial<ClientSdkEventsProvider> {
  merchantData: InitConfig['merchantData']
  width?: string
  styles?: InitConfig['styles']
  formParams?: InitConfig['formParams']
  googlePayButtonParams?: Omit<InitConfig['googlePayButtonParams'], 'containerId'>
  applePayButtonParams?: Omit<InitConfig['applePayButtonParams'], 'containerId'>
  paypalButtonParams?: Omit<InitConfig['paypalButtonParams'], 'containerId'>
  onReadyPaymentInstance?: (paymentInstance: ClientSdkInstance) => void
  googlePayContainerRef?: RefObject<HTMLDivElement>
  applePayContainerRef?: RefObject<HTMLDivElement>
  paypalContainerRef?: RefObject<HTMLDivElement>
}

const StyledPayment = styled.div`
  iframe {
    border: none;
  }
`

const Payment = (props: PaymentProps) => {
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
    applePayButtonParams,
    googlePayButtonParams,
    paypalButtonParams,
    googlePayContainerRef,
    applePayContainerRef,
    paypalContainerRef,
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
      applePayButtonParams,
      googlePayButtonParams,
      paypalButtonParams
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

    if (paypalContainerRef?.current) {
      const paypalButtonParams = getPayButtonParams(
        props,
        'paypalButtonParams',
        paypalContainerRef.current
      )
      if (paypalButtonParams) {
        config.paypalButtonParams = paypalButtonParams
      }
    }

    return config
  }

  const subscribe = useSdkEventSubscribers({
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

  const initClientSdk = async (config: InitConfig) => {
    const clientSdk = await SdkLoader.load()
    const clientSdkInstance = clientSdk?.init(config)
    if (!sdkInstance && clientSdkInstance) {
      subscribe(clientSdkInstance)
      setSdkInstance(clientSdkInstance)
    }
  }

  useIsomorphicLayoutEffect(() => {
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

  return (
    <StyledPayment id={IFRAME_CONTAINER_ID}/>
  )
}

Payment.displayName = 'Payment'

export default Payment
