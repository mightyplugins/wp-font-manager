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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fonts = __webpack_require__(10);

var _fonts2 = _interopRequireDefault(_fonts);

var _panel = __webpack_require__(11);

var _panel2 = _interopRequireDefault(_panel);

var _notify = __webpack_require__(12);

var _notify2 = _interopRequireDefault(_notify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    fonts: _fonts2.default,
    panel: _panel2.default,
    notify: _notify2.default
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__(14);
var isArguments = __webpack_require__(15);

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(7);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _FontManager = __webpack_require__(8);

var _FontManager2 = _interopRequireDefault(_FontManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_FontManager2.default, null), document.getElementById('wfm-wrap'));

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Toolbar = __webpack_require__(9);

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Fonts = __webpack_require__(13);

var _Fonts2 = _interopRequireDefault(_Fonts);

var _Settings = __webpack_require__(17);

var _Settings2 = _interopRequireDefault(_Settings);

var _MyFonts = __webpack_require__(18);

var _MyFonts2 = _interopRequireDefault(_MyFonts);

var _Pagination = __webpack_require__(20);

var _Pagination2 = _interopRequireDefault(_Pagination);

var _Notification = __webpack_require__(21);

var _Notification2 = _interopRequireDefault(_Notification);

var _database = __webpack_require__(1);

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*global wfm_data*/


var FontManager = function (_Component) {
    _inherits(FontManager, _Component);

    function FontManager(props) {
        _classCallCheck(this, FontManager);

        var _this = _possibleConstructorReturn(this, (FontManager.__proto__ || Object.getPrototypeOf(FontManager)).call(this, props));

        _this.setValues = _this.setValues.bind(_this);

        _this.state = {
            fonts: _database2.default.fonts.fonts,
            allfonts: _database2.default.fonts.allfonts,
            loader: _database2.default.fonts.loader,
            demoText: _database2.default.fonts.demoText,
            currentPage: _database2.default.fonts.currentPage,
            enabledFonts: _database2.default.fonts.enabledFonts,
            enabledFontsAll: _database2.default.fonts.enabledFontsAll,
            enabledFontFamilies: _database2.default.fonts.enabledFontFamilies,
            showPanel: _database2.default.panel.show,
            apiKey: _database2.default.fonts.apiKey
        };
        return _this;
    }

    _createClass(FontManager, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _database2.default.panel.on('change', this.setValues);
            _database2.default.fonts.on('change', this.setValues);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _database2.default.panel.removeListener('change', this.setValues);
            _database2.default.fonts.removeListener('change', this.setValues);
        }
    }, {
        key: 'setValues',
        value: function setValues() {
            this.setState({
                fonts: _database2.default.fonts.fonts,
                allfonts: _database2.default.fonts.allfonts,
                loader: _database2.default.fonts.loader,
                demoText: _database2.default.fonts.demoText,
                currentPage: _database2.default.fonts.currentPage,
                enabledFonts: _database2.default.fonts.enabledFonts,
                enabledFontFamilies: _database2.default.fonts.enabledFontFamilies,
                apiKey: _database2.default.fonts.apiKey,
                showPanel: _database2.default.panel.show
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'wfm-area' },
                _react2.default.createElement(_Toolbar2.default, { enabledFonts: this.state.enabledFonts, apiKey: this.state.apiKey }),
                this.state.showPanel == 'settings' && _react2.default.createElement(_Settings2.default, { apiKey: this.state.apiKey }),
                this.state.showPanel == 'myfonts' && _react2.default.createElement(_MyFonts2.default, { enabledFontsAll: this.state.enabledFontsAll }),
                this.state.fonts.length != 0 && _react2.default.createElement(
                    'div',
                    { className: 'wfm-api-setting-field wfm-demo-text-section' },
                    _react2.default.createElement(
                        'label',
                        { htmlFor: 'demotext' },
                        wfm_data.demo_text
                    ),
                    _react2.default.createElement('input', { type: 'text', name: 'demotext', id: 'demotext', cols: '100', rows: '3', defaultValue: _database2.default.fonts.demoText, onChange: function onChange(e) {
                            _database2.default.fonts.handleActions({
                                type: 'CHANGE_DEMO_TEXT',
                                text: e.target.value
                            });
                        } })
                ),
                this.state.apiKey == '' && _react2.default.createElement(
                    'div',
                    { className: 'wfm-no-apikey' },
                    wfm_data.no_api
                ),
                _react2.default.createElement(_Fonts2.default, { fonts: this.state.fonts, isLoading: this.state.loader, demoText: this.state.demoText, perPage: '20', currentPage: this.state.currentPage, enabledFontFamilies: this.state.enabledFontFamilies }),
                this.state.fonts.length != 0 && _react2.default.createElement(_Pagination2.default, { fontsToRender: this.state.fonts.length, currentPage: this.state.currentPage }),
                _react2.default.createElement(_Notification2.default, null)
            );
        }
    }]);

    return FontManager;
}(_react.Component);

exports.default = FontManager;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _jquery = __webpack_require__(2);

var _jquery2 = _interopRequireDefault(_jquery);

var _database = __webpack_require__(1);

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*global wfm_data*/


