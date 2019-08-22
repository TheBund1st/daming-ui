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
import { VerificationCodeRender } from '../verificationCodeRender'
var ImageVerification = /** @class */ (function(_super) {
  __extends(ImageVerification, _super)
  function ImageVerification() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this
    _this.state = {
      verificationCode: '',
      drawImageText: '',
      errorTips: '请输入正确的图片验证码',
      inputImageNumberErrorStatus: false,
      imageVerificationResult: false,
    }
    _this.canvasRef = null
    _this.getCanvasRef = function(ref) {
      _this.canvasRef = ref
    }
    _this.refreshImage = function() {
      var verificationCode = _this.state.verificationCode
      var inputImageNumberErrorStatus = false
      if (verificationCode === '') {
        inputImageNumberErrorStatus = true
      }
      _this.setState({
        inputImageNumberErrorStatus: inputImageNumberErrorStatus,
      })
      _this.drawVerificationCode()
    }
    _this.drawVerificationCode = function() {
      _this.smsvStore.changeSMSVStatus(false, _this.componentKey)
      var verificationCodeRender = new VerificationCodeRender({
        targetCanvas: _this.canvasRef,
        codeLen: _this.props.codeLength,
        width: 100,
        height: 30,
      })
      var drawImageText = verificationCodeRender.drawVerificationCode()
      _this.setState({
        drawImageText: drawImageText,
      })
    }
    _this.onVerificationCodeChange = function(event) {
      var verificationCode = event.target.value
      var _a = _this.state,
        drawImageText = _a.drawImageText,
        inputImageNumberErrorStatus = _a.inputImageNumberErrorStatus
      var sendCodeStatus = false
      if (
        verificationCode.length === drawImageText.length &&
        verificationCode.toLowerCase() === drawImageText.toLowerCase()
      ) {
        inputImageNumberErrorStatus = false
        sendCodeStatus = true
      } else if (verificationCode.length < drawImageText.length) {
        inputImageNumberErrorStatus = false
      }
      _this.smsvStore.changeSMSVStatus(sendCodeStatus, _this.componentKey)
      _this.setState({
        verificationCode: verificationCode,
        inputImageNumberErrorStatus: inputImageNumberErrorStatus,
      })
    }
    return _this
  }
  ImageVerification.prototype.componentDidMount = function() {
    this.drawVerificationCode()
  }
  ImageVerification.prototype.onBlur = function() {
    var _a = this.state,
      verificationCode = _a.verificationCode,
      drawImageText = _a.drawImageText,
      inputImageNumberErrorStatus = _a.inputImageNumberErrorStatus
    if (verificationCode.toLowerCase() === drawImageText.toLowerCase()) {
      inputImageNumberErrorStatus = false
    } else {
      inputImageNumberErrorStatus = true
    }
    this.smsvStore.changeSMSVStatus(
      !inputImageNumberErrorStatus,
      this.componentKey
    )
    this.setState({
      inputImageNumberErrorStatus: inputImageNumberErrorStatus,
    })
  }
  ImageVerification.prototype.render = function() {
    var _this = this
    var _a = this.state,
      verificationCode = _a.verificationCode,
      inputImageNumberErrorStatus = _a.inputImageNumberErrorStatus,
      errorTips = _a.errorTips
    var codeLength = this.props.codeLength
    return React.createElement(
      'div',
      { className: 'smsv-image-verification-container' },
      React.createElement(
        'div',
        { className: 'smsv-input-canvas-container' },
        React.createElement(
          'div',
          { className: 'smsv-input-container' },
          React.createElement(Input, {
            maxLength: codeLength,
            value: verificationCode,
            placeholder: '\u8BF7\u8F93\u5165\u53F3\u4FA7\u9A8C\u8BC1\u7801',
            prefix: React.createElement(Icon, { type: 'robot' }),
            onChange: this.onVerificationCodeChange,
            onBlur: function() {
              _this.onBlur()
            },
            className: inputImageNumberErrorStatus
              ? 'smsv-image-verification-error-input'
              : '',
          })
        ),
        React.createElement(
          'div',
          { className: 'smsv-image-verification-action-container' },
          React.createElement('canvas', {
            id: 'smsv-image-verification-canvas',
            width: '100px',
            height: '30px',
            ref: this.getCanvasRef,
          }),
          React.createElement(
            'div',
            {
              className: 'smsv-image-verification-refresh',
              onClick: this.refreshImage,
            },
            React.createElement(Icon, { type: 'sync' })
          )
        )
      ),
      inputImageNumberErrorStatus &&
        React.createElement(
          'div',
          { className: 'smsv-image-verification-error-tips' },
          errorTips
        )
    )
  }
  ImageVerification.defaultProps = {
    codeLength: 4,
  }
  return ImageVerification
})(Component)
export { ImageVerification }
