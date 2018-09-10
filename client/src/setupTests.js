"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var globalAny = global;
(globalAny.requestAnimationFrame = function (cb) {
    setTimeout(cb, 0);
});
var enzyme = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
var fetch = require("isomorphic-fetch");
enzyme.configure({ adapter: new Adapter() });
globalAny.fetch = function (url, args) {
    var headers = { 'Authorization': 'Basic dHl0dXM6cGFzc3dvcmQ=' };
    if (args.headers) {
        var additionalHeaders = args.headers.reduce(function (accum, item) {
            accum[item[0]] = item[1];
            return accum;
        }, {});
        Object.assign(headers, additionalHeaders);
        delete args.headers;
    }
    return fetch(url, __assign({ headers: headers }, args));
};