var Toolbar = function (_Component) {
    _inherits(Toolbar, _Component);

    function Toolbar(props) {
        _classCallCheck(this, Toolbar);

        var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props));

        _this.searchFonts = _this.searchFonts.bind(_this);
        _this.filterFonts = _this.filterFonts.bind(_this);
        return _this;
    }

    _createClass(Toolbar, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.$filter = (0, _jquery2.default)(this.filter);
            this.$filter.selectize();
            this.$filter.on('change', this.filterFonts);

            this.$language = (0, _jquery2.default)(this.language);
            this.$language.selectize();
            this.$language.on('change', this.searchFonts);

            this.$category = (0, _jquery2.default)(this.category);
            this.$category.selectize();
            this.$category.on('change', this.searchFonts);

            this.getFonts();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.$filter.data('selectize').destroy();
            this.$language.data('selectize').destroy();
            this.$category.data('selectize').destroy();

            this.$language.off('change', this.searchFonts);
            this.$category.off('change', this.searchFonts);
            this.$filter.off('change', this.filterFonts);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (this.props.apiKey != prevProps.apiKey) {
                this.getFonts();
            }
        }
    }, {
        key: 'searchFonts',
        value: function searchFonts() {
            _database2.default.fonts.handleActions({
                type: "SEARCH_FONTS",
                search: this.search.value,
                lang: this.language.value,
                cat: this.category.value
            });
        }
    }, {
        key: 'filterFonts',
        value: function filterFonts() {
            this.getFonts();
        }
    }, {
        key: 'getFonts',
        value: function getFonts() {
            var _this2 = this;

            if (this.props.apiKey == '') {
                return;
            }
            var apiUrl = 'https://www.googleapis.com/webfonts/v1/webfonts?key=' + this.props.apiKey;

            if (this.filter.value != 'all') {
                apiUrl = 'https://www.googleapis.com/webfonts/v1/webfonts?key=' + this.props.apiKey + '&sort=' + this.filter.value;
            }

            _jquery2.default.ajax({
                url: apiUrl,
                method: "GET"
            }).done(function (fonts) {
                _database2.default.fonts.handleActions({
                    type: "SET_FONTS",
                    fonts: fonts.items,
                    search: _this2.search.value,
                    lang: _this2.language.value,
                    cat: _this2.category.value
                });

                _database2.default.fonts.hideLoader();
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                { className: 'wfm-topbar wp-clearfix' },
                _react2.default.createElement(
                    'ul',
                    { className: 'wfm-fonts-filters wp-clearfix' },
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'select',
                            { id: 'wfm-filter', ref: function ref(el) {
                                    return _this3.filter = el;
                                }, defaultValue: 'popularity' },
                            _react2.default.createElement(
                                'option',
                                { value: 'all' },
                                wfm_data.filter.all
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'popularity' },
                                wfm_data.filter.popularity
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'trending' },
                                wfm_data.filter.trending
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'style' },
                                wfm_data.filter.style
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'alpha' },
                                wfm_data.filter.alpha
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'select',
                            { id: 'wfm-language', ref: function ref(el) {
                                    return _this3.language = el;
                                } },
                            _react2.default.createElement(
                                'option',
                                { value: 'all' },
                                wfm_data.language.all
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'arabic' },
                                wfm_data.language.arabic
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'bengali' },
                                wfm_data.language.bengali
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'cyrillic' },
                                wfm_data.language.cyrillic
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'cyrillic-ext' },
                                wfm_data.language.cyrillic_ext
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'devanagari' },
                                wfm_data.language.devanagari
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'greek' },
                                wfm_data.language.greek
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'greek-ext' },
                                wfm_data.language.greek_ext
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'gujarati' },
                                wfm_data.language.gujarati
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'gurmukhi' },
                                wfm_data.language.gurmukhi
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'hebrew' },
                                wfm_data.language.hebrew
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'kannada' },
                                wfm_data.language.kannada
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'khmer' },
                                wfm_data.language.khmer
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'latin' },
                                wfm_data.language.latin
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'latin-ext' },
                                wfm_data.language.latin_ext
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'malayalam' },
                                wfm_data.language.malayalam
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'myanmar' },
                                wfm_data.language.myanmar
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'oriya' },
                                wfm_data.language.oriya
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'sinhala' },
                                wfm_data.language.sinhala
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'tamil' },
                                wfm_data.language.tamil
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'telugu' },
                                wfm_data.language.telugu
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'thai' },
                                wfm_data.language.thai
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'vietnamese' },
                                wfm_data.language.vietnamese
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'select',
                            { id: 'wfm-category', ref: function ref(el) {
                                    return _this3.category = el;
                                } },
                            _react2.default.createElement(
                                'option',
                                { value: 'all' },
                                wfm_data.category.all
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'serif' },
                                wfm_data.category.serif
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'sans-serif' },
                                wfm_data.category.sans_serif
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'display' },
                                wfm_data.category.display
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'handwriting' },
                                wfm_data.category.handwriting
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'monospace' },
                                wfm_data.category.monospace
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'ul',
                    { className: 'wfm-menus wp-clearfix' },
                    _react2.default.createElement(
                        'li',
                        { className: 'wfm-search-wrap' },
                        _react2.default.createElement('input', { type: 'text', id: 'wfm-search', className: 'wfm-search', placeholder: 'Search', ref: function ref(el) {
                                return _this3.search = el;
                            }, onChange: this.searchFonts })
                    ),
                    _react2.default.createElement(
                        'li',
                        { className: 'wfm-your-fonts-wrap', onClick: function onClick() {
                                if (_database2.default.panel.show != 'myfonts') {
                                    _database2.default.panel.showMyFonts();
                                } else if (_database2.default.panel.show == 'myfonts') {
                                    _database2.default.panel.hideAll();
                                }
                            } },
                        _react2.default.createElement('strong', { dangerouslySetInnerHTML: { __html: wfm_data.your_fonts.replace('YOUR_FONTS', '<span className="wfm-font-count">' + this.props.enabledFonts + '</span>') } })
                    ),
                    _react2.default.createElement(
                        'li',
                        { className: 'wfm-settings-wrap', onClick: function onClick() {
                                if (_database2.default.panel.show != 'settings') {
                                    _database2.default.panel.showSettings();
                                } else if (_database2.default.panel.show == 'settings') {
                                    _database2.default.panel.hideAll();
                                }
                            } },
                        _react2.default.createElement('strong', { dangerouslySetInnerHTML: { __html: wfm_data.settings.replace('ICON_HTML', '<i class="fa fa-cogs"></i>') } })
                    )
                )
            );
        }
    }]);

    return Toolbar;
}(_react.Component);

exports.default = Toolbar;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(3);

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*global wfm_data*/


