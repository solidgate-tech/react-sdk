# Solidgate react-sdk

This repository is a React wrapper for the Solidgate Client Software Development Kit (SDK).

It supports rendering payment forms and resign forms, including custom container elements for <a href="https://docs.solidgate.com/payments/integrate/payment-form/google-pay-button/" target="_blank">Google Pay</a>, <a href="https://docs.solidgate.com/payments/integrate/payment-form/apple-pay-button/" target="_blank">Apple Pay</a>, or <a href="https://docs.solidgate.com/payments/integrate/payment-form/paypal-button/" target="_blank">PayPal</a> buttons.

Check our
* <a href="https://docs.solidgate.com/" target="_blank">Payment guide</a> to understand business value better
* <a href="https://api-docs.solidgate.com/" target="_blank">API Reference</a> to find more examples of usage

## Structure

<table style="width: 100%; background: transparent;">
  <colgroup>
    <col style="width: 50%;">
    <col style="width: 50%;">
  </colgroup>
  <tr>
    <th>SDK for React contains</th>
    <th>Table of contents</th>
  </tr>
  <tr>
    <td>
      <code>src</code> – main React SDK source code<br>
      <code>public</code> – public folder or example usage<br>
      <code>playground</code> – example app or playground<br>
      <code>package.json</code> – project metadata and dependency definitions
    </td>
    <td>
      <a href="https://github.com/solidgate-tech/react-sdk?tab=readme-ov-file#installation">Installation</a><br>
      <a href="https://github.com/solidgate-tech/react-sdk?tab=readme-ov-file#usage">Usage</a><br>
      <a href="https://github.com/solidgate-tech/react-sdk?tab=readme-ov-file#development-server">Development server</a><br>
      <a href="https://github.com/solidgate-tech/react-sdk?tab=readme-ov-file#build">Build</a>
    </td>
  </tr>
</table>

<br>

## Installation

Run the following command in your React project:

```
npm install --save @solidgate/react-sdk
```

<br>

## Usage

### Payment form

Render a <a href="https://docs.solidgate.com/payments/integrate/payment-form/create-your-payment-form/" target="_blank">payment form</a> component in your React project.

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
  const paypalContainerRef = useRef(null)

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
      <div ref={paypalContainerRef} />
      <Payment
          googlePayButtonParams={googlePayButtonParams}
          applePayButtonParams={applePayButtonParams}
          paypalButtonParams={paypalButtonParams}
          googlePayContainerRef={googleContainerRef}
          applePayContainerRef={appleContainerRef}
          paypalContainerRef={paypalContainerRef}
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

### Resign form

Render a <a href="https://docs.solidgate.com/payments/integrate/payment-form/resign-payment-form/" target="_blank">resign payment form</a> component in your React project.

```tsx
const resignRequest = {
  merchant: '<<--YOUR MERCHANT ID-->>',
  signature: '<<--YOUR SIGNATURE OF THE REQUEST-->>',
  resignIntent: '<<--YOUR RESIGN INTENT-->>'
}

function App () {
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

  const handleOnReadyResignInstance = (form: ClientSdkInstance) => {
    // eslint-disable-next-line no-console
    console.log('resign form', form)
  }

  return (
    <Resign
      resignRequest={resignRequest}
      appearance={appearanceConfig}
      styles={customStyles}
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
      onReadyResignInstance={handleOnReadyResignInstance}
    />
  )
}
```

<br>

## Development server

1. `cd playground`
2. `npm i`
3. `npm run start`
4. `Navigate to http://localhost:3000/`

<br>

## Build

Run ``` npm run build ``` to build the project.

The build artifacts will be stored in the `dist/` directory.
