/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(12);

	__webpack_require__(13);

	var _jquery = __webpack_require__(15);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * theme.js
	 * Entry point for all theme related js.
	 */
	var $ = jQuery;

	var opts = {
	  videoUrl: 'https://www.youtube.com/watch?v=M-aytlS3gwQ',
	  videoType: 'youtube',
	  aspectRatio: 1.33333, // 16:9
	  autoplay: 1,
	  loop: 1,
	  controls: 0,
	  backgroundSize: 'cover', // Same as css background-size: cover;
	  verticalAlign: 'middle'
	};

	$(window).on('load', function () {
	  var bgVideo = new _jquery2.default($(".paragraph--type--compound-banner .video-container"), opts);
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _foundation = __webpack_require__(3);

	var _foundationUtil = __webpack_require__(4);

	var _foundationUtil2 = __webpack_require__(5);

	var _foundationUtil3 = __webpack_require__(6);

	var _foundationUtil4 = __webpack_require__(7);

	var _foundationUtil5 = __webpack_require__(8);

	var _foundationUtil6 = __webpack_require__(9);

	var _foundationUtil7 = __webpack_require__(10);

	var _foundationUtil8 = __webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.$ = _jquery2.default; /**
	                              * @file foundation-setup.js
	                              *
	                              * This is required for any foundation functionality. It should be imported at the top
	                              * of any file that is implementing a foundation component. Webpack determines
	                              * dependencies so this will only be added once. Keep in mind this is where the global
	                              * Foundation is being initialized `$(document).foudnation()`, so it's probably reasonable
	                              * to include this in the `theme.js` file first, as well as Foundation component files.
	                              */

	_foundation.Foundation.addToJquery(_jquery2.default);

	// Add Foundation Utils to Foundation global namespace for backwards
	// compatibility.

	_foundation.Foundation.rtl = _foundationUtil.rtl;
	_foundation.Foundation.GetYoDigits = _foundationUtil.GetYoDigits;
	_foundation.Foundation.transitionend = _foundationUtil.transitionend;

	_foundation.Foundation.Box = _foundationUtil2.Box;
	_foundation.Foundation.onImagesLoaded = _foundationUtil3.onImagesLoaded;
	_foundation.Foundation.Keyboard = _foundationUtil4.Keyboard;
	_foundation.Foundation.MediaQuery = _foundationUtil5.MediaQuery;
	_foundation.Foundation.Motion = _foundationUtil6.Motion;
	_foundation.Foundation.Move = _foundationUtil6.Move;
	_foundation.Foundation.Nest = _foundationUtil7.Nest;
	_foundation.Foundation.Timer = _foundationUtil8.Timer;

	// Initializing foundation - if you are relying on components generated from classes or attributes,
	// you may need to make sure to appropriate modules are included beforehand
	(0, _jquery2.default)(document).foundation();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = jQuery;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Foundation = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _foundationUtil = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var FOUNDATION_VERSION = '6.4.0';

	// Global Foundation object
	// This is attached to the window, or used as a module for AMD/Browserify
	var Foundation = {
	  version: FOUNDATION_VERSION,

	  /**
	   * Stores initialized plugins.
	   */
	  _plugins: {},

	  /**
	   * Stores generated unique ids for plugin instances
	   */
	  _uuids: [],

	  /**
	   * Defines a Foundation plugin, adding it to the `Foundation` namespace and the list of plugins to initialize when reflowing.
	   * @param {Object} plugin - The constructor of the plugin.
	   */
	  plugin: function plugin(_plugin, name) {
	    // Object key to use when adding to global Foundation object
	    // Examples: Foundation.Reveal, Foundation.OffCanvas
	    var className = name || functionName(_plugin);
	    // Object key to use when storing the plugin, also used to create the identifying data attribute for the plugin
	    // Examples: data-reveal, data-off-canvas
	    var attrName = hyphenate(className);

	    // Add to the Foundation object and the plugins list (for reflowing)
	    this._plugins[attrName] = this[className] = _plugin;
	  },
	  /**
	   * @function
	   * Populates the _uuids array with pointers to each individual plugin instance.
	   * Adds the `zfPlugin` data-attribute to programmatically created plugins to allow use of $(selector).foundation(method) calls.
	   * Also fires the initialization event for each plugin, consolidating repetitive code.
	   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
	   * @param {String} name - the name of the plugin, passed as a camelCased string.
	   * @fires Plugin#init
	   */
	  registerPlugin: function registerPlugin(plugin, name) {
	    var pluginName = name ? hyphenate(name) : functionName(plugin.constructor).toLowerCase();
	    plugin.uuid = (0, _foundationUtil.GetYoDigits)(6, pluginName);

	    if (!plugin.$element.attr('data-' + pluginName)) {
	      plugin.$element.attr('data-' + pluginName, plugin.uuid);
	    }
	    if (!plugin.$element.data('zfPlugin')) {
	      plugin.$element.data('zfPlugin', plugin);
	    }
	    /**
	     * Fires when the plugin has initialized.
	     * @event Plugin#init
	     */
	    plugin.$element.trigger('init.zf.' + pluginName);

	    this._uuids.push(plugin.uuid);

	    return;
	  },
	  /**
	   * @function
	   * Removes the plugins uuid from the _uuids array.
	   * Removes the zfPlugin data attribute, as well as the data-plugin-name attribute.
	   * Also fires the destroyed event for the plugin, consolidating repetitive code.
	   * @param {Object} plugin - an instance of a plugin, usually `this` in context.
	   * @fires Plugin#destroyed
	   */
	  unregisterPlugin: function unregisterPlugin(plugin) {
	    var pluginName = hyphenate(functionName(plugin.$element.data('zfPlugin').constructor));

	    this._uuids.splice(this._uuids.indexOf(plugin.uuid), 1);
	    plugin.$element.removeAttr('data-' + pluginName).removeData('zfPlugin')
	    /**
	     * Fires when the plugin has been destroyed.
	     * @event Plugin#destroyed
	     */
	    .trigger('destroyed.zf.' + pluginName);
	    for (var prop in plugin) {
	      plugin[prop] = null; //clean up script to prep for garbage collection.
	    }
	    return;
	  },

	  /**
	   * @function
	   * Causes one or more active plugins to re-initialize, resetting event listeners, recalculating positions, etc.
	   * @param {String} plugins - optional string of an individual plugin key, attained by calling `$(element).data('pluginName')`, or string of a plugin class i.e. `'dropdown'`
	   * @default If no argument is passed, reflow all currently active plugins.
	   */
	  reInit: function reInit(plugins) {
	    var isJQ = plugins instanceof _jquery2.default;
	    try {
	      if (isJQ) {
	        plugins.each(function () {
	          (0, _jquery2.default)(this).data('zfPlugin')._init();
	        });
	      } else {
	        var type = typeof plugins === 'undefined' ? 'undefined' : _typeof(plugins),
	            _this = this,
	            fns = {
	          'object': function object(plgs) {
	            plgs.forEach(function (p) {
	              p = hyphenate(p);
	              (0, _jquery2.default)('[data-' + p + ']').foundation('_init');
	            });
	          },
	          'string': function string() {
	            plugins = hyphenate(plugins);
	            (0, _jquery2.default)('[data-' + plugins + ']').foundation('_init');
	          },
	          'undefined': function undefined() {
	            this['object'](Object.keys(_this._plugins));
	          }
	        };
	        fns[type](plugins);
	      }
	    } catch (err) {
	      console.error(err);
	    } finally {
	      return plugins;
	    }
	  },

	  /**
	   * Initialize plugins on any elements within `elem` (and `elem` itself) that aren't already initialized.
	   * @param {Object} elem - jQuery object containing the element to check inside. Also checks the element itself, unless it's the `document` object.
	   * @param {String|Array} plugins - A list of plugins to initialize. Leave this out to initialize everything.
	   */
	  reflow: function reflow(elem, plugins) {

	    // If plugins is undefined, just grab everything
	    if (typeof plugins === 'undefined') {
	      plugins = Object.keys(this._plugins);
	    }
	    // If plugins is a string, convert it to an array with one item
	    else if (typeof plugins === 'string') {
	        plugins = [plugins];
	      }

	    var _this = this;

	    // Iterate through each plugin
	    _jquery2.default.each(plugins, function (i, name) {
	      // Get the current plugin
	      var plugin = _this._plugins[name];

	      // Localize the search to all elements inside elem, as well as elem itself, unless elem === document
	      var $elem = (0, _jquery2.default)(elem).find('[data-' + name + ']').addBack('[data-' + name + ']');

	      // For each plugin found, initialize it
	      $elem.each(function () {
	        var $el = (0, _jquery2.default)(this),
	            opts = {};
	        // Don't double-dip on plugins
	        if ($el.data('zfPlugin')) {
	          console.warn("Tried to initialize " + name + " on an element that already has a Foundation plugin.");
	          return;
	        }

	        if ($el.attr('data-options')) {
	          var thing = $el.attr('data-options').split(';').forEach(function (e, i) {
	            var opt = e.split(':').map(function (el) {
	              return el.trim();
	            });
	            if (opt[0]) opts[opt[0]] = parseValue(opt[1]);
	          });
	        }
	        try {
	          $el.data('zfPlugin', new plugin((0, _jquery2.default)(this), opts));
	        } catch (er) {
	          console.error(er);
	        } finally {
	          return;
	        }
	      });
	    });
	  },
	  getFnName: functionName,

	  addToJquery: function addToJquery($) {
	    // TODO: consider not making this a jQuery function
	    // TODO: need way to reflow vs. re-initialize
	    /**
	     * The Foundation jQuery method.
	     * @param {String|Array} method - An action to perform on the current jQuery object.
	     */
	    var foundation = function foundation(method) {
	      var type = typeof method === 'undefined' ? 'undefined' : _typeof(method),
	          $noJS = $('.no-js');

	      if ($noJS.length) {
	        $noJS.removeClass('no-js');
	      }

	      if (type === 'undefined') {
	        //needs to initialize the Foundation object, or an individual plugin.
	        Foundation.MediaQuery._init();
	        Foundation.reflow(this);
	      } else if (type === 'string') {
	        //an individual method to invoke on a plugin or group of plugins
	        var args = Array.prototype.slice.call(arguments, 1); //collect all the arguments, if necessary
	        var plugClass = this.data('zfPlugin'); //determine the class of plugin

	        if (plugClass !== undefined && plugClass[method] !== undefined) {
	          //make sure both the class and method exist
	          if (this.length === 1) {
	            //if there's only one, call it directly.
	            plugClass[method].apply(plugClass, args);
	          } else {
	            this.each(function (i, el) {
	              //otherwise loop through the jQuery collection and invoke the method on each
	              plugClass[method].apply($(el).data('zfPlugin'), args);
	            });
	          }
	        } else {
	          //error for no class or no method
	          throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : 'this element') + '.');
	        }
	      } else {
	        //error for invalid argument type
	        throw new TypeError('We\'re sorry, ' + type + ' is not a valid parameter. You must use a string representing the method you wish to invoke.');
	      }
	      return this;
	    };
	    $.fn.foundation = foundation;
	    return $;
	  }
	};

	Foundation.util = {
	  /**
	   * Function for applying a debounce effect to a function call.
	   * @function
	   * @param {Function} func - Function to be called at end of timeout.
	   * @param {Number} delay - Time in ms to delay the call of `func`.
	   * @returns function
	   */
	  throttle: function throttle(func, delay) {
	    var timer = null;

	    return function () {
	      var context = this,
	          args = arguments;

	      if (timer === null) {
	        timer = setTimeout(function () {
	          func.apply(context, args);
	          timer = null;
	        }, delay);
	      }
	    };
	  }
	};

	window.Foundation = Foundation;

	// Polyfill for requestAnimationFrame
	(function () {
	  if (!Date.now || !window.Date.now) window.Date.now = Date.now = function () {
	    return new Date().getTime();
	  };

	  var vendors = ['webkit', 'moz'];
	  for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
	    var vp = vendors[i];
	    window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
	    window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame'];
	  }
	  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
	    var lastTime = 0;
	    window.requestAnimationFrame = function (callback) {
	      var now = Date.now();
	      var nextTime = Math.max(lastTime + 16, now);
	      return setTimeout(function () {
	        callback(lastTime = nextTime);
	      }, nextTime - now);
	    };
	    window.cancelAnimationFrame = clearTimeout;
	  }
	  /**
	   * Polyfill for performance.now, required by rAF
	   */
	  if (!window.performance || !window.performance.now) {
	    window.performance = {
	      start: Date.now(),
	      now: function now() {
	        return Date.now() - this.start;
	      }
	    };
	  }
	})();
	if (!Function.prototype.bind) {
	  Function.prototype.bind = function (oThis) {
	    if (typeof this !== 'function') {
	      // closest thing possible to the ECMAScript 5
	      // internal IsCallable function
	      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
	    }

	    var aArgs = Array.prototype.slice.call(arguments, 1),
	        fToBind = this,
	        fNOP = function fNOP() {},
	        fBound = function fBound() {
	      return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
	    };

	    if (this.prototype) {
	      // native functions don't have a prototype
	      fNOP.prototype = this.prototype;
	    }
	    fBound.prototype = new fNOP();

	    return fBound;
	  };
	}
	// Polyfill to get the name of a function in IE9
	function functionName(fn) {
	  if (Function.prototype.name === undefined) {
	    var funcNameRegex = /function\s([^(]{1,})\(/;
	    var results = funcNameRegex.exec(fn.toString());
	    return results && results.length > 1 ? results[1].trim() : "";
	  } else if (fn.prototype === undefined) {
	    return fn.constructor.name;
	  } else {
	    return fn.prototype.constructor.name;
	  }
	}
	function parseValue(str) {
	  if ('true' === str) return true;else if ('false' === str) return false;else if (!isNaN(str * 1)) return parseFloat(str);
	  return str;
	}
	// Convert PascalCase to kebab-case
	// Thank you: http://stackoverflow.com/a/8955580
	function hyphenate(str) {
	  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}

	exports.Foundation = Foundation;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.transitionend = exports.GetYoDigits = exports.rtl = undefined;

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Core Foundation Utilities, utilized in a number of places.

	/**
	 * Returns a boolean for RTL support
	 */
	function rtl() {
	  return (0, _jquery2.default)('html').attr('dir') === 'rtl';
	}

	/**
	 * returns a random base-36 uid with namespacing
	 * @function
	 * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
	 * @param {String} namespace - name of plugin to be incorporated in uid, optional.
	 * @default {String} '' - if no plugin name is provided, nothing is appended to the uid.
	 * @returns {String} - unique id
	 */
	function GetYoDigits(length, namespace) {
	  length = length || 6;
	  return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1) + (namespace ? '-' + namespace : '');
	}

	function transitionend($elem) {
	  var transitions = {
	    'transition': 'transitionend',
	    'WebkitTransition': 'webkitTransitionEnd',
	    'MozTransition': 'transitionend',
	    'OTransition': 'otransitionend'
	  };
	  var elem = document.createElement('div'),
	      end;

	  for (var t in transitions) {
	    if (typeof elem.style[t] !== 'undefined') {
	      end = transitions[t];
	    }
	  }
	  if (end) {
	    return end;
	  } else {
	    end = setTimeout(function () {
	      $elem.triggerHandler('transitionend', [$elem]);
	    }, 1);
	    return 'transitionend';
	  }
	}

	exports.rtl = rtl;
	exports.GetYoDigits = GetYoDigits;
	exports.transitionend = transitionend;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Box = undefined;

	var _foundationUtil = __webpack_require__(4);

	var Box = {
	  ImNotTouchingYou: ImNotTouchingYou,
	  OverlapArea: OverlapArea,
	  GetDimensions: GetDimensions,
	  GetOffsets: GetOffsets,
	  GetExplicitOffsets: GetExplicitOffsets

	  /**
	   * Compares the dimensions of an element to a container and determines collision events with container.
	   * @function
	   * @param {jQuery} element - jQuery object to test for collisions.
	   * @param {jQuery} parent - jQuery object to use as bounding container.
	   * @param {Boolean} lrOnly - set to true to check left and right values only.
	   * @param {Boolean} tbOnly - set to true to check top and bottom values only.
	   * @default if no parent object passed, detects collisions with `window`.
	   * @returns {Boolean} - true if collision free, false if a collision in any direction.
	   */
	};function ImNotTouchingYou(element, parent, lrOnly, tbOnly, ignoreBottom) {
	  return OverlapArea(element, parent, lrOnly, tbOnly, ignoreBottom) === 0;
	};

	function OverlapArea(element, parent, lrOnly, tbOnly, ignoreBottom) {
	  var eleDims = GetDimensions(element),
	      topOver,
	      bottomOver,
	      leftOver,
	      rightOver;
	  if (parent) {
	    var parDims = GetDimensions(parent);

	    bottomOver = parDims.height + parDims.offset.top - (eleDims.offset.top + eleDims.height);
	    topOver = eleDims.offset.top - parDims.offset.top;
	    leftOver = eleDims.offset.left - parDims.offset.left;
	    rightOver = parDims.width + parDims.offset.left - (eleDims.offset.left + eleDims.width);
	  } else {
	    bottomOver = eleDims.windowDims.height + eleDims.windowDims.offset.top - (eleDims.offset.top + eleDims.height);
	    topOver = eleDims.offset.top - eleDims.windowDims.offset.top;
	    leftOver = eleDims.offset.left - eleDims.windowDims.offset.left;
	    rightOver = eleDims.windowDims.width - (eleDims.offset.left + eleDims.width);
	  }

	  bottomOver = ignoreBottom ? 0 : Math.min(bottomOver, 0);
	  topOver = Math.min(topOver, 0);
	  leftOver = Math.min(leftOver, 0);
	  rightOver = Math.min(rightOver, 0);

	  if (lrOnly) {
	    return leftOver + rightOver;
	  }
	  if (tbOnly) {
	    return topOver + bottomOver;
	  }

	  // use sum of squares b/c we care about overlap area.
	  return Math.sqrt(topOver * topOver + bottomOver * bottomOver + leftOver * leftOver + rightOver * rightOver);
	}

	/**
	 * Uses native methods to return an object of dimension values.
	 * @function
	 * @param {jQuery || HTML} element - jQuery object or DOM element for which to get the dimensions. Can be any element other that document or window.
	 * @returns {Object} - nested object of integer pixel values
	 * TODO - if element is window, return only those values.
	 */
	function GetDimensions(elem, test) {
	  elem = elem.length ? elem[0] : elem;

	  if (elem === window || elem === document) {
	    throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
	  }

	  var rect = elem.getBoundingClientRect(),
	      parRect = elem.parentNode.getBoundingClientRect(),
	      winRect = document.body.getBoundingClientRect(),
	      winY = window.pageYOffset,
	      winX = window.pageXOffset;

	  return {
	    width: rect.width,
	    height: rect.height,
	    offset: {
	      top: rect.top + winY,
	      left: rect.left + winX
	    },
	    parentDims: {
	      width: parRect.width,
	      height: parRect.height,
	      offset: {
	        top: parRect.top + winY,
	        left: parRect.left + winX
	      }
	    },
	    windowDims: {
	      width: winRect.width,
	      height: winRect.height,
	      offset: {
	        top: winY,
	        left: winX
	      }
	    }
	  };
	}

	/**
	 * Returns an object of top and left integer pixel values for dynamically rendered elements,
	 * such as: Tooltip, Reveal, and Dropdown. Maintained for backwards compatibility, and where
	 * you don't know alignment, but generally from
	 * 6.4 forward you should use GetExplicitOffsets, as GetOffsets conflates position and alignment.
	 * @function
	 * @param {jQuery} element - jQuery object for the element being positioned.
	 * @param {jQuery} anchor - jQuery object for the element's anchor point.
	 * @param {String} position - a string relating to the desired position of the element, relative to it's anchor
	 * @param {Number} vOffset - integer pixel value of desired vertical separation between anchor and element.
	 * @param {Number} hOffset - integer pixel value of desired horizontal separation between anchor and element.
	 * @param {Boolean} isOverflow - if a collision event is detected, sets to true to default the element to full width - any desired offset.
	 * TODO alter/rewrite to work with `em` values as well/instead of pixels
	 */
	function GetOffsets(element, anchor, position, vOffset, hOffset, isOverflow) {
	  console.log("NOTE: GetOffsets is deprecated in favor of GetExplicitOffsets and will be removed in 6.5");
	  switch (position) {
	    case 'top':
	      return (0, _foundationUtil.rtl)() ? GetExplicitOffsets(element, anchor, 'top', 'left', vOffset, hOffset, isOverflow) : GetExplicitOffsets(element, anchor, 'top', 'right', vOffset, hOffset, isOverflow);
	    case 'bottom':
	      return (0, _foundationUtil.rtl)() ? GetExplicitOffsets(element, anchor, 'bottom', 'left', vOffset, hOffset, isOverflow) : GetExplicitOffsets(element, anchor, 'bottom', 'right', vOffset, hOffset, isOverflow);
	    case 'center top':
	      return GetExplicitOffsets(element, anchor, 'top', 'center', vOffset, hOffset, isOverflow);
	    case 'center bottom':
	      return GetExplicitOffsets(element, anchor, 'bottom', 'center', vOffset, hOffset, isOverflow);
	    case 'center left':
	      return GetExplicitOffsets(element, anchor, 'left', 'center', vOffset, hOffset, isOverflow);
	    case 'center right':
	      return GetExplicitOffsets(element, anchor, 'right', 'center', vOffset, hOffset, isOverflow);
	    case 'left bottom':
	      return GetExplicitOffsets(element, anchor, 'bottom', 'left', vOffset, hOffset, isOverflow);
	    case 'right bottom':
	      return GetExplicitOffsets(element, anchor, 'bottom', 'right', vOffset, hOffset, isOverflow);
	    // Backwards compatibility... this along with the reveal and reveal full
	    // classes are the only ones that didn't reference anchor
	    case 'center':
	      return {
	        left: $eleDims.windowDims.offset.left + $eleDims.windowDims.width / 2 - $eleDims.width / 2 + hOffset,
	        top: $eleDims.windowDims.offset.top + $eleDims.windowDims.height / 2 - ($eleDims.height / 2 + vOffset)
	      };
	    case 'reveal':
	      return {
	        left: ($eleDims.windowDims.width - $eleDims.width) / 2 + hOffset,
	        top: $eleDims.windowDims.offset.top + vOffset
	      };
	    case 'reveal full':
	      return {
	        left: $eleDims.windowDims.offset.left,
	        top: $eleDims.windowDims.offset.top
	      };
	      break;
	    default:
	      return {
	        left: (0, _foundationUtil.rtl)() ? $anchorDims.offset.left - $eleDims.width + $anchorDims.width - hOffset : $anchorDims.offset.left + hOffset,
	        top: $anchorDims.offset.top + $anchorDims.height + vOffset
	      };

	  }
	}

	function GetExplicitOffsets(element, anchor, position, alignment, vOffset, hOffset, isOverflow) {
	  var $eleDims = GetDimensions(element),
	      $anchorDims = anchor ? GetDimensions(anchor) : null;

	  var topVal, leftVal;

	  // set position related attribute

	  switch (position) {
	    case 'top':
	      topVal = $anchorDims.offset.top - ($eleDims.height + vOffset);
	      break;
	    case 'bottom':
	      topVal = $anchorDims.offset.top + $anchorDims.height + vOffset;
	      break;
	    case 'left':
	      leftVal = $anchorDims.offset.left - ($eleDims.width + hOffset);
	      break;
	    case 'right':
	      leftVal = $anchorDims.offset.left + $anchorDims.width + hOffset;
	      break;
	  }

	  // set alignment related attribute
	  switch (position) {
	    case 'top':
	    case 'bottom':
	      switch (alignment) {
	        case 'left':
	          leftVal = $anchorDims.offset.left + hOffset;
	          break;
	        case 'right':
	          leftVal = $anchorDims.offset.left - $eleDims.width + $anchorDims.width - hOffset;
	          break;
	        case 'center':
	          leftVal = isOverflow ? hOffset : $anchorDims.offset.left + $anchorDims.width / 2 - $eleDims.width / 2 + hOffset;
	          break;
	      }
	      break;
	    case 'right':
	    case 'left':
	      switch (alignment) {
	        case 'bottom':
	          topVal = $anchorDims.offset.top - vOffset + $anchorDims.height - $eleDims.height;
	          break;
	        case 'top':
	          topVal = $anchorDims.offset.top + vOffset;
	          break;
	        case 'center':
	          topVal = $anchorDims.offset.top + vOffset + $anchorDims.height / 2 - $eleDims.height / 2;
	          break;
	      }
	      break;
	  }
	  return { top: topVal, left: leftVal };
	}

	exports.Box = Box;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.onImagesLoaded = undefined;

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Runs a callback function when images are fully loaded.
	 * @param {Object} images - Image(s) to check if loaded.
	 * @param {Func} callback - Function to execute when image is fully loaded.
	 */
	function onImagesLoaded(images, callback) {
	  var self = this,
	      unloaded = images.length;

	  if (unloaded === 0) {
	    callback();
	  }

	  images.each(function () {
	    // Check if image is loaded
	    if (this.complete && this.naturalWidth !== undefined) {
	      singleImageLoaded();
	    } else {
	      // If the above check failed, simulate loading on detached element.
	      var image = new Image();
	      // Still count image as loaded if it finalizes with an error.
	      var events = "load.zf.images error.zf.images";
	      (0, _jquery2.default)(image).one(events, function me(event) {
	        // Unbind the event listeners. We're using 'one' but only one of the two events will have fired.
	        (0, _jquery2.default)(this).off(events, me);
	        singleImageLoaded();
	      });
	      image.src = (0, _jquery2.default)(this).attr('src');
	    }
	  });

	  function singleImageLoaded() {
	    unloaded--;
	    if (unloaded === 0) {
	      callback();
	    }
	  }
	}

	exports.onImagesLoaded = onImagesLoaded;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/*******************************************
	 *                                         *
	 * This util was created by Marius Olbertz *
	 * Please thank Marius on GitHub /owlbertz *
	 * or the web http://www.mariusolbertz.de/ *
	 *                                         *
	 ******************************************/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Keyboard = undefined;

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _foundationUtil = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var keyCodes = {
	  9: 'TAB',
	  13: 'ENTER',
	  27: 'ESCAPE',
	  32: 'SPACE',
	  35: 'END',
	  36: 'HOME',
	  37: 'ARROW_LEFT',
	  38: 'ARROW_UP',
	  39: 'ARROW_RIGHT',
	  40: 'ARROW_DOWN'
	};

	var commands = {};

	// Functions pulled out to be referenceable from internals
	function findFocusable($element) {
	  if (!$element) {
	    return false;
	  }
	  return $element.find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]').filter(function () {
	    if (!(0, _jquery2.default)(this).is(':visible') || (0, _jquery2.default)(this).attr('tabindex') < 0) {
	      return false;
	    } //only have visible elements and those that have a tabindex greater or equal 0
	    return true;
	  });
	}

	function parseKey(event) {
	  var key = keyCodes[event.which || event.keyCode] || String.fromCharCode(event.which).toUpperCase();

	  // Remove un-printable characters, e.g. for `fromCharCode` calls for CTRL only events
	  key = key.replace(/\W+/, '');

	  if (event.shiftKey) key = 'SHIFT_' + key;
	  if (event.ctrlKey) key = 'CTRL_' + key;
	  if (event.altKey) key = 'ALT_' + key;

	  // Remove trailing underscore, in case only modifiers were used (e.g. only `CTRL_ALT`)
	  key = key.replace(/_$/, '');

	  return key;
	}

	var Keyboard = {
	  keys: getKeyCodes(keyCodes),

	  /**
	   * Parses the (keyboard) event and returns a String that represents its key
	   * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
	   * @param {Event} event - the event generated by the event handler
	   * @return String key - String that represents the key pressed
	   */
	  parseKey: parseKey,

	  /**
	   * Handles the given (keyboard) event
	   * @param {Event} event - the event generated by the event handler
	   * @param {String} component - Foundation component's name, e.g. Slider or Reveal
	   * @param {Objects} functions - collection of functions that are to be executed
	   */
	  handleKey: function handleKey(event, component, functions) {
	    var commandList = commands[component],
	        keyCode = this.parseKey(event),
	        cmds,
	        command,
	        fn;

	    if (!commandList) return console.warn('Component not defined!');

	    if (typeof commandList.ltr === 'undefined') {
	      // this component does not differentiate between ltr and rtl
	      cmds = commandList; // use plain list
	    } else {
	      // merge ltr and rtl: if document is rtl, rtl overwrites ltr and vice versa
	      if ((0, _foundationUtil.rtl)()) cmds = _jquery2.default.extend({}, commandList.ltr, commandList.rtl);else cmds = _jquery2.default.extend({}, commandList.rtl, commandList.ltr);
	    }
	    command = cmds[keyCode];

	    fn = functions[command];
	    if (fn && typeof fn === 'function') {
	      // execute function  if exists
	      var returnValue = fn.apply();
	      if (functions.handled || typeof functions.handled === 'function') {
	        // execute function when event was handled
	        functions.handled(returnValue);
	      }
	    } else {
	      if (functions.unhandled || typeof functions.unhandled === 'function') {
	        // execute function when event was not handled
	        functions.unhandled();
	      }
	    }
	  },


	  /**
	   * Finds all focusable elements within the given `$element`
	   * @param {jQuery} $element - jQuery object to search within
	   * @return {jQuery} $focusable - all focusable elements within `$element`
	   */

	  findFocusable: findFocusable,

	  /**
	   * Returns the component name name
	   * @param {Object} component - Foundation component, e.g. Slider or Reveal
	   * @return String componentName
	   */

	  register: function register(componentName, cmds) {
	    commands[componentName] = cmds;
	  },


	  // TODO9438: These references to Keyboard need to not require global. Will 'this' work in this context?
	  //
	  /**
	   * Traps the focus in the given element.
	   * @param  {jQuery} $element  jQuery object to trap the foucs into.
	   */
	  trapFocus: function trapFocus($element) {
	    var $focusable = findFocusable($element),
	        $firstFocusable = $focusable.eq(0),
	        $lastFocusable = $focusable.eq(-1);

	    $element.on('keydown.zf.trapfocus', function (event) {
	      if (event.target === $lastFocusable[0] && parseKey(event) === 'TAB') {
	        event.preventDefault();
	        $firstFocusable.focus();
	      } else if (event.target === $firstFocusable[0] && parseKey(event) === 'SHIFT_TAB') {
	        event.preventDefault();
	        $lastFocusable.focus();
	      }
	    });
	  },

	  /**
	   * Releases the trapped focus from the given element.
	   * @param  {jQuery} $element  jQuery object to release the focus for.
	   */
	  releaseFocus: function releaseFocus($element) {
	    $element.off('keydown.zf.trapfocus');
	  }
	};

	/*
	 * Constants for easier comparing.
	 * Can be used like Foundation.parseKey(event) === Foundation.keys.SPACE
	 */
	function getKeyCodes(kcs) {
	  var k = {};
	  for (var kc in kcs) {
	    k[kcs[kc]] = kcs[kc];
	  }return k;
	}

	exports.Keyboard = Keyboard;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MediaQuery = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Default set of media queries
	var defaultQueries = {
	  'default': 'only screen',
	  landscape: 'only screen and (orientation: landscape)',
	  portrait: 'only screen and (orientation: portrait)',
	  retina: 'only screen and (-webkit-min-device-pixel-ratio: 2),' + 'only screen and (min--moz-device-pixel-ratio: 2),' + 'only screen and (-o-min-device-pixel-ratio: 2/1),' + 'only screen and (min-device-pixel-ratio: 2),' + 'only screen and (min-resolution: 192dpi),' + 'only screen and (min-resolution: 2dppx)'
	};

	// matchMedia() polyfill - Test a CSS media type/query in JS.
	// Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license
	var matchMedia = window.matchMedia || function () {
	  'use strict';

	  // For browsers that support matchMedium api such as IE 9 and webkit

	  var styleMedia = window.styleMedia || window.media;

	  // For those that don't support matchMedium
	  if (!styleMedia) {
	    var style = document.createElement('style'),
	        script = document.getElementsByTagName('script')[0],
	        info = null;

	    style.type = 'text/css';
	    style.id = 'matchmediajs-test';

	    script && script.parentNode && script.parentNode.insertBefore(style, script);

	    // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
	    info = 'getComputedStyle' in window && window.getComputedStyle(style, null) || style.currentStyle;

	    styleMedia = {
	      matchMedium: function matchMedium(media) {
	        var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

	        // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
	        if (style.styleSheet) {
	          style.styleSheet.cssText = text;
	        } else {
	          style.textContent = text;
	        }

	        // Test if media query is true or false
	        return info.width === '1px';
	      }
	    };
	  }

	  return function (media) {
	    return {
	      matches: styleMedia.matchMedium(media || 'all'),
	      media: media || 'all'
	    };
	  };
	}();

	var MediaQuery = {
	  queries: [],

	  current: '',

	  /**
	   * Initializes the media query helper, by extracting the breakpoint list from the CSS and activating the breakpoint watcher.
	   * @function
	   * @private
	   */
	  _init: function _init() {
	    var self = this;
	    var $meta = (0, _jquery2.default)('meta.foundation-mq');
	    if (!$meta.length) {
	      (0, _jquery2.default)('<meta class="foundation-mq">').appendTo(document.head);
	    }

	    var extractedStyles = (0, _jquery2.default)('.foundation-mq').css('font-family');
	    var namedQueries;

	    namedQueries = parseStyleToObject(extractedStyles);

	    for (var key in namedQueries) {
	      if (namedQueries.hasOwnProperty(key)) {
	        self.queries.push({
	          name: key,
	          value: 'only screen and (min-width: ' + namedQueries[key] + ')'
	        });
	      }
	    }

	    this.current = this._getCurrentSize();

	    this._watcher();
	  },


	  /**
	   * Checks if the screen is at least as wide as a breakpoint.
	   * @function
	   * @param {String} size - Name of the breakpoint to check.
	   * @returns {Boolean} `true` if the breakpoint matches, `false` if it's smaller.
	   */
	  atLeast: function atLeast(size) {
	    var query = this.get(size);

	    if (query) {
	      return matchMedia(query).matches;
	    }

	    return false;
	  },


	  /**
	   * Checks if the screen matches to a breakpoint.
	   * @function
	   * @param {String} size - Name of the breakpoint to check, either 'small only' or 'small'. Omitting 'only' falls back to using atLeast() method.
	   * @returns {Boolean} `true` if the breakpoint matches, `false` if it does not.
	   */
	  is: function is(size) {
	    size = size.trim().split(' ');
	    if (size.length > 1 && size[1] === 'only') {
	      if (size[0] === this._getCurrentSize()) return true;
	    } else {
	      return this.atLeast(size[0]);
	    }
	    return false;
	  },


	  /**
	   * Gets the media query of a breakpoint.
	   * @function
	   * @param {String} size - Name of the breakpoint to get.
	   * @returns {String|null} - The media query of the breakpoint, or `null` if the breakpoint doesn't exist.
	   */
	  get: function get(size) {
	    for (var i in this.queries) {
	      if (this.queries.hasOwnProperty(i)) {
	        var query = this.queries[i];
	        if (size === query.name) return query.value;
	      }
	    }

	    return null;
	  },


	  /**
	   * Gets the current breakpoint name by testing every breakpoint and returning the last one to match (the biggest one).
	   * @function
	   * @private
	   * @returns {String} Name of the current breakpoint.
	   */
	  _getCurrentSize: function _getCurrentSize() {
	    var matched;

	    for (var i = 0; i < this.queries.length; i++) {
	      var query = this.queries[i];

	      if (matchMedia(query.value).matches) {
	        matched = query;
	      }
	    }

	    if ((typeof matched === 'undefined' ? 'undefined' : _typeof(matched)) === 'object') {
	      return matched.name;
	    } else {
	      return matched;
	    }
	  },


	  /**
	   * Activates the breakpoint watcher, which fires an event on the window whenever the breakpoint changes.
	   * @function
	   * @private
	   */
	  _watcher: function _watcher() {
	    var _this = this;

	    (0, _jquery2.default)(window).off('resize.zf.mediaquery').on('resize.zf.mediaquery', function () {
	      var newSize = _this._getCurrentSize(),
	          currentSize = _this.current;

	      if (newSize !== currentSize) {
	        // Change the current media query
	        _this.current = newSize;

	        // Broadcast the media query change on the window
	        (0, _jquery2.default)(window).trigger('changed.zf.mediaquery', [newSize, currentSize]);
	      }
	    });
	  }
	};

	// Thank you: https://github.com/sindresorhus/query-string
	function parseStyleToObject(str) {
	  var styleObject = {};

	  if (typeof str !== 'string') {
	    return styleObject;
	  }

	  str = str.trim().slice(1, -1); // browsers re-quote string style values

	  if (!str) {
	    return styleObject;
	  }

	  styleObject = str.split('&').reduce(function (ret, param) {
	    var parts = param.replace(/\+/g, ' ').split('=');
	    var key = parts[0];
	    var val = parts[1];
	    key = decodeURIComponent(key);

	    // missing `=` should be `null`:
	    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
	    val = val === undefined ? null : decodeURIComponent(val);

	    if (!ret.hasOwnProperty(key)) {
	      ret[key] = val;
	    } else if (Array.isArray(ret[key])) {
	      ret[key].push(val);
	    } else {
	      ret[key] = [ret[key], val];
	    }
	    return ret;
	  }, {});

	  return styleObject;
	}

	exports.MediaQuery = MediaQuery;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Motion = exports.Move = undefined;

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _foundationUtil = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Motion module.
	 * @module foundation.motion
	 */

	var initClasses = ['mui-enter', 'mui-leave'];
	var activeClasses = ['mui-enter-active', 'mui-leave-active'];

	var Motion = {
	  animateIn: function animateIn(element, animation, cb) {
	    animate(true, element, animation, cb);
	  },

	  animateOut: function animateOut(element, animation, cb) {
	    animate(false, element, animation, cb);
	  }
	};

	function Move(duration, elem, fn) {
	  var anim,
	      prog,
	      start = null;
	  // console.log('called');

	  if (duration === 0) {
	    fn.apply(elem);
	    elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
	    return;
	  }

	  function move(ts) {
	    if (!start) start = ts;
	    // console.log(start, ts);
	    prog = ts - start;
	    fn.apply(elem);

	    if (prog < duration) {
	      anim = window.requestAnimationFrame(move, elem);
	    } else {
	      window.cancelAnimationFrame(anim);
	      elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
	    }
	  }
	  anim = window.requestAnimationFrame(move);
	}

	/**
	 * Animates an element in or out using a CSS transition class.
	 * @function
	 * @private
	 * @param {Boolean} isIn - Defines if the animation is in or out.
	 * @param {Object} element - jQuery or HTML object to animate.
	 * @param {String} animation - CSS class to use.
	 * @param {Function} cb - Callback to run when animation is finished.
	 */
	function animate(isIn, element, animation, cb) {
	  element = (0, _jquery2.default)(element).eq(0);

	  if (!element.length) return;

	  var initClass = isIn ? initClasses[0] : initClasses[1];
	  var activeClass = isIn ? activeClasses[0] : activeClasses[1];

	  // Set up the animation
	  reset();

	  element.addClass(animation).css('transition', 'none');

	  requestAnimationFrame(function () {
	    element.addClass(initClass);
	    if (isIn) element.show();
	  });

	  // Start the animation
	  requestAnimationFrame(function () {
	    element[0].offsetWidth;
	    element.css('transition', '').addClass(activeClass);
	  });

	  // Clean up the animation when it finishes
	  element.one((0, _foundationUtil.transitionend)(element), finish);

	  // Hides the element (for out animations), resets the element, and runs a callback
	  function finish() {
	    if (!isIn) element.hide();
	    reset();
	    if (cb) cb.apply(element);
	  }

	  // Resets transitions and removes motion-specific classes
	  function reset() {
	    element[0].style.transitionDuration = 0;
	    element.removeClass(initClass + ' ' + activeClass + ' ' + animation);
	  }
	}

	exports.Move = Move;
	exports.Motion = Motion;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Nest = undefined;

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Nest = {
	  Feather: function Feather(menu) {
	    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'zf';

	    menu.attr('role', 'menubar');

	    var items = menu.find('li').attr({ 'role': 'menuitem' }),
	        subMenuClass = 'is-' + type + '-submenu',
	        subItemClass = subMenuClass + '-item',
	        hasSubClass = 'is-' + type + '-submenu-parent',
	        applyAria = type !== 'accordion'; // Accordions handle their own ARIA attriutes.

	    items.each(function () {
	      var $item = (0, _jquery2.default)(this),
	          $sub = $item.children('ul');

	      if ($sub.length) {
	        $item.addClass(hasSubClass);
	        $sub.addClass('submenu ' + subMenuClass).attr({ 'data-submenu': '' });
	        if (applyAria) {
	          $item.attr({
	            'aria-haspopup': true,
	            'aria-label': $item.children('a:first').text()
	          });
	          // Note:  Drilldowns behave differently in how they hide, and so need
	          // additional attributes.  We should look if this possibly over-generalized
	          // utility (Nest) is appropriate when we rework menus in 6.4
	          if (type === 'drilldown') {
	            $item.attr({ 'aria-expanded': false });
	          }
	        }
	        $sub.addClass('submenu ' + subMenuClass).attr({
	          'data-submenu': '',
	          'role': 'menu'
	        });
	        if (type === 'drilldown') {
	          $sub.attr({ 'aria-hidden': true });
	        }
	      }

	      if ($item.parent('[data-submenu]').length) {
	        $item.addClass('is-submenu-item ' + subItemClass);
	      }
	    });

	    return;
	  },
	  Burn: function Burn(menu, type) {
	    var //items = menu.find('li'),
	    subMenuClass = 'is-' + type + '-submenu',
	        subItemClass = subMenuClass + '-item',
	        hasSubClass = 'is-' + type + '-submenu-parent';

	    menu.find('>li, .menu, .menu > li').removeClass(subMenuClass + ' ' + subItemClass + ' ' + hasSubClass + ' is-submenu-item submenu is-active').removeAttr('data-submenu').css('display', '');
	  }
	};

	exports.Nest = Nest;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Timer = undefined;

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Timer(elem, options, cb) {
	  var _this = this,
	      duration = options.duration,
	      //options is an object for easily adding features later.
	  nameSpace = Object.keys(elem.data())[0] || 'timer',
	      remain = -1,
	      start,
	      timer;

	  this.isPaused = false;

	  this.restart = function () {
	    remain = -1;
	    clearTimeout(timer);
	    this.start();
	  };

	  this.start = function () {
	    this.isPaused = false;
	    // if(!elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.
	    clearTimeout(timer);
	    remain = remain <= 0 ? duration : remain;
	    elem.data('paused', false);
	    start = Date.now();
	    timer = setTimeout(function () {
	      if (options.infinite) {
	        _this.restart(); //rerun the timer.
	      }
	      if (cb && typeof cb === 'function') {
	        cb();
	      }
	    }, remain);
	    elem.trigger('timerstart.zf.' + nameSpace);
	  };

	  this.pause = function () {
	    this.isPaused = true;
	    //if(elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.
	    clearTimeout(timer);
	    elem.data('paused', true);
	    var end = Date.now();
	    remain = remain - (end - start);
	    elem.trigger('timerpaused.zf.' + nameSpace);
	  };
	}

	exports.Timer = Timer;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var $skipLinkHolder = (0, _jquery2.default)('#skip-to-content'),
	    $skipLink = $skipLinkHolder.find('.skip-to-content-link'); /**
	                                                                * @file
	                                                                * Skip link for accessibility
	                                                                */


	$skipLink.on('click', function (e) {
	  e.preventDefault();
	  var $target = (0, _jquery2.default)((0, _jquery2.default)(this).attr('href'));
	  $target.attr('tabindex', '-1');
	  $target.focus();
	  $target.on('blur focusout', function () {
	    (0, _jquery2.default)(this).removeAttr('tabindex');
	  });
	});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _svgInjector = __webpack_require__(14);

	var _svgInjector2 = _interopRequireDefault(_svgInjector);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Elements to inject
	var mySVGsToInject = document.querySelectorAll('img.inject-me');

	// Do the injection
	/**
	 * @file inject-svg.js
	 *
	 * Use svg-injector.js to replace an svg <img> tag with the inline svg.
	 */
	(0, _svgInjector2.default)(mySVGsToInject, {
	  each: function each(svg) {
	    svg.setAttribute('width', '');
	    svg.setAttribute('height', '');
	  }
	});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * SVGInjector v1.1.3 - Fast, caching, dynamic inline SVG DOM injection library
	 * https://github.com/iconic/SVGInjector
	 *
	 * Copyright (c) 2014-2015 Waybury <hello@waybury.com>
	 * @license MIT
	 */

	(function (window, document) {

	  'use strict';

	  // Environment
	  var isLocal = window.location.protocol === 'file:';
	  var hasSvgSupport = document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1');

	  function uniqueClasses(list) {
	    list = list.split(' ');

	    var hash = {};
	    var i = list.length;
	    var out = [];

	    while (i--) {
	      if (!hash.hasOwnProperty(list[i])) {
	        hash[list[i]] = 1;
	        out.unshift(list[i]);
	      }
	    }

	    return out.join(' ');
	  }

	  /**
	   * cache (or polyfill for <= IE8) Array.forEach()
	   * source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
	   */
	  var forEach = Array.prototype.forEach || function (fn, scope) {
	    if (this === void 0 || this === null || typeof fn !== 'function') {
	      throw new TypeError();
	    }

	    /* jshint bitwise: false */
	    var i, len = this.length >>> 0;
	    /* jshint bitwise: true */

	    for (i = 0; i < len; ++i) {
	      if (i in this) {
	        fn.call(scope, this[i], i, this);
	      }
	    }
	  };

	  // SVG Cache
	  var svgCache = {};

	  var injectCount = 0;
	  var injectedElements = [];

	  // Request Queue
	  var requestQueue = [];

	  // Script running status
	  var ranScripts = {};

	  var cloneSvg = function (sourceSvg) {
	    return sourceSvg.cloneNode(true);
	  };

	  var queueRequest = function (url, callback) {
	    requestQueue[url] = requestQueue[url] || [];
	    requestQueue[url].push(callback);
	  };

	  var processRequestQueue = function (url) {
	    for (var i = 0, len = requestQueue[url].length; i < len; i++) {
	      // Make these calls async so we avoid blocking the page/renderer
	      /* jshint loopfunc: true */
	      (function (index) {
	        setTimeout(function () {
	          requestQueue[url][index](cloneSvg(svgCache[url]));
	        }, 0);
	      })(i);
	      /* jshint loopfunc: false */
	    }
	  };

	  var loadSvg = function (url, callback) {
	    if (svgCache[url] !== undefined) {
	      if (svgCache[url] instanceof SVGSVGElement) {
	        // We already have it in cache, so use it
	        callback(cloneSvg(svgCache[url]));
	      }
	      else {
	        // We don't have it in cache yet, but we are loading it, so queue this request
	        queueRequest(url, callback);
	      }
	    }
	    else {

	      if (!window.XMLHttpRequest) {
	        callback('Browser does not support XMLHttpRequest');
	        return false;
	      }

	      // Seed the cache to indicate we are loading this URL already
	      svgCache[url] = {};
	      queueRequest(url, callback);

	      var httpRequest = new XMLHttpRequest();

	      httpRequest.onreadystatechange = function () {
	        // readyState 4 = complete
	        if (httpRequest.readyState === 4) {

	          // Handle status
	          if (httpRequest.status === 404 || httpRequest.responseXML === null) {
	            callback('Unable to load SVG file: ' + url);

	            if (isLocal) callback('Note: SVG injection ajax calls do not work locally without adjusting security setting in your browser. Or consider using a local webserver.');

	            callback();
	            return false;
	          }

	          // 200 success from server, or 0 when using file:// protocol locally
	          if (httpRequest.status === 200 || (isLocal && httpRequest.status === 0)) {

	            /* globals Document */
	            if (httpRequest.responseXML instanceof Document) {
	              // Cache it
	              svgCache[url] = httpRequest.responseXML.documentElement;
	            }
	            /* globals -Document */

	            // IE9 doesn't create a responseXML Document object from loaded SVG,
	            // and throws a "DOM Exception: HIERARCHY_REQUEST_ERR (3)" error when injected.
	            //
	            // So, we'll just create our own manually via the DOMParser using
	            // the the raw XML responseText.
	            //
	            // :NOTE: IE8 and older doesn't have DOMParser, but they can't do SVG either, so...
	            else if (DOMParser && (DOMParser instanceof Function)) {
	              var xmlDoc;
	              try {
	                var parser = new DOMParser();
	                xmlDoc = parser.parseFromString(httpRequest.responseText, 'text/xml');
	              }
	              catch (e) {
	                xmlDoc = undefined;
	              }

	              if (!xmlDoc || xmlDoc.getElementsByTagName('parsererror').length) {
	                callback('Unable to parse SVG file: ' + url);
	                return false;
	              }
	              else {
	                // Cache it
	                svgCache[url] = xmlDoc.documentElement;
	              }
	            }

	            // We've loaded a new asset, so process any requests waiting for it
	            processRequestQueue(url);
	          }
	          else {
	            callback('There was a problem injecting the SVG: ' + httpRequest.status + ' ' + httpRequest.statusText);
	            return false;
	          }
	        }
	      };

	      httpRequest.open('GET', url);

	      // Treat and parse the response as XML, even if the
	      // server sends us a different mimetype
	      if (httpRequest.overrideMimeType) httpRequest.overrideMimeType('text/xml');

	      httpRequest.send();
	    }
	  };

	  // Inject a single element
	  var injectElement = function (el, evalScripts, pngFallback, callback) {

	    // Grab the src or data-src attribute
	    var imgUrl = el.getAttribute('data-src') || el.getAttribute('src');

	    // We can only inject SVG
	    if (!(/\.svg/i).test(imgUrl)) {
	      callback('Attempted to inject a file with a non-svg extension: ' + imgUrl);
	      return;
	    }

	    // If we don't have SVG support try to fall back to a png,
	    // either defined per-element via data-fallback or data-png,
	    // or globally via the pngFallback directory setting
	    if (!hasSvgSupport) {
	      var perElementFallback = el.getAttribute('data-fallback') || el.getAttribute('data-png');

	      // Per-element specific PNG fallback defined, so use that
	      if (perElementFallback) {
	        el.setAttribute('src', perElementFallback);
	        callback(null);
	      }
	      // Global PNG fallback directoriy defined, use the same-named PNG
	      else if (pngFallback) {
	        el.setAttribute('src', pngFallback + '/' + imgUrl.split('/').pop().replace('.svg', '.png'));
	        callback(null);
	      }
	      // um...
	      else {
	        callback('This browser does not support SVG and no PNG fallback was defined.');
	      }

	      return;
	    }

	    // Make sure we aren't already in the process of injecting this element to
	    // avoid a race condition if multiple injections for the same element are run.
	    // :NOTE: Using indexOf() only _after_ we check for SVG support and bail,
	    // so no need for IE8 indexOf() polyfill
	    if (injectedElements.indexOf(el) !== -1) {
	      return;
	    }

	    // Remember the request to inject this element, in case other injection
	    // calls are also trying to replace this element before we finish
	    injectedElements.push(el);

	    // Try to avoid loading the orginal image src if possible.
	    el.setAttribute('src', '');

	    // Load it up
	    loadSvg(imgUrl, function (svg) {

	      if (typeof svg === 'undefined' || typeof svg === 'string') {
	        callback(svg);
	        return false;
	      }

	      var imgId = el.getAttribute('id');
	      if (imgId) {
	        svg.setAttribute('id', imgId);
	      }

	      var imgTitle = el.getAttribute('title');
	      if (imgTitle) {
	        svg.setAttribute('title', imgTitle);
	      }

	      // Concat the SVG classes + 'injected-svg' + the img classes
	      var classMerge = [].concat(svg.getAttribute('class') || [], 'injected-svg', el.getAttribute('class') || []).join(' ');
	      svg.setAttribute('class', uniqueClasses(classMerge));

	      var imgStyle = el.getAttribute('style');
	      if (imgStyle) {
	        svg.setAttribute('style', imgStyle);
	      }

	      // Copy all the data elements to the svg
	      var imgData = [].filter.call(el.attributes, function (at) {
	        return (/^data-\w[\w\-]*$/).test(at.name);
	      });
	      forEach.call(imgData, function (dataAttr) {
	        if (dataAttr.name && dataAttr.value) {
	          svg.setAttribute(dataAttr.name, dataAttr.value);
	        }
	      });

	      // Make sure any internally referenced clipPath ids and their
	      // clip-path references are unique.
	      //
	      // This addresses the issue of having multiple instances of the
	      // same SVG on a page and only the first clipPath id is referenced.
	      //
	      // Browsers often shortcut the SVG Spec and don't use clipPaths
	      // contained in parent elements that are hidden, so if you hide the first
	      // SVG instance on the page, then all other instances lose their clipping.
	      // Reference: https://bugzilla.mozilla.org/show_bug.cgi?id=376027

	      // Handle all defs elements that have iri capable attributes as defined by w3c: http://www.w3.org/TR/SVG/linking.html#processingIRI
	      // Mapping IRI addressable elements to the properties that can reference them:
	      var iriElementsAndProperties = {
	        'clipPath': ['clip-path'],
	        'color-profile': ['color-profile'],
	        'cursor': ['cursor'],
	        'filter': ['filter'],
	        'linearGradient': ['fill', 'stroke'],
	        'marker': ['marker', 'marker-start', 'marker-mid', 'marker-end'],
	        'mask': ['mask'],
	        'pattern': ['fill', 'stroke'],
	        'radialGradient': ['fill', 'stroke']
	      };

	      var element, elementDefs, properties, currentId, newId;
	      Object.keys(iriElementsAndProperties).forEach(function (key) {
	        element = key;
	        properties = iriElementsAndProperties[key];

	        elementDefs = svg.querySelectorAll('defs ' + element + '[id]');
	        for (var i = 0, elementsLen = elementDefs.length; i < elementsLen; i++) {
	          currentId = elementDefs[i].id;
	          newId = currentId + '-' + injectCount;

	          // All of the properties that can reference this element type
	          var referencingElements;
	          forEach.call(properties, function (property) {
	            // :NOTE: using a substring match attr selector here to deal with IE "adding extra quotes in url() attrs"
	            referencingElements = svg.querySelectorAll('[' + property + '*="' + currentId + '"]');
	            for (var j = 0, referencingElementLen = referencingElements.length; j < referencingElementLen; j++) {
	              referencingElements[j].setAttribute(property, 'url(#' + newId + ')');
	            }
	          });

	          elementDefs[i].id = newId;
	        }
	      });

	      // Remove any unwanted/invalid namespaces that might have been added by SVG editing tools
	      svg.removeAttribute('xmlns:a');

	      // Post page load injected SVGs don't automatically have their script
	      // elements run, so we'll need to make that happen, if requested

	      // Find then prune the scripts
	      var scripts = svg.querySelectorAll('script');
	      var scriptsToEval = [];
	      var script, scriptType;

	      for (var k = 0, scriptsLen = scripts.length; k < scriptsLen; k++) {
	        scriptType = scripts[k].getAttribute('type');

	        // Only process javascript types.
	        // SVG defaults to 'application/ecmascript' for unset types
	        if (!scriptType || scriptType === 'application/ecmascript' || scriptType === 'application/javascript') {

	          // innerText for IE, textContent for other browsers
	          script = scripts[k].innerText || scripts[k].textContent;

	          // Stash
	          scriptsToEval.push(script);

	          // Tidy up and remove the script element since we don't need it anymore
	          svg.removeChild(scripts[k]);
	        }
	      }

	      // Run/Eval the scripts if needed
	      if (scriptsToEval.length > 0 && (evalScripts === 'always' || (evalScripts === 'once' && !ranScripts[imgUrl]))) {
	        for (var l = 0, scriptsToEvalLen = scriptsToEval.length; l < scriptsToEvalLen; l++) {

	          // :NOTE: Yup, this is a form of eval, but it is being used to eval code
	          // the caller has explictely asked to be loaded, and the code is in a caller
	          // defined SVG file... not raw user input.
	          //
	          // Also, the code is evaluated in a closure and not in the global scope.
	          // If you need to put something in global scope, use 'window'
	          new Function(scriptsToEval[l])(window); // jshint ignore:line
	        }

	        // Remember we already ran scripts for this svg
	        ranScripts[imgUrl] = true;
	      }

	      // :WORKAROUND:
	      // IE doesn't evaluate <style> tags in SVGs that are dynamically added to the page.
	      // This trick will trigger IE to read and use any existing SVG <style> tags.
	      //
	      // Reference: https://github.com/iconic/SVGInjector/issues/23
	      var styleTags = svg.querySelectorAll('style');
	      forEach.call(styleTags, function (styleTag) {
	        styleTag.textContent += '';
	      });

	      // Replace the image with the svg
	      el.parentNode.replaceChild(svg, el);

	      // Now that we no longer need it, drop references
	      // to the original element so it can be GC'd
	      delete injectedElements[injectedElements.indexOf(el)];
	      el = null;

	      // Increment the injected count
	      injectCount++;

	      callback(svg);
	    });
	  };

	  /**
	   * SVGInjector
	   *
	   * Replace the given elements with their full inline SVG DOM elements.
	   *
	   * :NOTE: We are using get/setAttribute with SVG because the SVG DOM spec differs from HTML DOM and
	   * can return other unexpected object types when trying to directly access svg properties.
	   * ex: "className" returns a SVGAnimatedString with the class value found in the "baseVal" property,
	   * instead of simple string like with HTML Elements.
	   *
	   * @param {mixes} Array of or single DOM element
	   * @param {object} options
	   * @param {function} callback
	   * @return {object} Instance of SVGInjector
	   */
	  var SVGInjector = function (elements, options, done) {

	    // Options & defaults
	    options = options || {};

	    // Should we run the scripts blocks found in the SVG
	    // 'always' - Run them every time
	    // 'once' - Only run scripts once for each SVG
	    // [false|'never'] - Ignore scripts
	    var evalScripts = options.evalScripts || 'always';

	    // Location of fallback pngs, if desired
	    var pngFallback = options.pngFallback || false;

	    // Callback to run during each SVG injection, returning the SVG injected
	    var eachCallback = options.each;

	    // Do the injection...
	    if (elements.length !== undefined) {
	      var elementsLoaded = 0;
	      forEach.call(elements, function (element) {
	        injectElement(element, evalScripts, pngFallback, function (svg) {
	          if (eachCallback && typeof eachCallback === 'function') eachCallback(svg);
	          if (done && elements.length === ++elementsLoaded) done(elementsLoaded);
	        });
	      });
	    }
	    else {
	      if (elements) {
	        injectElement(elements, evalScripts, pngFallback, function (svg) {
	          if (eachCallback && typeof eachCallback === 'function') eachCallback(svg);
	          if (done) done(1);
	          elements = null;
	        });
	      }
	      else {
	        if (done) done(0);
	      }
	    }
	  };

	  /* global module, exports: true, define */
	  // Node.js or CommonJS
	  if (typeof module === 'object' && typeof module.exports === 'object') {
	    module.exports = exports = SVGInjector;
	  }
	  // AMD support
	  else if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return SVGInjector;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	  // Otherwise, attach to window as global
	  else if (typeof window === 'object') {
	    window.SVGInjector = SVGInjector;
	  }
	  /* global -module, -exports, -define */

	}(window, document));


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var VidKit = function () {
	  function VidKit($el, opts) {
	    _classCallCheck(this, VidKit);

	    if (!opts.videoUrl || !opts.videoType) {
	      return;
	    }
	    this.init(opts, $el);
	  }

	  _createClass(VidKit, [{
	    key: 'init',
	    value: function init(settings, $base) {
	      this.opts = $.extend({
	        videoUrl: '',
	        videoType: 'youtube',
	        elementId: 'bg-video',
	        loop: 1,
	        autoplay: 1,
	        controls: 0,
	        aspectRatio: 1.3333333,
	        verticalAlign: 'middle',
	        backgroundSize: 'cover'
	      }, settings);

	      this.$base = $($base);
	      this.$parent = this.$base.parent();

	      this.opts.videoId = this.getVideoId();
	      this.playerReady = false;
	      this.state = -1;
	      this.player = '';

	      // Autoplay isn't supported on many mobile devices so we
	      // shouldn't even bother with a background video.
	      if (typeof Modernizr !== 'undefined' && Modernizr.touchevents) {
	        return;
	      }

	      if (this.opts.videoType === "youtube") {
	        this.initYT();
	      } else if (this.opts.videoType === "vimeo") {
	        this.initVimeo();
	      } else {
	        throw new Error('The video type is not supported.');
	      }

	      this.setFluidContainer();
	    }
	  }, {
	    key: 'initYT',
	    value: function initYT() {
	      var player = void 0;
	      var inst = this;
	      // This code loads the IFrame Player API code asynchronously.
	      var tag = document.createElement('script');

	      tag.src = "https://www.youtube.com/iframe_api";
	      var firstScriptTag = document.getElementsByTagName('script')[0];
	      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	      // Create container element since YT API can only select elements by id.
	      this.$base.prepend('<div id="' + this.opts.elementId + '" />');

	      // This function creates an <iframe> (and YouTube player)
	      //    after the API code downloads.
	      window.onYouTubeIframeAPIReady = function () {
	        player = new YT.Player(inst.opts.elementId, {
	          width: '100%',
	          height: '100%',
	          videoId: inst.opts.videoId,
	          playerVars: {
	            'autoplay': inst.opts.autoplay,
	            'controls': inst.opts.controls,
	            'showinfo': 0,
	            'rel': 0,
	            'modestbranding': 1,
	            'wmode': 'transparent',
	            'relatedvideos': 0
	          },
	          events: {
	            'onReady': onPlayerReady,
	            'onStateChange': onPlayerStateChange
	          }
	        });
	      };

	      // The API will call this function when the video player is ready.
	      window.onPlayerReady = function (event) {
	        inst.player = event.target;

	        if (inst.opts.autoplay === 1) {
	          event.target.playVideo();
	          inst.$base.trigger('vidKit.playing');
	        } else {
	          inst.$base.addClass('loaded');
	        }

	        player.setVolume(0);

	        var $vidKit = $(player.getIframe());
	        var styles = {
	          position: 'absolute',
	          left: '0',
	          top: '0'
	        };

	        if (player.getPlayerState(0)) {
	          $vidKit.css(styles);
	        }

	        inst.playerReady = true;
	        inst.$base.trigger('vidKit.ready');
	      };

	      window.onPlayerStateChange = function (state) {
	        inst.state = state.data;
	        if (state.data === 0) {
	          // ended
	          player.seekTo(0); // restart
	          inst.$base.trigger('vidKit.ended');
	        } else if (state.data === 1) {
	          // playing
	          inst.$base.trigger('vidKit.playing');
	          inst.$base.addClass('loaded');
	        }
	      };
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      if (this.playerReady) {
	        this.player.playVideo();
	      }
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      if (this.playerReady && this.state === 1) {
	        this.player.pauseVideo();
	      }
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      if (this.playerReady) {
	        this.player.stopVideo();
	      }
	    }
	  }, {
	    key: 'seekTo',
	    value: function seekTo(seconds) {
	      if (this.playerReady) {
	        seconds = seconds || 0;
	        this.player.seekTo(seconds);
	      }
	    }
	  }, {
	    key: 'initVimeo',
	    value: function initVimeo() {
	      var player = void 0,
	          tag = void 0,
	          firstScriptTag = void 0,
	          $iframe = void 0;
	      var inst = this;
	      var width = Math.ceil(inst.$parent.width());
	      var height = Math.ceil(width / inst.opts.aspectRatio);
	      var src = '//player.vimeo.com/video/' + inst.opts.videoId + '?';
	      var params = {
	        api: 1,
	        title: 0,
	        byline: 0,
	        width: width,
	        height: height,
	        loop: inst.opts.loop,
	        autoplay: inst.opts.autoplay,
	        badge: 0
	      };

	      $.each(params, function (key, val) {
	        src = src + key + '=' + val + '&amp;';
	      });

	      // Remove last ampersand.
	      src = src.slice(0, src.lastIndexOf('&amp;'));

	      $iframe = $('<iframe />', {
	        src: src,
	        frameborder: 0,
	        width: '100%',
	        height: '100%'
	      });

	      tag = document.createElement('script');
	      tag.setAttribute('id', 'froogaloop2');

	      tag.src = "https://f.vimeocdn.com/js/froogaloop2.min.js";
	      firstScriptTag = document.getElementsByTagName('script')[0];
	      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	      inst.$base.prepend($iframe);

	      $('#froogaloop2').load(function () {
	        player = $f($iframe[0]);

	        player.addEvent('ready', function () {
	          player.api('setVolume', 0);
	        });
	      });
	    }
	  }, {
	    key: 'setFluidContainer',
	    value: function setFluidContainer() {
	      var inst = this;
	      var $video = inst.$base;
	      var $parent = inst.$parent;
	      var styles = {
	        left: '50%',
	        transform: 'translateX(-50%)'
	      };

	      if (inst.opts.verticalAlign === 'middle') {
	        styles.top = '50%';
	        styles.transform += ' translateY(-50%)';
	      } else if (inst.opts.verticalAlign === 'bottom') {
	        styles.bottom = '0';
	      } else {
	        styles.top = '0';
	      }

	      $video.css(styles);

	      $(window).resize(function () {
	        var elWidth = $parent.outerWidth();
	        var elHeight = $parent.outerHeight();

	        if (inst.opts.backgroundSize === 'cover') {
	          setWidth($video, elWidth, inst.opts.aspectRatio);

	          if ($video.height() <= elHeight) {
	            setHeight($video, elHeight, inst.opts.aspectRatio);
	          }
	        } else if (inst.opts.backgroundSize === 'contain') {
	          setWidth($video, elWidth, inst.opts.aspectRatio);

	          if ($video.height() >= elHeight) {
	            setHeight($video, elHeight, inst.opts.aspectRatio);
	          }
	        } else if (inst.opts.backgroundSize === '100%') {
	          setWidth($video, elWidth, inst.opts.aspectRatio);
	        } else {
	          console.log('Please specify a valid backgroundSize option.');
	        }
	      }).trigger('resize');
	    }
	  }, {
	    key: 'getVideoId',
	    value: function getVideoId() {
	      var index = void 0,
	          id = void 0;
	      var url = this.opts.videoUrl;

	      // Remove trailing slash if one exists.
	      if (url.charAt(url.length - 1) === '/') url.slice(0, -1);

	      // Save the url globally now that we cleaned it up.
	      this.opts.videoUrl = url;

	      if (this.opts.videoType === 'youtube') {
	        index = url.indexOf('v=');
	        if (index > -1) {
	          id = url.slice(index + 2);
	        } else {
	          id = url.slice(url.lastIndexOf('/'));
	        }
	      } else if (this.opts.videoType === 'vimeo') {
	        id = url.slice(url.lastIndexOf('/') + 1);
	      }
	      return id;
	    }
	  }]);

	  return VidKit;
	}();

	exports.default = VidKit;


	function setWidth($el, width, ratio) {
	  $el.width(Math.ceil(width));
	  $el.height(Math.ceil(width / ratio));
	}

	function setHeight($el, height, ratio) {
	  $el.height(Math.ceil(height));
	  $el.width(Math.ceil(height * ratio));
	}

/***/ })
/******/ ]);
//# sourceMappingURL=themekit.js.map