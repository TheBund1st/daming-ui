var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import { Agreement } from './agreement';
import { CodeVerification } from './codeVerification';
import { ImageVerification } from './imageVerification';
import { PhoneNumber } from './phoneNumber';
import { Submit } from './submit';
import { ErrorMessage } from './errorMessage';
import { SmsvStore } from './smsvStore';
var cloneDeep = require('lodash.clonedeep');
var SMSVControls = [
    Agreement,
    CodeVerification,
    ImageVerification,
    PhoneNumber,
    Submit,
    ErrorMessage,
];
var SMSVStateControls = [
    Agreement,
    CodeVerification,
    ImageVerification,
    PhoneNumber,
];
var CodeDependency = [PhoneNumber, ImageVerification];
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container(props) {
        var _this = _super.call(this, props) || this;
        _this.store = new SmsvStore();
        _this.smsvControlStatusCache = {};
        _this.children = [];
        _this.phoneNumber = '';
        _this.state = {
            phoneNumber: '',
        };
        _this.generateChildren = function () {
            ;
            _this.props.children.forEach(function (child, index) {
                var cloned = cloneDeep(child);
                var componentKey = index;
                cloned.key = componentKey;
                if (SMSVStateControls.includes(cloned.type)) {
                    cloned.props.smsvStore = _this.store;
                    cloned.props.componentKey = componentKey;
                    _this.smsvControlStatusCache[componentKey] = {
                        isVerified: false,
                        isCodeDependency: CodeDependency.includes(cloned.type),
                    };
                }
                else if (SMSVControls.includes(cloned.type)) {
                    cloned.props.smsvStore = _this.store;
                }
                _this.children.push(cloned);
            });
        };
        _this.onFetchCode = function () { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.onFetchCode(this.smsvInfo.phoneNumber)];
                    case 1:
                        res = _a.sent();
                        this.store.setErrorMessage(res);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onVerifyCode = function () { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.onVerifyCode({
                            phoneNumber: this.smsvInfo.phoneNumber,
                            code: this.smsvInfo.code,
                        })];
                    case 1:
                        res = _a.sent();
                        this.store.setErrorMessage(res);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onSMSVStatusChange = function (enable, componentKey) {
            _this.smsvControlStatusCache[componentKey].isVerified = enable;
            _this.updateSubmitStatus();
            _this.updateCodeControlStatus();
        };
        _this.updateCodeControlStatus = function () {
            var isCodeDependencyDisable = !!Object.values(_this.smsvControlStatusCache).find(function (x) { return !x.isVerified && x.isCodeDependency; });
            _this.store.changeCodeVerificationStatus(!isCodeDependencyDisable);
        };
        _this.updateSubmitStatus = function () {
            var isSubmitDisable = !!Object.values(_this.smsvControlStatusCache).find(function (x) { return !x.isVerified; });
            _this.store.changeSubmitStatus(isSubmitDisable);
        };
        _this.store.onSMSVStatusChange(_this.onSMSVStatusChange);
        _this.store.onSMSVFetchCode(_this.onFetchCode);
        _this.store.onVerifyCode(_this.onVerifyCode);
        _this.generateChildren();
        return _this;
    }
    Object.defineProperty(Container.prototype, "smsvInfo", {
        get: function () {
            var _a = this.store.state, phoneNumber = _a.phoneNumber, code = _a.code;
            return {
                code: code,
                phoneNumber: phoneNumber,
            };
        },
        enumerable: true,
        configurable: true
    });
    Container.prototype.render = function () {
        return React.createElement("div", { className: "smsv-container" }, this.children);
    };
    return Container;
}(React.Component));
export { Container };
