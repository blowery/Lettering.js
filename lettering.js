/*!	
* Lettering.JS 0.6 
*
* Copyright 2010, Dave Rupert http://daverupert.com
* Released under the WTFPL license 
* http://sam.zoy.org/wtfpl/
*
* Thanks to Paul Irish - http://paulirish.com - for the feedback.
*
* Date: Mon Sep 13 11:54:00 2010 -0600
*/

dojo.provide("lettering");
dojo.require("dojo.NodeList-manipulate");
dojo.require("dojo.NodeList-traverse");

dojo.ready(function(){
	var d = dojo, $ = d.query;
	var methods = {
		init : function() {

			return this.forEach(function(n) {
				return injector($(n), '', 'char', '');
			});

		},

		words : function() {

			return this.forEach(function(n) {
				return injector($(n), ' ', 'word', ' ');
			});

		},
		
		lines : function() {

			return this.forEach(function(n) {
				var t = $(n), r = "eefec303079ad17405c889e092e105b0";
				// Because it's hard to split a <br/> tag consistently across browsers,
				// (*ahem* IE *ahem*), we replaces all <br/> instances with an md5 hash 
				// (of the word "split").  If you're trying to use this plugin on that 
				// md5 hash string, it will fail because you're being ridiculous.
				t.children("br").replaceWith(r);
				return injector(t, r, 'line', '');
			});

		}
	};

	function injector(t, splitter, klass, after) {
		var a = t.text().split(splitter), inject = '';
		if(a.length > 0) {
			d.forEach(a, function(item, i) {
				inject += '<span class="'+klass+(i+1)+'">'+item+'</span>'+after;
			});	
			t.empty();
			t.append(inject);
		}
	}


  d.NodeList.prototype.lettering = function(method) {
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( method == 'letters' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			throw new Error( 'Method ' +  method + ' does not exist on lettering' );
		}
	};

});