var Fonts = function (_EventEmitter) {
    _inherits(Fonts, _EventEmitter);

    function Fonts() {
        _classCallCheck(this, Fonts);

        var _this = _possibleConstructorReturn(this, (Fonts.__proto__ || Object.getPrototypeOf(Fonts)).call(this));

        _this.fonts = [];
        _this.allfonts = [];
        _this.loader = true;
        _this.demoText = 'The quick brown fox jumps over the lazy dog. 1234567890';
        _this.currentPage = 1;
        _this.enabledFonts = wfm_data.font_families.length;
        _this.enabledFontFamilies = wfm_data.font_families;

        _this.updated = false;
        _this.apiKey = wfm_data.api;

        if (wfm_data.fonts.length === undefined) {
            _this.enabledFontsAll = Object.keys(wfm_data.fonts).map(function (key) {
                return wfm_data.fonts[key];
            });
        } else {
            _this.enabledFontsAll = wfm_data.fonts;
        }
        return _this;
    }

    _createClass(Fonts, [{
        key: 'setApi',
        value: function setApi(apiKey) {
            this.apiKey = apiKey;

            this.emit("change");
        }
    }, {
        key: 'fontAdded',
        value: function fontAdded() {
            this.enabledFonts += 1;

            this.emit("change");
        }
    }, {
        key: 'fontRemoved',
        value: function fontRemoved() {
            this.enabledFonts -= 1;

            this.emit("change");
        }
    }, {
        key: 'addNewFont',
        value: function addNewFont(font) {
            this.enabledFontsAll.push(font);
            this.addEnabledFontFamilies(font.all.family);

            this.updated = true;

            this.emit("change");
        }
    }, {
        key: 'removeFont',
        value: function removeFont(index) {
            this.removeEnabledFontFamilies(index);

            this.enabledFontsAll.splice(index, 1);

            this.updated = true;

            this.emit("change");
        }
    }, {
        key: 'removeEnabledFontFamilies',
        value: function removeEnabledFontFamilies(index) {
            this.enabledFontFamilies.splice(this.enabledFontFamilies.indexOf(this.enabledFontsAll[index].all.family), 1);

            this.emit("change");
        }
    }, {
        key: 'addEnabledFontFamilies',
        value: function addEnabledFontFamilies(family) {
            this.enabledFontFamilies.push(family);

            this.emit("change");
        }
    }, {
        key: 'setFonts',
        value: function setFonts(fonts) {
            this.fonts = fonts;
            this.allfonts = fonts;
        }
    }, {
        key: 'showLoader',
        value: function showLoader() {
            this.loader = true;

            this.emit("change");
        }
    }, {
        key: 'hideLoader',
        value: function hideLoader() {
            this.loader = false;

            this.emit("change");
        }
    }, {
        key: 'applyFilter',
        value: function applyFilter() {
            var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            var _this2 = this;

            var lang = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'all';
            var cat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'all';

            this.fonts = [];

            this.allfonts.forEach(function (font) {
                var catFlt = true,
                    langFlt = true,
                    searchFlt = true;

                if (search == '') {
                    searchFlt = true;
                } else if (font.family.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
                    searchFlt = true;
                } else {
                    searchFlt = false;
                }

                if (lang == 'all') {
                    langFlt = true;
                } else if (font.subsets.indexOf(lang) !== -1) {
                    langFlt = true;
                } else {
                    langFlt = false;
                }

                if (cat == 'all') {
                    catFlt = true;
                } else if (font.category == cat) {
                    catFlt = true;
                } else {
                    catFlt = false;
                }

                if (catFlt && langFlt && searchFlt) {
                    _this2.fonts.push(font);
                }
            });

            this.emit("change");
        }
    }, {
        key: 'setDemoText',
        value: function setDemoText(text) {
            this.demoText = text;

            this.emit("change");
        }
    }, {
        key: 'setCurrentPage',
        value: function setCurrentPage(page) {
            var fire = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this.currentPage = page;

            if (fire) {
                this.emit("change");
            }
        }
    }, {
        key: 'handleActions',
        value: function handleActions(action) {
            switch (action.type) {
                case "SET_FONTS":
                    this.setFonts(action.fonts);
                    this.applyFilter(action.search, action.lang, action.cat);
                    break;

                case "SEARCH_FONTS":
                    this.setCurrentPage(1, false);
                    this.applyFilter(action.search, action.lang, action.cat);
                    break;
                case "CHANGE_DEMO_TEXT":
                    this.setDemoText(action.text);
                    break;
                case "SET_CURRENT_PAGE":
                    this.setCurrentPage(action.page);
                    break;
            }
        }
    }]);

    return Fonts;
}(_events2.default);

var fonts = new Fonts();

exports.default = fonts;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(3);

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*global wfm_data*/


var Panel = function (_EventEmitter) {
    _inherits(Panel, _EventEmitter);

    function Panel() {
        _classCallCheck(this, Panel);

        var _this = _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this));

        _this.show = '';

        if (wfm_data.api == '') {
            _this.show = 'settings';
        }
        return _this;
    }

    _createClass(Panel, [{
        key: 'showSettings',
        value: function showSettings() {
            this.show = 'settings';

            this.emit('change');
        }
    }, {
        key: 'showMyFonts',
        value: function showMyFonts() {
            this.show = 'myfonts';

            this.emit('change');
        }
    }, {
        key: 'hideAll',
        value: function hideAll() {
            this.show = '';

            this.emit('change');
        }
    }]);

    return Panel;
}(_events2.default);

exports.default = new Panel();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(3);

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Notify = function (_EventEmitter) {
    _inherits(Notify, _EventEmitter);

    function Notify() {
        _classCallCheck(this, Notify);

        var _this = _possibleConstructorReturn(this, (Notify.__proto__ || Object.getPrototypeOf(Notify)).call(this));

        _this.notify = [];
        return _this;
    }

    _createClass(Notify, [{
        key: 'add',
        value: function add(notify) {
            var _this2 = this;

            this.notify.push(notify);

            setTimeout(function () {
                _this2.remove();
            }, 5000);

            this.emit('change');
        }
    }, {
        key: 'remove',
        value: function remove() {
            this.notify.shift();

            this.emit('change');
        }
    }]);

    return Notify;
}(_events2.default);

