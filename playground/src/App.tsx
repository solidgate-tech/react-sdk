import React from 'react'
import PaymentForm from './PaymentForms/PaymentForm'
import ResignForm from './PaymentForms/ResignForm'

import './App.css'

function App () {
  const [isPaymentFormVisible, setIsPaymentFormVisible] = React.useState(true)

  return (
    <div className="App">
      {
        isPaymentFormVisible && (
          <div className="form-container">
            Payment form
            <PaymentForm />
          </div>
        )
      }
      {
        !isPaymentFormVisible && (
          <div className="form-container">
            Resign form
            <ResignForm />
          </div>
        )
      }
      <button onClick={() => setIsPaymentFormVisible(!isPaymentFormVisible)} className="form-switch">
        {isPaymentFormVisible ? 'Show resign form' : 'Show payment form'}
      </button>
    </div>
  )
}

export default App
