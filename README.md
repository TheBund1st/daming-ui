> A react component for sms verification

### Usage

```javascript
import * as smsv from '@thebund1st/smsv-react'
var smsv = require('@thebund1st/smsv-react')

<smsv.Container
    onFetchCode={this.onFetchCode}
    onVerifyCode={this.onVerifyCode}
>
<smsv.PhoneNumber />
<smsv.ImageVerification />
<smsv.CodeVerification />
<smsv.Agreement
    preText="please read the agreement"
    agreements={[
        {
            text: 'Agreement1',
            openByPopupInfo: {
                title: 'Agreement1',
                content: <div>the agreement content</div>,
                closeText: 'I Known',
            },
        },
        {
            text: 'Agreement2',
            openByNewTabUrl: 'https://www.google.com',
        },
    ]}
/>
<smsv.Submit />
<smsv.ErrorMessage />
<smsv.Container>
```
