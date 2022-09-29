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