exports.default = new Notify();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _database = __webpack_require__(1);

var _database2 = _interopRequireDefault(_database);

var _deepEqual = __webpack_require__(4);

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _FontItem = __webpack_require__(16);

var _FontItem2 = _interopRequireDefault(_FontItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fonts = function (_Component) {
    _inherits(Fonts, _Component);

    function Fonts(props) {
        _classCallCheck(this, Fonts);

        var _this = _possibleConstructorReturn(this, (Fonts.__proto__ || Object.getPrototypeOf(Fonts)).call(this, props));

        _this.state = {
            fonts: []
        };
        return _this;
    }

    _createClass(Fonts, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setCurrentPageFonts();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (!(0, _deepEqual2.default)(this.props.fonts, prevProps.fonts) || !(0, _deepEqual2.default)(this.props.currentPage, prevProps.currentPage) || _database2.default.fonts.updated) {
                this.setCurrentPageFonts();

                _database2.default.fonts.updated = false;
            }
        }
    }, {
        key: 'setCurrentPageFonts',
        value: function setCurrentPageFonts() {
            var _props = this.props,
                currentPage = _props.currentPage,
                perPage = _props.perPage,
                fonts = _props.fonts,
                enabledFontFamilies = _props.enabledFontFamilies;

            var from = (currentPage - 1) * perPage,
                to = currentPage * perPage - 1,
                allfonts = [];

            for (var i = from; i <= to; i++) {
                if (fonts[i]) {
                    if (enabledFontFamilies.indexOf(fonts[i].family) !== -1) {
                        fonts[i].enabled = true;
                    } else {
                        fonts[i].enabled = false;
                    }
                    allfonts.push(fonts[i]);
                }
            }

            this.setState({
                fonts: allfonts
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var containerClass = 'wfm-fonts-view-wrap';

            if (this.props.isLoading) {
                containerClass = 'wfm-fonts-view-wrap active';
            }

            return _react2.default.createElement(
                'div',
                { className: containerClass },
                _react2.default.createElement(
                    'div',
                    { className: 'wfm-fonts-view' },
                    this.state.fonts.map(function (font, index) {

                        return _react2.default.createElement(_FontItem2.default, { demoText: _this2.props.demoText, font: font, key: index });
                    })
                ),
                this.state.isLoading && _react2.default.createElement(
                    'div',
                    { className: 'wfm-fonts-view-overlayer' },
                    _react2.default.createElement('div', { className: 'typing_loader' })
                )
            );
        }
    }]);

    return Fonts;
}(_react.Component);

exports.default = Fonts;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _jquery = __webpack_require__(2);

var _jquery2 = _interopRequireDefault(_jquery);

var _deepEqual = __webpack_require__(4);

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _database = __webpack_require__(1);

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*global wfm_data*/


