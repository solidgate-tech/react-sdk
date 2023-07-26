# Solid react-sdk

## Installation

```
npm install --save @solidgate/react-sdk
```

## Minimal example

```tsx
import React from 'react'
import ReactDOM from 'react-dom';
import Payment, { SdkMessage, MessageType, ClientSdkInstance} from "@solidgate/react-sdk"

/**
 * Configuration, as it described here
 * https://docs.solidgate.com/payments/integrate/payment-form/create-your-payment-form/
 */

const merchantData = {
    merchant: '<<--YOUR MERCHANT ID-->>',
    signature: '<<--YOUR SIGNATURE OF THE REQUEST-->>',
    paymentIntent: '<<--YOUR PAYMENT INTENT-->>'
  }
  
const App = () => {

  const appleContainerRef = useRef(null)
  const googleContainerRef = useRef(null)

  const handleOnError = (e: SdkMessage[MessageType.Error]) => {}

  const handleOnFail = (e: SdkMessage[MessageType.Fail]) => {}

  const handleOnMounted = (e: SdkMessage[MessageType.Mounted]) => {}

  const handleOrderStatus = (e: SdkMessage[MessageType.OrderStatus]) => {}

  const handleOnResize = (e: SdkMessage[MessageType.Resize]) => {}

  const handleOnSuccess = (e: SdkMessage[MessageType.Success]) => {}

  const handleOnSubmit = (e: SdkMessage[MessageType.Submit]) => {}

  const handleOnInteraction = (e: SdkMessage[MessageType.Interaction]) => {}

  const handleOnVerify = (e: SdkMessage[MessageType.Verify]) => {}

  const handleOnRedirectMessage = (e: SdkMessage[MessageType.Redirect]) => {}

  const handleOnCustomStylesAppended = (e: SdkMessage[MessageType.CustomStylesAppended]) => {}
  
  const handleCard = (e: SdkMessage[MessageType.Card]) => {}
  
  const handleOnReadyPaymentInstance = (form: ClientSdkInstance) => {
    // eslint-disable-next-line no-console
    console.log('form', form)
  }

  return (
    <div>
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
          onCard={handleCard}
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
  
ReactDOM.render(<App />, document.body);

```

## Build

Run ``` npm run build ``` to build the project. The build artifacts will be stored in the dist/ directory.

## Development

1. `cd playground`
2. `npm i`
3. `npm run start`
4. Navigate to http://localhost:3000/. 
