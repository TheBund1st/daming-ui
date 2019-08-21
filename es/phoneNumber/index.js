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
import { Input, Icon } from 'antd'
var PhoneNumber = /** @class */ (function(_super) {
  __extends(PhoneNumber, _super)
  function PhoneNumber() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this
    _this.state = {
      phoneNumber: '',
      inputPhoneNumberErrorStatus: false,
    }
    _this.onPhoneNumberChange = function(event) {
      var maxLength = _this.props.maxLength
      var phoneNumber = event.target.value
      if (phoneNumber.length > maxLength) {
        phoneNumber = phoneNumber.slice(0, maxLength)
      }
      var validation = _this.props.validation
      var inputPhoneNumberErrorStatus = validation(phoneNumber)
      _this.setState({
        phoneNumber: phoneNumber,
        inputPhoneNumberErrorStatus: inputPhoneNumberErrorStatus,
      })
      _this.smsvStore.changeSMSVStatus(
        !inputPhoneNumberErrorStatus,
        _this.componentKey
      )
      if (!inputPhoneNumberErrorStatus) {
        _this.smsvStore.changePhoneNumber(phoneNumber)
      } else {
        _this.smsvStore.changePhoneNumber('')
      }
    }
    _this.onBlur = function() {
      var phoneNumber = _this.state.phoneNumber
      var validation = _this.props.validation
      var inputPhoneNumberErrorStatus = validation(phoneNumber)
      _this.setState({
        inputPhoneNumberErrorStatus: inputPhoneNumberErrorStatus,
      })
    }
    return _this
  }
  PhoneNumber.prototype.render = function() {
    var _a = this.state,
      phoneNumber = _a.phoneNumber,
      inputPhoneNumberErrorStatus = _a.inputPhoneNumberErrorStatus
    var _b = this.props,
      placeHolder = _b.placeHolder,
      maxLength = _b.maxLength,
      prefix = _b.prefix,
      suffix = _b.suffix,
      errorTips = _b.errorTips
    return React.createElement(
      'div',
      { className: 'smsv-phone-number-container' },
      React.createElement(Input, {
        type: 'number',
        maxLength: maxLength,
        value: phoneNumber,
        placeholder: placeHolder,
        prefix: prefix,
        suffix: suffix,
        onChange: this.onPhoneNumberChange,
        onBlur: this.onBlur,
        className: inputPhoneNumberErrorStatus
          ? 'smsv-phone-number-error-input'
          : '',
      }),
      inputPhoneNumberErrorStatus &&
        React.createElement(
          'div',
          { className: 'smsv-phone-number-error-tips' },
          errorTips
        )
    )
  }
  PhoneNumber.defaultProps = {
    placeHolder: '请输入手机号码',
    maxLength: 20,
    errorTips: '手机号码格式有误',
    prefix: React.createElement(Icon, { type: 'mobile' }),
    suffix: React.createElement(
      'span',
      null,
      '\u8BF7\u586B\u5199\u63A5\u6536\u9A8C\u8BC1\u7801\u7684\u624B\u673A\u53F7\u7801'
    ),
    validation: function(phoneNum) {
      var status = false
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phoneNum)) {
        status = true
      }
      return status
    },
  }
  return PhoneNumber
})(Component)
export { PhoneNumber }
