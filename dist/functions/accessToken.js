parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"7KBa":[function(require,module,exports) {
"use strict";module.exports=exports=self.fetch,exports.default=self.fetch.bind(self),exports.Headers=self.Headers,exports.Request=self.Request,exports.Response=self.Response;
},{}],"2vpj":[function(require,module,exports) {
"use strict";var t=e(require("node-fetch"));function e(t){return t&&t.__esModule?t:{default:t}}exports.handler=function(e,o,r){var n="".concat(void 0),i="".concat(void 0),c="".concat(void 0),a=e.queryStringParameters.code,s=e.queryStringParameters.state;if(a&&s)try{var d={grant_type:"authorization_code",client_id:n,redirect_uri:c,client_secret:i,code:a};(0,t.default)("https://api.monzo.com/oauth2/token",{method:"POST",body:JSON.stringify(d),headers:{"Content-Type":"application/json"}}).then(function(t){return t.json()}).then(function(t){r(null,{statusCode:200,body:JSON.stringify(t)})}).catch(function(t){console.log(t),r(null,{statusCode:500,body:JSON.stringify({error:"Error: ".concat(t.message)})})})}catch(u){console.log(u),r(null,{statusCode:500,body:JSON.stringify({error:"Error: ".concat(u.message)})})}else r(null,{statusCode:500,body:JSON.stringify({error:"No code provided"})})};
},{"node-fetch":"7KBa"}]},{},["2vpj"], null)
//# sourceMappingURL=/accessToken.map