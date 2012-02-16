/**
 * jQuery UScollr 
 * by Joel Söderberg <joel@joelsoderberg.se>
 * 
 * Copyright (c) 2012, Joel Söderberg
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIESi
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL 
 * THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, 
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT 
 * OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) 
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR 
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, 
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

(function($) {
  $.fn.pScroller = function(o) {
    if( this.size() === 0)
      return;
    o = o || {};
    var opts = {
      pre : o.pre || 0,
      post : o.post || 0,
      callback : callback || function() {}
    };
    var $elem = this;
    var position = 'unknown';
    $(window).scroll(function() {
      var current_scroll = $(window).scrollTop();
      var max_scroll = $('body').attr('scrollHeight') - $(window).height() - 20;
      var start_at = $elem.offset().top - $(window).height() + $elem.height();
      var stop_at = start_at + $(window).height() - $elem.height();
      start_at -= opts.pre;
      stop_at += opts.post;
      if(stop_at > max_scroll)
        stop_at = max_scroll;        
      var new_position = '';
      if(current_scroll < start_at)
        new_position = 'above';
      else if(current_scroll > stop_at)
        new_position = 'below';
      else
        new_position = 'visible';
      if(new_position !== position || new_position === 'visible') {
        position = new_position;
        if(position === 'visible') {
          var weighted = (current_scroll - start_at) / (stop_at - start_at);
          opts.callback($elem, weighted, opts);
        }
        if(position === 'above')
          opts.callback($elem, 0, opts);
        else if(position === 'below')
          opts.callback($elem, 1, o);        
      }
    });
  };
})(jQuery);

