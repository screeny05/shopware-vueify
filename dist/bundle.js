(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("$.PluginBase"), require("Vue"), require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define(["$.PluginBase", "Vue", "jQuery"], factory);
	else if(typeof exports === 'object')
		exports["vueify"] = factory(require("$.PluginBase"), require("Vue"), require("jQuery"));
	else
		root["vueify"] = factory(root["$.PluginBase"], root["Vue"], root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _pluginBase = __webpack_require__(1);
	
	var _pluginBase2 = _interopRequireDefault(_pluginBase);
	
	var _vue = __webpack_require__(2);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _jquery = __webpack_require__(3);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	if (typeof _pluginBase2.default === 'undefined' || typeof _vue2.default === 'undefined' || typeof _jquery2.default === 'undefined') {
	    throw new Error('Unmet dependencies. shopware-vueify needs Vue, jQuery and $.PluginBase globally available.');
	}
	
	exports.default = function (component) {
	    return {
	        Component: _vue2.default.extend(component),
	
	        opts: function () {
	            var opts = {};
	
	            // add empty default options
	            // (vue handles prop-defaults & -validation by itself)
	            if (_typeof(component.props) === 'object') {
	                Object.keys(component.props).forEach(function (p) {
	                    opts[p] = null;
	                });
	            }
	
	            return opts;
	        }(),
	
	        init: function init() {
	            // prepare props data
	            this.applyDataAttributes();
	
	            this.$children = this.$el.children().detach();
	
	            this.$mountPoint = (0, _jquery2.default)('<div>').append(this.$children).appendTo(this.$el);
	
	            // enable $.override()
	            var BoundComponent = this.Component.extend(this);
	
	            this.vm = new BoundComponent({
	                propsData: this.opts,
	                name: this.getName(),
	                $plugin: this });
	
	            // pseudo-parent
	            this.vm.supercomponent = component;
	
	            // replace mount point with component
	            this.vm.$mount(this.$mountPoint.get(0));
	        },
	        _destroy: function _destroy() {
	            // trick the base into thinking the wrapper is our element
	            _pluginBase2.default.prototype._destroy.call(this);
	
	            // destroy vm instance
	            this.vm.$destroy();
	
	            // remove vue element from dom and re-add original children
	            this.$el.empty().append(this.$children);
	        }
	    };
	};
	
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = $.PluginBase;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=bundle.js.map