var FontItem = function (_Component) {
    _inherits(FontItem, _Component);

    function FontItem(props) {
        _classCallCheck(this, FontItem);

        var _this = _possibleConstructorReturn(this, (FontItem.__proto__ || Object.getPrototypeOf(FontItem)).call(this, props));

        _this.changeStyles = _this.changeStyles.bind(_this);

        _this.state = {
            fontWeight: 400,
            fontStyle: '',
            adding: false
        };
        return _this;
    }

    _createClass(FontItem, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.$styles = (0, _jquery2.default)(this.styles);
            this.$styles.selectize({
                onChange: function onChange(value) {
                    _this2.changeStyles(value);
                }
            });
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps) {
            if (!(0, _deepEqual2.default)(this.props, nextProps)) {
                this.$styles.data('selectize').destroy();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            var _this3 = this;

            if (!(0, _deepEqual2.default)(this.props, prevProps)) {
                this.$styles.selectize({
                    onChange: function onChange(value) {
                        _this3.changeStyles(value);
                    }
                });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.$styles.data('selectize').destroy();
        }
    }, {
        key: 'changeStyles',
        value: function changeStyles(newval) {
            var value = newval.split('_');
            this.setState({
                fontWeight: value[0],
                fontStyle: value[1]
            });
        }
    }, {
        key: 'buildLink',
        value: function buildLink(name, variants) {
            var link = '//fonts.googleapis.com/css?family=';

            link += name.replace(/ /g, '+') + ':' + variants.join(',');

            return link;
        }
    }, {
        key: 'processVariants',
        value: function processVariants(variants) {
            return variants.map(function (variant) {
                var label = '',
                    value = '';
                if (variant == 'regular') {
                    label = 'Regular 400';
                    value = '400';
                } else if (variant == 'italic') {
                    label = 'Regular 400 Italic';
                    value = '400_italic';
                } else {
                    if (variant.replace(/\d+/g, '') == '') {
                        variant = parseInt(variant);

                        if (variant == 100) {
                            label = 'Thin ' + variant;
                        } else if (variant == 200) {
                            label = 'Extra-Light ' + variant;
                        } else if (variant == 300) {
                            label = 'Light ' + variant;
                        } else if (variant == 400) {
                            label = 'Regular ' + variant;
                        } else if (variant == 500) {
                            label = 'Medium ' + variant;
                        } else if (variant == 600) {
                            label = 'Semi-Bold ' + variant;
                        } else if (variant == 700) {
                            label = 'Bold ' + variant;
                        } else if (variant == 800) {
                            label = 'Extra-Bold ' + variant;
                        } else if (variant == 900) {
                            label = 'Black ' + variant;
                        }
                        value = variant;
                    } else {
                        if (variant.replace(/[a-zA-Z]+/g, '') != '') {

                            if (variant.replace(/[a-zA-Z]+/g, '') == 100) {
                                label = 'Thin ' + variant.replace(/[a-zA-Z]+/g, '') + ' Italic';
                            } else if (variant.replace(/[a-zA-Z]+/g, '') == 200) {
                                label = 'Extra-Light ' + variant.replace(/[a-zA-Z]+/g, '') + ' Italic';
                            } else if (variant.replace(/[a-zA-Z]+/g, '') == 300) {
                                label = 'Light ' + variant.replace(/[a-zA-Z]+/g, '') + ' Italic';
                            } else if (variant.replace(/[a-zA-Z]+/g, '') == 400) {
                                label = 'Regular ' + variant.replace(/[a-zA-Z]+/g, '') + ' Italic';
                            } else if (variant.replace(/[a-zA-Z]+/g, '') == 500) {
                                label = 'Medium ' + variant.replace(/[a-zA-Z]+/g, '') + ' Italic';
                            } else if (variant.replace(/[a-zA-Z]+/g, '') == 600) {
                                label = 'Semi-Bold ' + variant.replace(/[a-zA-Z]+/g, '') + ' Italic';
                            } else if (variant.replace(/[a-zA-Z]+/g, '') == 700) {
                                label = 'Bold ' + variant.replace(/[a-zA-Z]+/g, '') + ' Italic';
                            } else if (variant.replace(/[a-zA-Z]+/g, '') == 800) {
                                label = 'Extra-Bold ' + variant.replace(/[a-zA-Z]+/g, '') + ' Italic';
                            } else if (variant.replace(/[a-zA-Z]+/g, '') == 900) {
                                label = 'Black ' + variant.replace(/[a-zA-Z]+/g, '') + ' Italic';
                            }

                            value = variant.replace(/[a-zA-Z]+/g, '') + '_' + variant.replace(/\d+/g, '');
                        }
                    }
                }
                return {
                    label: label,
                    value: value
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props = this.props,
                _props$font = _props.font,
                family = _props$font.family,
                variants = _props$font.variants,
                subsets = _props$font.subsets,
                demoText = _props.demoText;


            var demoStyle = {
                fontFamily: family,
                fontWeight: this.state.fontWeight,
                fontStyle: this.state.fontStyle
            };

            return _react2.default.createElement(
                'div',
                { className: 'wfm-font-item wp-clearfix' },
                _react2.default.createElement(
                    'div',
                    { className: 'wfm-font-item-inner' },
                    _react2.default.createElement(
                        'div',
                        { className: 'wfm-font-name-wrap' },
                        _react2.default.createElement(
                            'h3',
                            { className: 'wfm-font-name' },
                            family,
                            ' ',
                            _react2.default.createElement(
                                'span',
                                null,
                                '(',
                                wfm_data.styles.replace('COUNT_TOTAL', variants.length),
                                ')'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'wfm-font-styles wp-clearfix' },
                            _react2.default.createElement(
                                'span',
                                null,
                                'Style:'
                            ),
                            _react2.default.createElement(
                                'select',
                                { ref: function ref(el) {
                                        return _this4.styles = el;
                                    }, value: '400', readOnly: true },
                                this.processVariants(variants).map(function (variant, index) {
                                    return _react2.default.createElement(
                                        'option',
                                        { value: variant.value, key: index },
                                        variant.label
                                    );
                                })
                            )
                        ),
                        this.props.font.enabled ? _react2.default.createElement(
                            'a',
                            { href: '#', className: 'wfm-add-font wfm-added', onClick: function onClick(e) {
                                    e.preventDefault();
                                } },
                            _react2.default.createElement('span', { className: 'dashicons dashicons-yes' })
                        ) : _react2.default.createElement(
                            'a',
                            { href: '#', className: 'wfm-add-font', onClick: function onClick(e) {
                                    e.preventDefault();
                                    var fontToAdd = {
                                        family: family,
                                        subsets: subsets,
                                        variants: variants
                                    };

                                    _jquery2.default.ajax({
                                        url: wfm_data.ajax_url,
                                        method: "POST",
                                        data: {
                                            nonce: wfm_data.nonce,
                                            action: 'wfm_add_font',
                                            font: fontToAdd
                                        }
                                    }).done(function (html) {
                                        if (html == 1) {

                                            _database2.default.fonts.addNewFont({
                                                all: fontToAdd,
                                                enabled: {
                                                    subsets: ["latin"],
                                                    variants: variants
                                                }
                                            });
                                            _database2.default.fonts.fontAdded();

                                            _database2.default.notify.add({
                                                message: wfm_data.font_added.replace('FONT_NAME', family),
                                                type: 'success'
                                            });
                                        } else {
                                            _database2.default.notify.add({
                                                message: wfm_data.adding_error.replace('FONT_NAME', family),
                                                type: 'error'
                                            });
                                        }
                                    }).fail(function () {
                                        _database2.default.notify.add({
                                            message: wfm_data.adding_error.replace('FONT_NAME', family),
                                            type: 'error'
                                        });
                                    });
                                } },
                            _react2.default.createElement('span', { className: 'dashicons dashicons-plus' })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'wfm-font-demo', style: demoStyle },
                        demoText
                    )
                ),
                _react2.default.createElement('link', { rel: 'stylesheet', href: this.buildLink(family, variants), type: 'text/css', media: 'all' })
            );
        }
    }]);

    return FontItem;
}(_react.Component);

exports.default = FontItem;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _jquery = __webpack_require__(2);

var _jquery2 = _interopRequireDefault(_jquery);

var _database = __webpack_require__(1);

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*global wfm_data*/


var Settings = function (_Component) {
    _inherits(Settings, _Component);

    function Settings(props) {
        _classCallCheck(this, Settings);

        var _this = _possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).call(this, props));

        _this.state = {
            updating: false
        };
        return _this;
    }

    _createClass(Settings, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'wfm-api-settings' },
                _react2.default.createElement(
                    'div',
                    { className: 'wfm-api-settings-inner wp-clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'wfm-api-setting-field' },
                        _react2.default.createElement(
                            'label',
                            { htmlFor: 'googleapi' },
                            wfm_data.api_label
                        ),
                        _react2.default.createElement('input', { type: 'text', ref: 'googleapi', defaultValue: this.props.apiKey }),
                        _react2.default.createElement('p', { dangerouslySetInnerHTML: { __html: wfm_data.api_desc } })
                    ),
                    _react2.default.createElement('button', {
                        className: 'wfm-save-api-settings',
                        type: 'button',
                        onClick: function onClick() {
                            _this2.setState({
                                updating: true
                            });
                            _jquery2.default.ajax({
                                url: wfm_data.ajax_url,
                                method: "POST",
                                data: {
                                    nonce: wfm_data.nonce,
                                    action: 'wfm_update_api',
                                    api: _this2.refs.googleapi.value
                                }
                            }).done(function (html) {
                                if (html == 1) {
                                    _database2.default.fonts.setApi(_this2.refs.googleapi.value);

                                    _database2.default.notify.add({
                                        message: wfm_data.api_updated,
                                        type: 'success'
                                    });
                                } else {
                                    _database2.default.notify.add({
                                        message: wfm_data.api_updat_fail,
                                        type: 'error'
                                    });
                                }

                                _this2.setState({
                                    updating: false
                                });

                                _database2.default.panel.hideAll();
                            }).fail(function () {
                                _database2.default.notify.add({
                                    message: wfm_data.api_updat_fail,
                                    type: 'error'
                                });

                                _this2.setState({
                                    updating: false
                                });
                            });
                        },
                        dangerouslySetInnerHTML: { __html: wfm_data.save_settings.replace('ICON_HTML', '<i class="fa fa-floppy-o" aria-hidden="true"></i>') }
                    }),
                    this.state.updating && _react2.default.createElement('div', { className: 'wfm-font-api-saving', dangerouslySetInnerHTML: { __html: wfm_data.saving.replace('ICON_HTML', '<i class="fa fa-refresh fa-spin fa-fw"></i>') } })
                )
            );
        }
    }]);

    return Settings;
}(_react.Component);

