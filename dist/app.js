/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// set the state in local storage, once we have the access token delete it\n// get the query string params\n// do a fetch\n// get the data\n// request.query.code && request.query.state\n// if we done have a code and state then do this\nvar urlParams = new URLSearchParams(window.location.search);\nvar code = urlParams.get('code');\nvar state = urlParams.get('state');\nvar accessToken = localStorage.getItem('accessToken');\n\nif (code === null && accessToken === null) {\n  var _state = new Date().getTime();\n\n  window.location = \"https://relaxed-meninsky-eaf91e.netlify.com/.netlify/functions/oauth?state=\".concat(_state);\n}\n\nfunction getToken() {\n  var urlParams = new URLSearchParams(window.location.search);\n  return fetch(\"https://relaxed-meninsky-eaf91e.netlify.com/.netlify/functions/accessToken?code=\".concat(code, \"&state=\").concat(state)).then(function (res) {\n    return res.json();\n  }).then(function (res) {\n    localStorage.setItem('accessToken', res.access_token);\n    return res.access_token;\n  });\n}\n\nfunction formatAmount(amount) {\n  return \"\\xA3\".concat(((amount > 0 ? Math.abs(amount) : amount) / 100).toFixed(2));\n}\n\nfunction startApp(accessToken) {\n  fetch('https://api.monzo.com/transactions?account_id=acc_00009cHB2QXoGDnGy8XFkf', {\n    method: 'get',\n    headers: {\n      'authorization': \"Bearer \".concat(accessToken)\n    }\n  }).then(function (res) {\n    return res.json();\n  }).then(function (res) {\n    var transactions = res.transactions;\n    transactions.reverse();\n    var list = transactions.map(function (transaction) {\n      return \"<li><p>\".concat(transaction.description, \"</p> <p>\").concat(formatAmount(transaction.local_amount), \" - \").concat(transaction.category, \" - \").concat(transaction.created, \"</p></li>\");\n    }).join('');\n    document.querySelector('.root').innerHTML = \"<ul>\".concat(list, \"</ul>\");\n  });\n}\n\nif (code !== null && state !== null || accessToken) {\n  if (accessToken) {\n    startApp(accessToken);\n  } else {\n    getToken().then(function (result) {\n      return startApp(result);\n    });\n  }\n}\n\n//# sourceURL=webpack:///./main.js?");

/***/ })

/******/ });