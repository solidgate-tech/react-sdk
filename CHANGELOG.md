**1.23.1**

Fixed `customFormStyles` example for `ResignForm` in **playground**

**1.23.0**

Added `bizumButtonParams` and `bizumContainer` to the `Payment` component input properties to allow to enable and configure the Bizum

**1.22.0**

Added `pixButtonParams` and `pixContainerRef` to the `Payment` component props to allow to enable and configure the Pix button.

**1.21.0**

Added **cardCategory** to the **card** field of **Card** event

**1.20.0**

Added **pix** to the **name** field of **MountedMessage** event and to the **PayableEntity** enum

**1.19.0**

Added **pix** to the **name** field of **InteractionMessage** event

**1.18.0**

Added **binCountry** to the **card** field of **Card** event

**1.17.1**

Added **applyCoupon** type declaration to **ClientSdkInstance** interface

**1.17.0**

Added the ability to override the **SDK** script `src` via `SdkLoader.load(url)` call.

**1.16.0**

Added **descriptor** to the **order** field of **Success** and **Fail** events

**1.15.0**

Add support for React v19

**1.14.1**

Updated `README.md`

**1.14.0**

Added new fields to the `Card` event: `bin`, `cardType`, `bank`

**1.13.0**

Added `Paypal` to the `Payment` `formParams.cardBrands` component props to enable the PayPal icon to be displayed among the supported card brands on the Payment Form

Added `CardBrandIconStyle` to `appearance` of the `<Resign />` component to allow card brand icon customization on the Resign form

**1.12.0**

Added **priceBreakdown.taxRate** float to **PaymentDetails** event

**1.11.1**

**PaymentDetails** event for the Resign form

**1.11.0**

**ApplePay** js integration (see [ApplePay](https://docs.solidgate.com/payments/integrate/payment-form/apple-pay/))

**PaymentDetails** event (see [PaymentDetails](https://docs.solidgate.com/payments/integrate/payment-form/form-events/#payment-details))

**1.10.0**

Added PayPal support to the Payment Form

- Added `paypalButtonParams` and `paypalContainerRef` to the `Payment` component props to allow to enable and configure the PayPal button. See more: https://docs.solidgate.com/payments/integrate/payment-form/paypal-button/
- Extend an existing SDK events with the `paypal` entity: `mounted`, `success`, `fail`, `submit`, `interaction`;
- Extended `orderStatus` with `entity: PayableEntity` and added the `APMOrderStatus` interface to the order status event's `response` property.
- Added the `APMOrderStatus` interface corresponding to APM payments. For more information, see: https://api-docs.solidgate.com/#tag/Alternative-payment-methods/operation/webhook-apm-order-status

***

**1.9.1**

Refined the event subscription mechanism for Form SDK events.

***

**1.9.0**

Enabled SSR compatability

***

**1.8.2**

Fixed issue with `onMounted` event not being called in the resign form.

***

**1.8.1**

Update Order Status error interface:
- `error.message: string` -> `error.messages: string[]`

***

**1.8.0**

Add `onResignInitFailed` to Resign component to allow handling the case when the resign form initialization failed

***

**1.7.0**

Added new card brands to `formParams.cardBrands` parameter of the `<Payment />`:

- Rupay
- BC Card
- UnionPay
- Dankort
- GPN Card
- Troy
- Thai Payment Network
- MADA
- Bancontact
- Interac
- Bajaj

***

**1.6.0**

- Added resign form
- Updated Payment Form SDK interfaces: update method, resign method, events

***

**1.5.3**

Fixed non-passing button params to the form in case of absence of the
custom containers refs

***

**1.5.2**

Added labels, placeholders types, fixed error type

***

**1.5.1**

Moved mirror repository to github, fix README.MD link to new documentation

***

**1.5.0**

Reinit form in case of init parameters change

***

**1.4.0**

Added  **Cartes Bancaires** card brand support

***

**1.3.2**

Add support for React v18.0 and higher

***

**1.3.1**

Fixed try to render before container exists bug during second initialization 

***

**1.3.0**

Added **formParams.buttonType** config param

You may use it to set **continue** button type
```typescript
import { FormButtonType } from '@solidgate/react-sdk'

initConfig.formParams.buttonType = FormButtonType.Continue
```

***

**1.2.0**

Added **formParams.autoFocus** config param

***

**1.1.2**

Added license

***

**1.1.0**


- Added **AdditionalFields** enum
- Fixed types which controlling labels visibility (like **initConfig.formParams.cardNumberLabel**)
- Deprecated **initConfig.allowedAdditionalFields** usage
- Added **CardMessage** event
