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
var ErrorMessage = /** @class */ (function(_super) {
  __extends(ErrorMessage, _super)
  function ErrorMessage(props) {
    var _this = _super.call(this, props) || this
    _this.setErrorMessage = function(error) {
      _this.setState({
        error: error,
      })
    }
    _this.smsvStore.onErrorMessage(_this.setErrorMessage)
    _this.state = {
      error: '',
    }
    return _this
  }
  ErrorMessage.prototype.render = function() {
    if (this.state.error) {
      return React.createElement(
        'div',
        { className: 'smsv-error-message-container' },
        React.createElement(
          'span',
          { className: 'smsv-error-message-error-tips' },
          this.state.error
        )
      )
    } else {
      return React.createElement('div', null)
    }
  }
  return ErrorMessage
})(Component)
export { ErrorMessage }
