var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]
        }
      return extendStatics(d, b)
    }
    return function(d, b) {
      extendStatics(d, b)
      function __() {
        this.constructor = d
      }
      d.prototype =
        b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
    }
  })()
import * as React from 'react'
import { Component } from '../baseComponent'
import { Input, Button } from 'antd'
var CodeVerification = /** @class */ (function(_super) {
  __extends(CodeVerification, _super)
  function CodeVerification(props) {
    var _this = _super.call(this, props) || this
    _this.state = {
      isBtnDisable: true,
      inputCodeVerificationErrorStatus: false,
      codeVerification: '',
      placeHolder: '输入验证码',
      errorTips: '输入验证码',
      codeVerificationBtnText: '获取验证码',
    }
    _this.intervalLeftSecond = 0
    _this.intervalInstance = null
    _this.resetInterval = function() {
      _this.intervalLeftSecond = _this.props.fetchCodeIntervalSecond
      _this.intervalInstance && clearInterval(_this.intervalInstance)
      _this.setState({
        codeVerificationBtnText: '获取验证码',
        isBtnDisable: !_this.isCodeDependencyEnable,
      })
    }
    _this.setInterval = function() {
      _this.intervalLeftSecond = _this.props.fetchCodeIntervalSecond
      _this.setState({
        isBtnDisable: true,
        codeVerificationBtnText:
          _this.intervalLeftSecond-- + '\u79D2\u540E\u91CD\u8BD5',
      })
      _this.intervalInstance = setInterval(function() {
        _this.setState({
          codeVerificationBtnText:
            _this.intervalLeftSecond-- + '\u79D2\u540E\u91CD\u8BD5',
        })
        if (_this.intervalLeftSecond == -1) {
          _this.resetInterval()
        }
      }, 1000)
    }
    _this.isCodeDependencyEnable = false
    _this.sendCodeStatus = function(enable) {
      _this.isCodeDependencyEnable = enable
      enable && _this.resetInterval()
    }
    _this.sendCode = function() {
      var isBtnDisable = _this.state.isBtnDisable
      if (!isBtnDisable) {
        _this.smsvStore.fetchSMSVCode()
        _this.setInterval()
      }
    }
    _this.onCodeVerificationChange = function(event) {
      var errorMsg = _this.props.config.errorMsg
      var code = event.target.value.trim()
      var errorTips = ''
      if (code === '') {
        errorTips = errorMsg.emptyCode
      } else if (code.length > _this.props.codeLen) {
        errorTips = errorMsg.lengthMismatch
      }
      _this.setState({
        codeVerification: code,
        // TODO: why here
        // setBtnTextTimeOut: null,
        inputCodeVerificationErrorStatus:
          code === '' || code.length > _this.props.codeLen,
        errorTips: errorTips,
      })
      _this.smsvStore.changeCode(code)
      _this.smsvStore.changeSMSVStatus(code !== '', _this.componentKey)
    }
    _this.onBlur = function() {
      var codeVerification = _this.state.codeVerification
      _this.onCodeVerificationChange({ target: { value: codeVerification } })
    }
    _this.smsvStore.onCodeVerificationStatusChange(_this.sendCodeStatus)
    return _this
  }
  CodeVerification.prototype.render = function() {
    var _a = this.state,
      codeVerification = _a.codeVerification,
      placeHolder = _a.placeHolder,
      codeVerificationBtnText = _a.codeVerificationBtnText,
      isBtnDisable = _a.isBtnDisable,
      inputCodeVerificationErrorStatus = _a.inputCodeVerificationErrorStatus,
      errorTips = _a.errorTips
    return React.createElement(
      'div',
      { className: 'smsv-code-verification-container' },
      React.createElement(
        'div',
        { className: 'smsv-code-verification-action-container' },
        React.createElement(Input, {
          value: codeVerification,
          placeholder: placeHolder,
          onChange: this.onCodeVerificationChange,
          onBlur: this.onBlur,
        }),
        React.createElement(
          Button,
          { type: 'primary', disabled: isBtnDisable, onClick: this.sendCode },
          codeVerificationBtnText
        )
      ),
      inputCodeVerificationErrorStatus &&
        React.createElement(
          'div',
          { className: 'smsv-code-verification-error-tips' },
          errorTips
        )
    )
  }
  CodeVerification.defaultProps = {
    fetchCodeIntervalSecond: 3,
    codeLen: 4,
    config: {
      errorMsg: {
        emptyCode: '请输入验证码',
        lengthMismatch: '验证码长度无效',
      },
    },
  }
  return CodeVerification
})(Component)
export { CodeVerification }
