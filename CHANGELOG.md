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
