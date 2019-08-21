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
import { Checkbox, Modal, Button } from 'antd'
var Agreement = /** @class */ (function(_super) {
  __extends(Agreement, _super)
  function Agreement(props) {
    var _this = _super.call(this, props) || this
    _this.defaultModalCloseText = '关闭'
    _this.onAgreeChange = function() {
      _this.setState(
        function(prevState) {
          return {
            isAgreementChecked: !prevState.isAgreementChecked,
          }
        },
        function() {
          _this.smsvStore.changeSMSVStatus(
            _this.state.isAgreementChecked,
            _this.componentKey
          )
        }
      )
    }
    _this.onAgreementContentClick = function(content) {
      var openByPopupInfo = content.openByPopupInfo
      if (!!content.openByNewTabUrl) {
        window.open(content.openByNewTabUrl)
      } else if (!!openByPopupInfo) {
        var title = openByPopupInfo.title,
          content_1 = openByPopupInfo.content,
          closeText = openByPopupInfo.closeText,
          className = openByPopupInfo.className
        _this.setState({
          modalTitle: title,
          modalContent: content_1,
          modalClassName: className,
          isModalVisible: true,
          modalCloseText: closeText || _this.defaultModalCloseText,
        })
      }
    }
    _this.onModalClose = function() {
      _this.setState({
        isModalVisible: false,
      })
    }
    _this.state = {
      modalTitle: '',
      modalContent: null,
      modalCloseText: '',
      modalClassName: null,
      isModalVisible: false,
      isAgreementChecked: false,
    }
    return _this
  }
  Agreement.prototype.render = function() {
    var _this = this
    var _a = this.props,
      preText = _a.preText,
      agreements = _a.agreements
    var _b = this.state,
      modalTitle = _b.modalTitle,
      modalContent = _b.modalContent,
      modalCloseText = _b.modalCloseText,
      modalClassName = _b.modalClassName,
      isModalVisible = _b.isModalVisible,
      isAgreementChecked = _b.isAgreementChecked
    return React.createElement(
      'div',
      { className: 'smsv-agreement-container' },
      React.createElement(Checkbox, {
        onChange: this.onAgreeChange,
        className: 'smsv-agreement-checkbox',
        checked: isAgreementChecked,
      }),
      React.createElement(
        Modal,
        {
          title: modalTitle,
          closable: true,
          maskClosable: true,
          className: modalClassName,
          visible: isModalVisible,
          onCancel: this.onModalClose,
          footer: React.createElement(
            Button,
            { onClick: this.onModalClose },
            modalCloseText
          ),
        },
        modalContent
      ),
      React.createElement(
        'span',
        { className: 'smsv-agreement-pretext', onClick: this.onAgreeChange },
        preText
      ),
      agreements.map(function(x, index) {
        return React.createElement(
          'span',
          {
            className: 'smsv-agreement-text',
            onClick: _this.onAgreementContentClick.bind(_this, x),
            key: index,
          },
          x.text
        )
      })
    )
  }
  return Agreement
})(Component)
export { Agreement }