exports.default = Settings;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _MyFontItem = __webpack_require__(19);

var _MyFontItem2 = _interopRequireDefault(_MyFontItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*global wfm_data*/


var MyFonts = function (_Component) {
    _inherits(MyFonts, _Component);

    function MyFonts() {
        _classCallCheck(this, MyFonts);

        return _possibleConstructorReturn(this, (MyFonts.__proto__ || Object.getPrototypeOf(MyFonts)).apply(this, arguments));
    }

    _createClass(MyFonts, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'wfm-ef-view-wrap' },
                _react2.default.createElement(
                    'div',
                    { className: 'wfm-ef-view-inner wp-clearfix' },
                    this.props.enabledFontsAll.length ? this.props.enabledFontsAll.map(function (enabledFont, index) {
                        return _react2.default.createElement(_MyFontItem2.default, { fontAllData: enabledFont.all, fontEnabledData: enabledFont.enabled, family: enabledFont.all.family, index: index, key: index });
                    }) : _react2.default.createElement(
                        'div',
                        { className: 'wfm-no-font-saved' },
                        wfm_data.no_saved_font
                    )
                )
            );
        }
    }]);

    return MyFonts;
}(_react.Component);

exports.default = MyFonts;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _jquery = __webpack_require__(2);

var _jquery2 = _interopRequireDefault(_jquery);

var _database = __webpack_require__(1);

var _database2 = _interopRequireDefault(_database);

var _deepEqual = __webpack_require__(4);

