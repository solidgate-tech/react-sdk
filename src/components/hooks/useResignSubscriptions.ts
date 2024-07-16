import { useCallback, useEffect, useRef } from 'react'
import {
  CardMessage,
  ClientSdkInstance,
  CustomStylesAppendedMessage,
  ErrorMessage,
  FailMessage,
  InteractionMessage,
  MessageType,
  MountedMessage,
  OrderStatusMessage,
  RedirectMessage,
  ResizeMessage,
  SubmitMessage,
  SuccessMessage,
  VerifyMessage
} from '@solidgate/client-sdk-loader'

import clientSdkEventProvider from "../../types/ClientSdkEventProvider"

export const useResignSubscriptions = (callbacks: Partial<clientSdkEventProvider>, sdkInstance: ClientSdkInstance | null) => {
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

  const onMountedRef = useRef(onMounted);
  const onErrorRef = useRef(onError);
  const onSuccessRef = useRef(onSuccess);
  const onFailRef = useRef(onFail);
  const onSubmitRef = useRef(onSubmit);
  const onVerifyRef = useRef(onVerify);
  const onCustomStylesAppendedRef = useRef(onCustomStylesAppended);
  const onFormRedirectRef = useRef(onFormRedirect);
  const onInteractionRef = useRef(onInteraction);
  const onOrderStatusRef = useRef(onOrderStatus);
  const onResizeRef = useRef(onResize);
  const onCardRef = useRef(onCard);

  const currentSdkInstanceRef = useRef<ClientSdkInstance | null>(null)

  useEffect(() => {
    onMountedRef.current = onMounted;
  }, [onMounted]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    onFailRef.current = onFail;
  }, [onFail]);

  useEffect(() => {
    onSubmitRef.current = onSubmit;
  }, [onSubmit]);

  useEffect(() => {
    onVerifyRef.current = onVerify;
  }, [onVerify]);

  useEffect(() => {
    onCustomStylesAppendedRef.current = onCustomStylesAppended;
  }, [onCustomStylesAppended]);

  useEffect(() => {
    onFormRedirectRef.current = onFormRedirect;
  }, [onFormRedirect]);

  useEffect(() => {
    onInteractionRef.current = onInteraction;
  }, [onInteraction]);

  useEffect(() => {
    onOrderStatusRef.current = onOrderStatus;
  }, [onOrderStatus]);

  useEffect(() => {
    onResizeRef.current = onResize;
  }, [onResize]);

  useEffect(() => {
    onCardRef.current = onCard;
  }, [onCard]);

  const handleMounted = useCallback((e: MessageEvent<MountedMessage>) => {
    onMountedRef.current(e.data);
  }, []);

  const handleError = useCallback((e: MessageEvent<ErrorMessage>) => {
    onErrorRef.current(e.data);
  }, []);

  const handleSuccess = useCallback((e: MessageEvent<SuccessMessage>) => {
    onSuccessRef.current(e.data);
  }, []);

  const handleFail = useCallback((e: MessageEvent<FailMessage>) => {
    onFailRef.current(e.data);
  }, []);

  const handleSubmit = useCallback((e: MessageEvent<SubmitMessage>) => {
    onSubmitRef.current(e.data);
  }, []);

  const handleVerify = useCallback((e: MessageEvent<VerifyMessage>) => {
    onVerifyRef.current(e.data);
  }, []);

  const handleCustomStylesAppended = useCallback((e: MessageEvent<CustomStylesAppendedMessage>) => {
    onCustomStylesAppendedRef.current(e.data);
  }, []);

  const handleFormRedirect = useCallback((e: MessageEvent<RedirectMessage>) => {
    onFormRedirectRef.current(e.data);
  }, []);

  const handleInteraction = useCallback((e: MessageEvent<InteractionMessage>) => {
    onInteractionRef.current(e.data);
  }, []);

  const handleOrderStatus = useCallback((e: MessageEvent<OrderStatusMessage>) => {
    onOrderStatusRef.current(e.data);
  }, []);

  const handleResize = useCallback((e: MessageEvent<ResizeMessage>) => {
    onResizeRef.current(e.data);
  }, []);

  const handleCard = useCallback((e: MessageEvent<CardMessage>) => {
    onCardRef.current(e.data);
  }, []);

  const subscribeListeners = useCallback((sdkInstance: ClientSdkInstance) => {
    currentSdkInstanceRef.current = sdkInstance;

    sdkInstance.on(MessageType.Mounted, handleMounted);
    sdkInstance.on(MessageType.Error, handleError);
    sdkInstance.on(MessageType.Success, handleSuccess);
    sdkInstance.on(MessageType.Fail, handleFail);
    sdkInstance.on(MessageType.Submit, handleSubmit);
    sdkInstance.on(MessageType.Verify, handleVerify);
    sdkInstance.on(MessageType.CustomStylesAppended, handleCustomStylesAppended);
    sdkInstance.on(MessageType.Redirect, handleFormRedirect);
    sdkInstance.on(MessageType.Interaction, handleInteraction);
    sdkInstance.on(MessageType.OrderStatus, handleOrderStatus);
    sdkInstance.on(MessageType.Resize, handleResize);
    sdkInstance.on(MessageType.Card, handleCard);
  }, []);

  useEffect(() => {
    if (sdkInstance && sdkInstance !== currentSdkInstanceRef.current) {
      currentSdkInstanceRef.current = sdkInstance;
      subscribeListeners(sdkInstance);
    }

    return () => {
      if (sdkInstance && sdkInstance !== currentSdkInstanceRef.current) {
        sdkInstance.unsubscribe(MessageType.Mounted);
        sdkInstance.unsubscribe(MessageType.Error);
        sdkInstance.unsubscribe(MessageType.Success);
        sdkInstance.unsubscribe(MessageType.Fail);
        sdkInstance.unsubscribe(MessageType.Submit);
        sdkInstance.unsubscribe(MessageType.Verify);
        sdkInstance.unsubscribe(MessageType.CustomStylesAppended);
        sdkInstance.unsubscribe(MessageType.Redirect);
        sdkInstance.unsubscribe(MessageType.Interaction);
        sdkInstance.unsubscribe(MessageType.OrderStatus);
        sdkInstance.unsubscribe(MessageType.Resize);
        sdkInstance.unsubscribe(MessageType.Card);
      }
    }
  }, [sdkInstance])

  return {
    subscribeListeners,
  }
}

export default useResignSubscriptions
