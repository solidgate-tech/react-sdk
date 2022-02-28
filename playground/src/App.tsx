import React, {useRef} from 'react'
import Payment, {
  InitConfig,
  MessageType,
  SdkMessage,
  ClientSdkInstance,
  FormType
} from "@solidgate/react-sdk"

import './App.css'

const merchantData: InitConfig["merchantData"] = {
  merchant: process.env.REACT_APP_MERCHANT || '',
  signature: process.env.REACT_APP_SIGNATURE || '',
  paymentIntent: process.env.REACT_APP_PAYMENT_INTENT || ''
}

const googlePayButtonParams = {
  containerId: 'test',
  color: 'white'
}

const applePayButtonParams = {
  // color: 'white-outline',
  type: 'plain'
}

const formParams: InitConfig['formParams'] = {
  submitButtonText: 'Pay',
  isCardHolderVisible: true,
  headerText: 'Enter your debit or credit card details (from merchant)',
  titleText: 'Card info (from merchant)',
  formTypeClass: FormType.Default,
  googleFontLink: '//fonts.googleapis.com/css2?family=DM+Sans:ital@1&display=swap'
}

const customFormStyles = {
  submit_button: {
    'background-color': 'green',
    'font-size': '16px',
    'font-weight': 'bold',
    ':hover': {
      'background-color': 'green'
    },
    form_body: {
      'font-family': 'DM Sans'
    }
  }
}

function App () {

  const appleContainerRef = useRef(null)
  const googleContainerRef = useRef(null)

  const handleOnError = (e: SdkMessage[MessageType.Error]) => {
    // eslint-disable-next-line no-console
    console.log('error', e)
  }

  const handleOnFail = (e: SdkMessage[MessageType.Fail]) => {
    // eslint-disable-next-line no-console
    console.log('fail', e)
  }

  const handleOnMounted = (e: SdkMessage[MessageType.Mounted]) => {
    // eslint-disable-next-line no-console
    console.log('mounted', e)
  }

  const handleOrderStatus = (e: SdkMessage[MessageType.OrderStatus]) => {
    // eslint-disable-next-line no-console
    console.log('order status', e)
  }

  const handleOnResize = (e: SdkMessage[MessageType.Resize]) => {
    // eslint-disable-next-line no-console
    console.log('resize', e)
  }

  const handleOnSuccess = (e: SdkMessage[MessageType.Success]) => {
    // eslint-disable-next-line no-console
    console.log('success', e)
  }

  const handleOnSubmit = (e: SdkMessage[MessageType.Submit]) => {
    // eslint-disable-next-line no-console
    console.log('submit', e)
  }

  const handleOnInteraction = (e: SdkMessage[MessageType.Interaction]) => {
    // eslint-disable-next-line no-console
    console.log('interaction', e)
  }

  const handleOnVerify = (e: SdkMessage[MessageType.Verify]) => {
    // eslint-disable-next-line no-console
    console.log('verify', e)
  }

  const handleOnRedirectMessage = (e: SdkMessage[MessageType.Redirect]) => {
    // eslint-disable-next-line no-console
    console.log('redirect', e)
  }

  const handleOnCustomStylesAppended = (e: SdkMessage[MessageType.CustomStylesAppended]) => {
    // eslint-disable-next-line no-console
    console.log('styles appended', e)
  }

  const handleOnReadyPaymentInstance = (form: ClientSdkInstance) => {
    // eslint-disable-next-line no-console
    console.log('form', form)
  }

  return (
    <div className="App">
      <div ref={appleContainerRef} />
      <Payment
        googlePayButtonParams={googlePayButtonParams}
        applePayButtonParams={applePayButtonParams}
        googlePayContainerRef={googleContainerRef}
        applePayContainerRef={appleContainerRef}
        merchantData={merchantData}
        styles={customFormStyles}
        formParams={formParams}
        onError={handleOnError}
        onFail={handleOnFail}
        onMounted={handleOnMounted}
        onOrderStatus={handleOrderStatus}
        onResize={handleOnResize}
        onSuccess={handleOnSuccess}
        onSubmit={handleOnSubmit}
        onInteraction={handleOnInteraction}
        onVerify={handleOnVerify}
        onFormRedirect={handleOnRedirectMessage}
        onCustomStylesAppended={handleOnCustomStylesAppended}
        onReadyPaymentInstance={handleOnReadyPaymentInstance}
      />
        <div ref={googleContainerRef} />
    </div>
  )
}

export default App
