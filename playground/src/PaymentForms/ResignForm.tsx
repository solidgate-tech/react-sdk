import React, { useState } from 'react'
import {
  MessageType,
  SdkMessage,
  ClientSdkInstance,
  Resign,
  ResignRequest, ResignFormConfig
} from '@solidgate/react-sdk'

import './Form.css'

const resignRequest: ResignRequest = {
  merchant: process.env.REACT_APP_RESIGN_MERCHANT || '',
  signature: process.env.REACT_APP_RESIGN_SIGNATURE || '',
  resignIntent: process.env.REACT_APP_RESIGN_INTENT || ''
}

const initialAppearance: NonNullable<ResignFormConfig['appearance']> = {
  autoFocus: false,
  submitButtonText: 'Resign submit',
  allowSubmit: true,
  resignCvvLabel: 'CVV',
  resignCvvPlaceholder: 'Enter CV2',
  hideCvvNumbers: false
}

const customFormStyles = {
  submit_button: {
    'background-color': 'green',
    'font-size': '16px',
    'font-weight': 'bold',
    ':hover': {
      'background-color': 'green'
    },
  }
}

function App () {
  const [appearance, setAppearance] = useState(initialAppearance)

  const handleOnError = (e: SdkMessage[MessageType.Error]) => {
    // eslint-disable-next-line no-console
    console.log('resign error', e)
  }

  const handleOnFail = (e: SdkMessage[MessageType.Fail]) => {
    // eslint-disable-next-line no-console
    console.log('resign fail', e)
  }

  const handleOnMounted = (e: SdkMessage[MessageType.Mounted]) => {
    // eslint-disable-next-line no-console
    console.log('resign mounted', e)
  }

  const handleOrderStatus = (e: SdkMessage[MessageType.OrderStatus]) => {
    // eslint-disable-next-line no-console
    console.log('resign order status', e)
  }

  const handleOnResize = (e: SdkMessage[MessageType.Resize]) => {
    // eslint-disable-next-line no-console
    console.log('resign resize', e)
  }

  const handleOnSuccess = (e: SdkMessage[MessageType.Success]) => {
    // eslint-disable-next-line no-console
    console.log('resign success', e)
  }

  const handleOnSubmit = (e: SdkMessage[MessageType.Submit]) => {
    // eslint-disable-next-line no-console
    console.log('resign submit', e)
  }

  const handleOnInteraction = (e: SdkMessage[MessageType.Interaction]) => {
    // eslint-disable-next-line no-console
    console.log('resign interaction', e)
  }

  const handleOnVerify = (e: SdkMessage[MessageType.Verify]) => {
    // eslint-disable-next-line no-console
    console.log('resign verify', e)
  }

  const handleOnRedirectMessage = (e: SdkMessage[MessageType.Redirect]) => {
    // eslint-disable-next-line no-console
    console.log('resign redirect', e)
  }

  const handleOnCustomStylesAppended = (e: SdkMessage[MessageType.CustomStylesAppended]) => {
    // eslint-disable-next-line no-console
    console.log('resign styles appended', e)
  }

  const handleOnReadyResignInstance = (form: ClientSdkInstance) => {
    // eslint-disable-next-line no-console
    console.log('resign form', form)
  }

  return (
    <div className="form">
      <button onClick={() => {
        setAppearance({
          ...appearance,
          allowSubmit: !appearance.allowSubmit,
        })
      }}>Toggle resign template</button>
      <Resign
        resignRequest={resignRequest}
        appearance={appearance}
        styles={customFormStyles}
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
    </div>
  )
}

export default App
