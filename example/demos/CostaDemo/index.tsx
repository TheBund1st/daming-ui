import * as React from 'react'
import smsv from '../env'
import './index.scss'

import { Icon } from 'antd'

type Props = {
  onFetchCode: Function
  onVerifyCode: Function
}

type State = {}

export class CostaDemo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="costa-demo-container">
        <div className="left left-login">
          <div>
            <img
              className="background"
              alt="login background"
              src={require('./login-bg.png')}
            />
            <div className="guide">
              <div className="guide-steps">
                <div className="vertical-line"></div>
                <div className="step-1">
                  <div className="num">01</div>
                  <div className="step-content">注册歌诗达</div>
                </div>
                <div className="step-2">
                  <div className="num">02</div>
                  <div className="step-content">关注公众号</div>
                </div>
              </div>
              <div className="tips">只需两步, 即可成功领取会员福利!</div>
              <div className="term">
                <span>详情请见歌诗达邮轮“C家会员”</span>
                <a className="term-condition">会员政策</a>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div>
            <div className="title">手机登录/注册</div>
          </div>
          <div>
            <smsv.Container
              onFetchCode={this.props.onFetchCode}
              onVerifyCode={this.props.onVerifyCode}
            >
              <smsv.PhoneNumber
                placeHolder="请输入手机号"
                maxLength={12}
                prefix={<Icon type="mobile" />}
                suffix={<span>*第一次填写后不可修改</span>}
                errorTips="手机号码格式有误"
                validation={(phoneNum: string) => {
                  let status = false
                  if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phoneNum)) {
                    status = true
                  }
                  return status
                }}
              />
              <smsv.ImageVerification />
              <smsv.CodeVerification fetchCodeIntervalSecond={5} codeLen={4} />
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
                ]}
              />
              <smsv.Agreement
                preText="我已经阅读且同意的"
                agreements={[
                  {
                    text: '个人信息数据的使用目',
                    openByPopupInfo: {
                      title: '隐私条款',
                      content: <div>条款内容</div>,
                      closeText: '我知道了',
                    },
                  },
                ]}
              />

              <smsv.Submit btnText="立即登录/注册" />
              <smsv.ErrorMessage />
            </smsv.Container>
          </div>
        </div>
      </div>
    )
  }
}
