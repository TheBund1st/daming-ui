import * as React from 'react'
import smsv from '../env'
import './index.scss'

import { Icon } from 'antd'

type Props = {
  onFetchCode: Function
  onVerifyCode: Function
}

type State = {}

export class DefaultDemo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="smsv-agreement-container">
        <div className="default-demo-container">
          <smsv.Container
            onFetchCode={this.props.onFetchCode}
            onVerifyCode={this.props.onVerifyCode}
          >
            <smsv.PhoneNumber
              placeHolder="请输入尚未注册过的手机号码"
              maxLength={12}
              prefix={<Icon type="mobile" />}
              suffix={<span>* 需要尚未注册过的号码哟</span>}
              errorTips="手机号码格式有误"
              validation={(phoneNum: string) => {
                let status = false
                if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phoneNum)) {
                  status = true
                }
                return status
              }}
            />
            {/* <smsv.ImageVerification /> */}
            <smsv.CodeVerification fetchCodeIntervalSecond={5} />
            <smsv.Agreement
              preText="登录或注册帐号即代表您同意本公司的"
              agreements={[
                {
                  text: '隐私声明',
                  openByPopupInfo: {
                    title: '隐私条款',
                    content: <div>条款内容</div>,
                    closeText: '我知道了',
                  },
                },
                {
                  text: '隐私声明2',
                  openByNewTabUrl: 'https://www.baidu.com',
                },
              ]}
            />
            <smsv.Agreement
              preText="我已经阅读且同意"
              agreements={[
                {
                  text: '个人信息数据的使用目的',
                  openByPopupInfo: {
                    title: '个人信息数据的使用目的',
                    content: (
                      <>
                        <div key={1}>
                          1.我确认出于下述促销目的而发送内含促销和消息内容的通告,
                          包括大奖赛、邀请函、专属打折优惠和关于 C0STA
                          CROCIERE歌诗达邮轮最新产品和服务的遇知。
                        </div>
                        <div key={2}>
                          2.我同意接收分析消典者习惯,
                          用于定制服务和向顾客发送最有趣的讯息、顾客满意度调查问卷和顾客关怀活动.
                        </div>
                        <div key={3}>
                          3.我同意向歌诗达邮轮集团内部实体及其商业合作伙伴、无论位于欧盟境内或境外披露个人数据,
                          用于发送信息和/或与其产品和服务相关的广告资料
                        </div>
                      </>
                    ),
                    closeText: '我知道了',
                  },
                },
              ]}
            />
            <smsv.Submit />
            <smsv.ErrorMessage />
          </smsv.Container>
        </div>
      </div>
    )
  }
}
