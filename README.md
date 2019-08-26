> A react component for sms verification

### JRE

```javascript
 node  "^8.10.0 || ^10.13.0 || >=11.10.1"
 antd
```

## 📦 Install

```bash
npm install @thebund1st/smsv-react
```

```bash
yarn add @thebund1st/smsv-react
```

## 🔨 Usage

```javascript
import * as smsv from '@thebund1st/smsv-react'

OR

const smsv = require('@thebund1st/smsv-react')
```

```javascript
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

## ⌨️ Development

[![Open in GitHub]](https://github.com/TheBund1st/daming-ui.git)

Or clone locally:

```bash
$ git clone git@github.com:TheBund1st/daming-ui.git
$ cd daming-ui
$ yarn
$ yarn start
```
