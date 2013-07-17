/*

Project: turnup.js
Description: TurnUp: a CSS3 transitioning flashing text plugin
Author: @amaliaviti (amaliaviti.com)
License: MIT

*/

;(function($){
	"use strict";

	var TurnUp = function(elem, options){
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.process = null;

		this.init();
	};

	TurnUp.prototype = {
		defaults: {
			list: ['one', 'two', 'three', 'four'],
			transition: 'all 250ms ease',
			interval: 450
		},
		init: function(){
			
			this.config = $.extend({}, this.defaults, this.options);
			this.start();

			return this;
		},
		start: function(){
			var el = this.elem,
				$el = this.$elem,
				config = this.config,
				list = this.config.list,
				transition = this._getTransformProperty(el);

			// set transition CSS param
			$el.css(transition, config.transition);

			var time = this.convertMillisecond($el.css(transition + 'Duration'));

			this.process = setInterval(function(){

				$el.css('opacity', '0');

				setTimeout(function(){
					$el.text(list[Math.floor(Math.random()* list.length)]);
					$el.css('opacity', '1');
				}, time*2);	

			}, time*4 + config.interval);
		},
		stop: function(){
			clearInterval(this.process);
		},
		// grabs string such as 1s or 1000ms and outputs number in milliseconds
		// based on https://github.com/guille/ms.js
		convertMillisecond: function(a){
			var units = {
				'ms': 1,
				's': 1000
			};

			var ok = /^((?:\d+)?\.?\d+)\s*(ms|s)?$/i;

			if(typeof a == 'string'){
				var match = ok.exec(a);
				return match ? parseFloat(match[1]) * units[match[2] || 'ms'] : a;
			} else {
				return a;
			}
		},
		// returns correct browser-supported transform property
		// seen here: http://stackoverflow.com/questions/9607147/how-do-i-get-the-webkit-transition-duration-property-with-jquery
		_getTransformProperty: function(element){
			var properties = [
				'transition',
				'WebkitTransition',
				'msTransition',
				'MozTransition',
				'OTransition'
			];
			var p;
			while ((p = properties.shift()) !== null) {
				if(typeof element.style[p] != 'undefined') {
					return p;
				}
			}
			return false;
		}
	};

	TurnUp.defaults = TurnUp.prototype.defaults;

	$.fn.turnup = function(options){
		
		var args = arguments;
		if(options === undefined || typeof options == 'object'){
			return this.each(function(){

				if(!$.data(this, 'plugin_turnup')){
					$.data(this, 'plugin_turnup', new TurnUp(this, options));
				}

			});
		} else if(typeof options === 'string' && options[0] !== '_' && options !== 'init'){
			return this.each(function(){

				var instance = $.data(this, 'plugin_turnup');
				
				if(instance instanceof TurnUp && typeof instance[options] === 'function') {
					instance[options].apply(instance, Array.prototype.slice.call(args, 1));
				}

			});
		}

		if (options === 'destroy') {
			$.data(this, 'plugin_turnup', null);
		}

	};

})(jQuery);