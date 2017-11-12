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

	__webpack_require__(3);

	__webpack_require__(5);

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports) {

	module.exports = jQuery;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _svgInjector = __webpack_require__(4);

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
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _jquery = __webpack_require__(6);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var $ = jQuery;

	var vidLoaded = false;
	var $vidWrapper = $(".paragraph--type--compound-banner .video-container");
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
	  if (window.matchMedia("(min-width: 640px)").matches) {
	    vidLoaded = true;
	    var bgVideo = new _jquery2.default($vidWrapper, opts);
	  }
	});

	$(window).on('resize', function () {
	  if (!vidLoaded && window.matchMedia("(min-width: 639px)").matches) {
	    vidLoaded = true;
	    var bgVideo = new _jquery2.default($vidWrapper, opts);
	  }
	});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var $ = jQuery;

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
	        $vidKit.attr('tabindex', '-1');
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