import { MutableRefObject, useCallback, useEffect, useRef } from 'react'
import {
  ClientSdkInstance,
  MessageType,
} from '@solidgate/client-sdk-loader'

import clientSdkEventProvider from "../../types/ClientSdkEventProvider"

type Callbacks = clientSdkEventProvider;

type CallbacksMapping = {
  [MessageType.Mounted]: Callbacks["onMounted"],
  [MessageType.Error]: Callbacks["onError"],
  [MessageType.Success]: Callbacks["onSuccess"],
  [MessageType.Fail]: Callbacks["onFail"],
  [MessageType.Submit]: Callbacks["onSubmit"],
  [MessageType.Verify]: Callbacks["onVerify"],
  [MessageType.CustomStylesAppended]: Callbacks["onCustomStylesAppended"],
  [MessageType.Redirect]: Callbacks["onFormRedirect"],
  [MessageType.Interaction]: Callbacks["onInteraction"],
  [MessageType.OrderStatus]: Callbacks["onOrderStatus"],
  [MessageType.Resize]: Callbacks["onResize"],
  [MessageType.Card]: Callbacks["onCard"],
}

export const useSdkEventsSubscribers = (callbacks: Partial<Callbacks>, sdkInstance: ClientSdkInstance | null) => {
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

  const updateCallbackRef = useCallback(<T extends MessageType>(callback: CallbacksMapping[T]): MutableRefObject<CallbacksMapping[T]> => {
    const callbackRef = useRef(callback);

    callbackRef.current = callback;

    return callbackRef;
  }, []);

  const callbackRefs = {
    [MessageType.Mounted]: updateCallbackRef<MessageType.Mounted>(onMounted),
    [MessageType.Error]: updateCallbackRef<MessageType.Error>(onError),
    [MessageType.Success]: updateCallbackRef<MessageType.Success>(onSuccess),
    [MessageType.Fail]: updateCallbackRef<MessageType.Fail>(onFail),
    [MessageType.Submit]: updateCallbackRef<MessageType.Submit>(onSubmit),
    [MessageType.Verify]: updateCallbackRef<MessageType.Verify>(onVerify),
    [MessageType.CustomStylesAppended]: updateCallbackRef<MessageType.CustomStylesAppended>(onCustomStylesAppended),
    [MessageType.Redirect]: updateCallbackRef<MessageType.Redirect>(onFormRedirect),
    [MessageType.Interaction]: updateCallbackRef<MessageType.Interaction>(onInteraction),
    [MessageType.OrderStatus]: updateCallbackRef<MessageType.OrderStatus>(onOrderStatus),
    [MessageType.Resize]: updateCallbackRef<MessageType.Resize>(onResize),
    [MessageType.Card]: updateCallbackRef<MessageType.Card>(onCard),
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