var _deepEqual2 = _interopRequireDefault(_deepEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*global wfm_data*/


var MyFontItem = function (_Component) {
    _inherits(MyFontItem, _Component);

    function MyFontItem(props) {
        _classCallCheck(this, MyFontItem);

        var _this = _possibleConstructorReturn(this, (MyFontItem.__proto__ || Object.getPrototypeOf(MyFontItem)).call(this, props));

        _this.state = {
            showSettings: false,
            updating: false,
            fontAllData: _this.props.fontAllData,
            fontEnabledData: _this.props.fontEnabledData
        };
        return _this;
    }

    _createClass(MyFontItem, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                family = _props.family,
                index = _props.index;
            var _state = this.state,
                fontAllData = _state.fontAllData,
                fontEnabledData = _state.fontEnabledData;

            var settingsClass = 'wfm-enabled-font-settings';
            if (this.state.showSettings) {
                settingsClass += ' active';
            }
            return _react2.default.createElement(
                'div',
                { className: 'wfm-enabled-font-item' },
                _react2.default.createElement(
                    'div',
                    { className: 'wfm-enabled-font-item-inner' },
                    _react2.default.createElement(
                        'div',
                        { className: 'wfm-enabled-font-data' },
                        _react2.default.createElement(
                            'h3',
                            { className: 'wfm-enabled-font-name' },
                            family
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'wfm-enabled-font-controls' },
                            _react2.default.createElement(
                                'a',
                                { href: '#', className: 'wfm-ef-remove', onClick: function onClick(e) {
                                        e.preventDefault();
                                        if (!confirm(wfm_data.remov_confirm.replace('FONT_NAME', family))) {
                                            return;
                                        }
                                        _jquery2.default.ajax({
                                            url: wfm_data.ajax_url,
                                            method: "POST",
                                            data: {
                                                nonce: wfm_data.nonce,
                                                action: 'wfm_remove_font',
                                                font: family
                                            }
                                        }).done(function (html) {
                                            if (html == 1) {
                                                _database2.default.fonts.removeFont(index);

                                                _database2.default.fonts.fontRemoved();

                                                _database2.default.notify.add({
                                                    message: wfm_data.font_removed.replace('FONT_NAME', family),
                                                    type: 'warning'
                                                });
                                            } else {
                                                _database2.default.notify.add({
                                                    message: wfm_data.removing_error.replace('FONT_NAME', family),
                                                    type: 'error'
                                                });
                                            }
                                        }).fail(function () {
                                            _database2.default.notify.add({
                                                message: wfm_data.removing_error.replace('FONT_NAME', family),
                                                type: 'error'
                                            });
                                        });
                                    } },
                                _react2.default.createElement('i', { className: 'fa fa-trash' })
                            ),
                            _react2.default.createElement(
                                'a',
                                { href: '#', className: 'wfm-ef-settings', onClick: function onClick(e) {
                                        e.preventDefault();
                                        _this2.setState({
                                            showSettings: !_this2.state.showSettings
                                        });
                                    } },
                                _react2.default.createElement('i', { className: 'fa fa-cog' })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: settingsClass },
                        _react2.default.createElement(
                            'form',
                            { ref: 'form', onSubmit: function onSubmit(e) {
                                    e.preventDefault();

                                    var variants = [];
                                    (0, _jquery2.default)('input[name="variant"]:checked', _this2.refs.form).each(function (i, variant) {

                                        variants.push(variant.value);
                                    });

                                    var subsets = [];
                                    (0, _jquery2.default)('input[name="subset"]:checked', _this2.refs.form).each(function (i, subset) {

                                        subsets.push(subset.value);
                                    });

                                    if ((0, _deepEqual2.default)(fontEnabledData.variants, variants) && (0, _deepEqual2.default)(fontEnabledData.subsets, subsets)) {
                                        _database2.default.notify.add({
                                            message: wfm_data.nothing_changed,
                                            type: 'warning'
                                        });
                                        return;
                                    }

                                    _this2.setState({
                                        updating: true
                                    });

                                    _jquery2.default.ajax({
                                        url: wfm_data.ajax_url,
                                        method: "POST",
                                        data: {
                                            nonce: wfm_data.nonce,
                                            action: 'wfm_change_font',
                                            font: family,
                                            variants: variants,
                                            subsets: subsets
                                        }
                                    }).done(function (r) {
                                        if (r == 1) {
                                            _database2.default.notify.add({
                                                message: wfm_data.font_data_changed.replace('FONT_NAME', family),
                                                type: 'success'
                                            });

                                            _this2.setState({
                                                fontEnabledData: {
                                                    variants: variants,
                                                    subsets: subsets
                                                }
                                            });
                                        } else {
                                            _database2.default.notify.add({
                                                message: wfm_data.changing_error.replace('FONT_NAME', family),
                                                type: 'error'
                                            });
                                        }
                                        _this2.setState({
                                            updating: false
                                        });
                                    }).fail(function () {
                                        _database2.default.notify.add({
                                            message: wfm_data.changing_error.replace('FONT_NAME', family),
                                            type: 'error'
                                        });
                                    });
                                } },
                            _react2.default.createElement(
                                'div',
                                { className: 'wfm-row wp-clearfix' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'wfm-enabled-font-variants' },
                                    fontAllData.variants.map(function (variant, index) {
                                        var defaultChecked = false;
                                        if (fontEnabledData.variants.indexOf(variant) !== -1) {
                                            defaultChecked = true;
                                        }
                                        return _react2.default.createElement(
                                            'label',
                                            { key: index },
                                            _react2.default.createElement('input', { type: 'checkbox', name: 'variant', className: 'wfm-ef-variant-checkbox', defaultChecked: defaultChecked, value: variant }),
                                            ' ',
                                            variant
                                        );
                                    })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'wfm-enabled-font-subsets' },
                                    fontAllData.subsets.map(function (subset, index) {
                                        var defaultChecked = false;
                                        if (fontEnabledData.subsets.indexOf(subset) !== -1) {
                                            defaultChecked = true;
                                        }
                                        return _react2.default.createElement(
                                            'label',
                                            { key: index },
                                            _react2.default.createElement('input', { type: 'checkbox', name: 'subset', className: 'wfm-ef-subset-checkbox', defaultChecked: defaultChecked, value: subset }),
                                            ' ',
                                            subset
                                        );
                                    })
                                )
                            ),
                            !this.state.updating && _react2.default.createElement('button', { type: 'submit', className: 'wfm-ef-update', dangerouslySetInnerHTML: { __html: wfm_data.update.replace('ICON_HTML', '<i class="fa fa-floppy-o" aria-hidden="true"></i>') } })
                        ),
                        this.state.updating && _react2.default.createElement('div', { className: 'wfm-font-data-updating', dangerouslySetInnerHTML: { __html: wfm_data.updating.replace('ICON_HTML', '<i class="fa fa-refresh fa-spin fa-fw"></i>') } })
                    )
                )
            );
        }
    }]);

    return MyFontItem;
}(_react.Component);

