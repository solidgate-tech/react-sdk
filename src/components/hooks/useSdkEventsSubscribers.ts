import { MutableRefObject, useCallback, useEffect, useRef } from 'react'
import {
  ClientSdkInstance,
  MessageType,
} from '@solidgate/client-sdk-loader'

import clientSdkEventProvider from "../../types/ClientSdkEventProvider"

export const useSdkEventsSubscribers = (callbacks: Partial<clientSdkEventProvider>, sdkInstance: ClientSdkInstance | null) => {
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
  }, []);

  const unsubscribe = useCallback((sdkInstance: ClientSdkInstance) => {
    Object.values(MessageType).forEach((type) => {
      sdkInstance.unsubscribe(type);
    });
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
