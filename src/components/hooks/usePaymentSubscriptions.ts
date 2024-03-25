import {useEffect} from "react"
import {ClientSdkInstance, MessageType} from "@solidgate/client-sdk-loader"

import clientSdkEventProvider from "../../types/ClientSdkEventProvider"

export const usePaymentSubscriptions = (callbacks: Partial<clientSdkEventProvider>, sdkInstance: ClientSdkInstance | null) => {
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
  } = callbacks

  useEffect(() => {
    sdkInstance?.on(MessageType.Mounted, (e) => onMounted(e.data))
    return () => sdkInstance?.unsubscribe(MessageType.Mounted)
  }, [sdkInstance, onMounted])

  useEffect(() => {
    sdkInstance?.on(MessageType.Error, (e) =>  onError(e.data))
    return () => sdkInstance?.unsubscribe(MessageType.Error)
  }, [sdkInstance, onError])

  useEffect(() => {
    sdkInstance?.on(MessageType.Success, (e) => onSuccess(e.data))
    return () => sdkInstance?.unsubscribe(MessageType.Success)
  }, [sdkInstance, onSuccess])

  useEffect(() => {
    sdkInstance?.on(MessageType.Fail, (e) => onFail(e.data))
    return () => sdkInstance?.unsubscribe(MessageType.Fail)
  }, [sdkInstance, onFail])

  useEffect(() => {
    sdkInstance?.on(MessageType.Submit, (e) => onSubmit(e.data))
    return () => sdkInstance?.unsubscribe(MessageType.Submit)
  }, [sdkInstance, onSubmit])

  useEffect(() => {
    sdkInstance?.on(MessageType.Verify, (e) => onVerify(e.data))
    return () => sdkInstance?.unsubscribe(MessageType.Verify)
  }, [sdkInstance, onVerify])

  useEffect(() => {
    sdkInstance?.on(MessageType.CustomStylesAppended, (e) => onCustomStylesAppended(e.data))
    return () => sdkInstance?.unsubscribe(MessageType.CustomStylesAppended)
  }, [sdkInstance, onCustomStylesAppended])

  useEffect(() => {
    sdkInstance?.on(MessageType.Redirect, (e) => onFormRedirect(e.data))
    return () => sdkInstance?.unsubscribe(MessageType.Redirect)
  }, [sdkInstance, onFormRedirect])

  useEffect(() => {
    sdkInstance?.on(MessageType.Interaction, (e) => onInteraction(e.data))
    return () => sdkInstance?.unsubscribe(MessageType.Interaction)
  }, [sdkInstance, onInteraction])

  useEffect(() => {
    sdkInstance?.on(MessageType.OrderStatus, (e) => onOrderStatus(e.data))
    return () => sdkInstance?.unsubscribe(MessageType.OrderStatus)
  }, [sdkInstance, onOrderStatus])

  useEffect(() => {
    sdkInstance?.on(MessageType.Resize, (e) => onResize(e.data))
    return () => sdkInstance?.unsubscribe(MessageType.Resize)
  }, [sdkInstance, onResize])

  useEffect(() => {
    sdkInstance?.on(MessageType.Card, (e) => onCard(e.data))
    return () => sdkInstance?.unsubscribe(MessageType.Card)
  }, [sdkInstance, onCard])
}

export default usePaymentSubscriptions