exports.default = MyFontItem;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _database = __webpack_require__(1);

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_Component) {
    _inherits(Pagination, _Component);

    function Pagination(props) {
        _classCallCheck(this, Pagination);

        var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));

        _this.state = {
            length: _database2.default.fonts.fonts.length,
            currentPage: 1
        };
        return _this;
    }

    _createClass(Pagination, [{
        key: 'getTotalPage',
        value: function getTotalPage() {
            var pages = parseInt(this.props.fontsToRender / 20);
            var addOne = this.props.fontsToRender - pages * 20;

            if (addOne) {
                pages += 1;
            }

            return pages;
        }
    }, {
        key: 'getCurrentBeforeAfter',
        value: function getCurrentBeforeAfter() {
            var currentPage = this.props.currentPage;


            if (currentPage == 1) {
                return [1, 2, 3];
            } else if (this.getTotalPage() == currentPage + 1) {
                return [currentPage - 1, currentPage];
            } else if (this.getTotalPage() == currentPage) {
                return [currentPage - 2, currentPage - 1];
            } else {
                return [currentPage - 1, currentPage, currentPage + 1];
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var currentPage = this.props.currentPage;


            var pages = this.getTotalPage();

            if (pages == 1) {
                return null;
            }

            var lastActive = '';

            if (pages == currentPage) {
                lastActive = 'active';
            }

            var firstActive = '';

            if (pages == 1) {
                firstActive = 'active';
            }

            return _react2.default.createElement(
                'div',
                { className: 'wfm-pagination wp-clearfix' },
                _react2.default.createElement(
                    'ul',
                    null,
                    _react2.default.createElement(
                        'li',
                        { className: 'wfm-prev' },
                        _react2.default.createElement(
                            'span',
                            { onClick: function onClick(e) {
                                    e.preventDefault();
                                    if (currentPage != 1) {
                                        _database2.default.fonts.handleActions({
                                            type: 'SET_CURRENT_PAGE',
                                            page: currentPage - 1
                                        });
                                    }
                                } },
                            _react2.default.createElement('i', { className: 'fa fa-angle-left', 'aria-hidden': 'true' })
                        )
                    ),
                    currentPage > 2 && _react2.default.createElement(
                        'li',
                        { className: firstActive },
                        _react2.default.createElement(
                            'a',
                            { href: '#', onClick: function onClick(e) {
                                    e.preventDefault();
                                    _database2.default.fonts.handleActions({
                                        type: 'SET_CURRENT_PAGE',
                                        page: 1
                                    });
                                } },
                            '1'
                        )
                    ),
                    currentPage > 3 && _react2.default.createElement(
                        'li',
                        { className: 'wfm-dots wfm-first-dots' },
                        _react2.default.createElement(
                            'span',
                            null,
                            '...'
                        )
                    ),
                    this.getCurrentBeforeAfter().map(function (page, index) {
                        var classActive = '';
                        if (currentPage == page) {
                            classActive = 'active';
                        }
                        return _react2.default.createElement(
                            'li',
                            { className: classActive, key: index },
                            _react2.default.createElement(
                                'a',
                                { href: '#', onClick: function onClick(e) {
                                        e.preventDefault();
                                        _database2.default.fonts.handleActions({
                                            type: 'SET_CURRENT_PAGE',
                                            page: page
                                        });
                                    } },
                                page
                            )
                        );
                    }),
                    pages > 4 && currentPage != pages && currentPage != pages - 1 && currentPage != pages - 2 && _react2.default.createElement(
                        'li',
                        { className: 'wfm-dots wfm-last-dots' },
                        _react2.default.createElement(
                            'span',
                            null,
                            '...'
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        { className: lastActive },
                        _react2.default.createElement(
                            'a',
                            { href: '#', onClick: function onClick(e) {
                                    e.preventDefault();
                                    _database2.default.fonts.handleActions({
                                        type: 'SET_CURRENT_PAGE',
                                        page: pages
                                    });
                                } },
                            pages
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        { className: 'wfm-next' },
                        _react2.default.createElement(
                            'span',
                            { onClick: function onClick(e) {
                                    e.preventDefault();
                                    if (pages != currentPage) {
                                        _database2.default.fonts.handleActions({
                                            type: 'SET_CURRENT_PAGE',
                                            page: currentPage + 1
                                        });
                                    }
                                } },
                            _react2.default.createElement('i', { className: 'fa fa-angle-right', 'aria-hidden': 'true' })
                        )
                    )
                )
            );
        }
    }]);

    return Pagination;
}(_react.Component);

exports.default = Pagination;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _NotificationItem = __webpack_require__(22);

var _NotificationItem2 = _interopRequireDefault(_NotificationItem);

var _database = __webpack_require__(1);

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Notification = function (_Component) {
    _inherits(Notification, _Component);

    function Notification(props) {
        _classCallCheck(this, Notification);

        var _this = _possibleConstructorReturn(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, props));

        _this.setValues = _this.setValues.bind(_this);

        _this.state = {
            notifications: _database2.default.notify.notify
        };
        return _this;
    }

    _createClass(Notification, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _database2.default.notify.on('change', this.setValues);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _database2.default.notify.removeListener('change', this.setValues);
        }
    }, {
        key: 'setValues',
        value: function setValues() {
            this.setState({
                notifications: _database2.default.notify.notify
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'wfm-notification' },
                this.state.notifications.map(function (notification, index) {
                    return _react2.default.createElement(_NotificationItem2.default, { key: index, type: notification.type, message: notification.message });
                })
            );
        }
    }]);

    return Notification;
}(_react.Component);

exports.default = Notification;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotificationItem = function (_Component) {
    _inherits(NotificationItem, _Component);

    function NotificationItem(props) {
        _classCallCheck(this, NotificationItem);

        var _this = _possibleConstructorReturn(this, (NotificationItem.__proto__ || Object.getPrototypeOf(NotificationItem)).call(this, props));

        _this.state = {
            removing: false,
            removed: false
        };
        return _this;
    }

    _createClass(NotificationItem, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this._isMounted = true;

            setTimeout(function () {
                if (_this2._isMounted) {
                    _this2.setState({
                        removing: true
                    });
                }
            }, 4795);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this._isMounted = false;
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                type = _props.type,
                message = _props.message;


            var classNew = "wfm-notification-item wfm-notification-type-" + type;

            var styleNotify = {
                animation: "fadeInRight 0.3s"
            };

            if (this.state.removing) {
                styleNotify.animation = "fadeOutLeft 0.3s";
            }

            if (this.state.removed) {
                classNew = classNew + " removed";
            }

            return _react2.default.createElement(
                "div",
                { className: classNew, style: styleNotify, onClick: function onClick() {
                        _this3.setState({
                            removing: true
                        });
                        setTimeout(function () {
                            _this3.setState({
                                removed: true
                            });
                        }, 295);
                    } },
                _react2.default.createElement("div", { className: "wfm-notification-message", dangerouslySetInnerHTML: { __html: message } })
            );
        }
    }]);

    return NotificationItem;
}(_react.Component);

exports.default = NotificationItem;

/***/ })
/******/ ]);
