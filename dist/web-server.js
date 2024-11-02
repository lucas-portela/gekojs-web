"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebServer = void 0;
var errors_1 = require("./errors");
var types_1 = require("./types");
var express = require("express");
var WebServer = /** @class */ (function () {
    function WebServer(_config) {
        this._config = _config;
        this._listening = false;
        this._defaultMime = "application/json";
        this._expressApp = express();
        if (this._config.parseJson !== false)
            this._expressApp.use(express.json());
    }
    WebServer.prototype.middleware = function (params) {
        var _this = this;
        if (this._listening)
            throw new errors_1.AddingRouteAfterListeningError();
        this._expressApp.get(params.route, function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var status, callNext, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = function (code) { return (res.statusCode = code); };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (!["get", "search", "delete"].includes(req.method)) return [3 /*break*/, 3];
                        return [4 /*yield*/, params.handler(req.query, status)];
                    case 2:
                        callNext = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!["get", "search", "delete"].includes(req.method)) return [3 /*break*/, 5];
                        return [4 /*yield*/, params.handler(req.query, status)];
                    case 4:
                        callNext = _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_1 = _a.sent();
                        console.error(err_1);
                        throw err_1;
                    case 7:
                        if (callNext)
                            next();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    WebServer.prototype.listen = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var _a;
            _this._expressApp.listen((_a = _this._config.port) !== null && _a !== void 0 ? _a : 80, function () {
                resolve();
            });
        });
    };
    WebServer.prototype.get = function (params) {
        var _this = this;
        if (this._listening)
            throw new errors_1.AddingRouteAfterListeningError();
        this._expressApp.get(params.route, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var status, _a, _b;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        status = function (code) { return (res.statusCode = code); };
                        res.setHeader("content-type", (_c = params.mime) !== null && _c !== void 0 ? _c : this._defaultMime);
                        _b = (_a = res).send;
                        return [4 /*yield*/, params.handler(req.query, status)];
                    case 1:
                        _b.apply(_a, [_d.sent()]);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    WebServer.prototype.post = function (params) {
        var _this = this;
        if (this._listening)
            throw new errors_1.AddingRouteAfterListeningError();
        this._expressApp.post(params.route, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var status, _a, _b;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        status = function (code) { return (res.statusCode = code); };
                        res.setHeader("content-type", (_c = params.mime) !== null && _c !== void 0 ? _c : this._defaultMime);
                        _b = (_a = res).send;
                        return [4 /*yield*/, params.handler(req.body, status)];
                    case 1:
                        _b.apply(_a, [_d.sent()]);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    WebServer.prototype.put = function (params) {
        var _this = this;
        if (this._listening)
            throw new errors_1.AddingRouteAfterListeningError();
        this._expressApp.put(params.route, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var status, _a, _b;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        status = function (code) { return (res.statusCode = code); };
                        res.setHeader("content-type", (_c = params.mime) !== null && _c !== void 0 ? _c : this._defaultMime);
                        _b = (_a = res).send;
                        return [4 /*yield*/, params.handler(req.body, status)];
                    case 1:
                        _b.apply(_a, [_d.sent()]);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    WebServer.prototype.search = function (params) {
        var _this = this;
        if (this._listening)
            throw new errors_1.AddingRouteAfterListeningError();
        this._expressApp.search(params.route, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var status, _a, _b;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        status = function (code) { return (res.statusCode = code); };
                        res.setHeader("content-type", (_c = params.mime) !== null && _c !== void 0 ? _c : this._defaultMime);
                        _b = (_a = res).send;
                        return [4 /*yield*/, params.handler(req.query, status)];
                    case 1:
                        _b.apply(_a, [_d.sent()]);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    WebServer.prototype.delete = function (params) {
        var _this = this;
        if (this._listening)
            throw new errors_1.AddingRouteAfterListeningError();
        this._expressApp.delete(params.route, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var status, _a, _b;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        status = function (code) { return (res.statusCode = code); };
                        res.setHeader("content-type", (_c = params.mime) !== null && _c !== void 0 ? _c : this._defaultMime);
                        _b = (_a = res).send;
                        return [4 /*yield*/, params.handler(req.query, status)];
                    case 1:
                        _b.apply(_a, [_d.sent()]);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    WebServer.prototype.endpoint = function (params) {
        var _a;
        var method = (_a = params.method) !== null && _a !== void 0 ? _a : types_1.WebServerMethod.Get;
        this[method](params);
    };
    return WebServer;
}());
exports.WebServer = WebServer;
//# sourceMappingURL=web-server.js.map