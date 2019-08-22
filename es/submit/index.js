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
import { Button } from 'antd'
var Submit = /** @class */ (function(_super) {
  __extends(Submit, _super)
  function Submit(props) {
    var _this = _super.call(this, props) || this
    _this.setSubmitStatus = function(enable) {
      _this.setState({
        isBtnEnable: enable,
      })
    }
    _this.onClick = function() {
      _this.smsvStore.verifyCode()
    }
    _this.state = {
      isBtnEnable: true,
    }
    _this.smsvStore.onSubmitStatusChange(_this.setSubmitStatus)
    return _this
  }
  Submit.prototype.render = function() {
    var isBtnEnable = this.state.isBtnEnable
    var _a = this.props.btnText,
      btnText = _a === void 0 ? '登录' : _a
    return React.createElement(
      'div',
      { className: 'smsv-submit-container' },
      React.createElement(
        Button,
        { disabled: isBtnEnable, onClick: this.onClick },
        btnText
      )
    )
  }
  return Submit
})(Component)
export { Submit }
