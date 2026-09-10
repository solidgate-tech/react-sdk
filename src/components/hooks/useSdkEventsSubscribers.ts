import { MutableRefObject, useCallback, useEffect, useRef } from 'react'
import {
  ClientSdkInstance,
  MessageType,
} from '@solidgate/client-sdk-loader'

import clientSdkEventProvider, { WalletCardTypeCallback } from "../../types/ClientSdkEventProvider"

export const WALLET_CARD_TYPE_EVENT = 'walletCardType'

type SdkEventsSubscribers = Partial<clientSdkEventProvider> & {
  onWalletCardType?: WalletCardTypeCallback
}

export const useSdkEventsSubscribers = (callbacks: SdkEventsSubscribers, sdkInstance: ClientSdkInstance | null) => {
  const {
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
    onCard = () => {},
    onPaymentDetails = () => {},
    onInvoicePreview = () => {},
    onWalletCardType = () => {},
  } = callbacks;

  const updateCallbackRef = <T>(callback: T): MutableRefObject<T> => {
    const callbackRef = useRef(callback);

    callbackRef.current = callback;

    return callbackRef;
  };

  const callbackRefs = {
    [MessageType.Mounted]: updateCallbackRef(onMounted),
    [MessageType.Error]: updateCallbackRef(onError),
    [MessageType.Success]: updateCallbackRef(onSuccess),
    [MessageType.Fail]: updateCallbackRef(onFail),
    [MessageType.Submit]: updateCallbackRef(onSubmit),
    [MessageType.Verify]: updateCallbackRef(onVerify),
    [MessageType.CustomStylesAppended]: updateCallbackRef(onCustomStylesAppended),
    [MessageType.Redirect]: updateCallbackRef(onFormRedirect),
    [MessageType.Interaction]: updateCallbackRef(onInteraction),
    [MessageType.OrderStatus]: updateCallbackRef(onOrderStatus),
    [MessageType.Resize]: updateCallbackRef(onResize),
    [MessageType.Card]: updateCallbackRef(onCard),
    [MessageType.PaymentDetails]: updateCallbackRef(onPaymentDetails),
    [MessageType.InvoicePreview]: updateCallbackRef(onInvoicePreview),
    [WALLET_CARD_TYPE_EVENT]: updateCallbackRef(onWalletCardType),
  }

  const subscribe = useCallback((sdkInstance: ClientSdkInstance) => {
    sdkInstance.on(MessageType.Mounted, (e) => callbackRefs[MessageType.Mounted].current(e.data));
    sdkInstance.on(MessageType.Error, (e) => callbackRefs[MessageType.Error].current(e.data));
    sdkInstance.on(MessageType.Success, (e) => callbackRefs[MessageType.Success].current(e.data));
    sdkInstance.on(MessageType.Fail, (e) => callbackRefs[MessageType.Fail].current(e.data));
    sdkInstance.on(MessageType.Submit, (e) => callbackRefs[MessageType.Submit].current(e.data));
    sdkInstance.on(MessageType.Verify, (e) => callbackRefs[MessageType.Verify].current(e.data));
    sdkInstance.on(MessageType.CustomStylesAppended, (e) => callbackRefs[MessageType.CustomStylesAppended].current(e.data));
    sdkInstance.on(MessageType.Redirect, (e) => callbackRefs[MessageType.Redirect].current(e.data));
    sdkInstance.on(MessageType.Interaction, (e) => callbackRefs[MessageType.Interaction].current(e.data));
    sdkInstance.on(MessageType.OrderStatus, (e) => callbackRefs[MessageType.OrderStatus].current(e.data));
    sdkInstance.on(MessageType.Resize, (e) => callbackRefs[MessageType.Resize].current(e.data));
    sdkInstance.on(MessageType.Card, (e) => callbackRefs[MessageType.Card].current(e.data));
    sdkInstance.on(MessageType.PaymentDetails, (e) => callbackRefs[MessageType.PaymentDetails].current(e.data));
    sdkInstance.on(MessageType.InvoicePreview, (e) => callbackRefs[MessageType.InvoicePreview].current(e.data));
    sdkInstance.on(WALLET_CARD_TYPE_EVENT, (event, pauseUntil) => callbackRefs[WALLET_CARD_TYPE_EVENT].current(event.data, pauseUntil));
  }, []);

  const unsubscribe = useCallback((sdkInstance: ClientSdkInstance) => {
    Object.values(MessageType).forEach((type) => {
      sdkInstance.unsubscribe(type);
    });

    sdkInstance.unsubscribe(WALLET_CARD_TYPE_EVENT);
  }, []);

  useEffect(() => {
    return () => {
      if (sdkInstance) {
        unsubscribe(sdkInstance);
      }
    }
  }, []);

  return subscribe;
}

export default useSdkEventsSubscribers
