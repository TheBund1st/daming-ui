# SMSV----A react component for sms verification

## 🌍 Runtime Environment

```javascript
 node  "^8.10.0 || ^10.13.0 || >=11.10.1"
```

## 📦 Install

```bash
npm install @thebund1st/smsv-react
```

```bash
yarn add @thebund1st/smsv-react
```

## ⌨️ Development

clone locally:

```bash
$ git clone git@github.com:TheBund1st/daming-ui.git
$ cd daming-ui
$ yarn
$ yarn start
```

## 🔨 Usage

```javascript
import * as smsv from '@thebund1st/smsv-react'
//OR
const smsv = require('@thebund1st/smsv-react')
```

```javascript
<smsv.Container
onFetchCode={this.onFetchCode}
onVerifyCode={this.onVerifyCode}
/>
<smsv.PhoneNumber />
//<smsv.ImageVerification />
//You can't use smsv.ImageVerification and our Nightwatch Test module at the same time,we will find the way to handle this problem.
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

// See daming-ui/example/demos to get more infomation about example.
// The source code is located into daming-ui/src folder.
// The compiled Code is located into daming-ui/lib folder.
```
