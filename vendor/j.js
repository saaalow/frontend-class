!function(window) {
  var J = window.J = function(something) {
    var el;
    if(typeof something === 'string') {
      el = document.querySelector(something);
    } else {
      el = something;
    }
    return new JNode(el);
  };

  var JNode = function(el) {
    this._el = el;
    this._originalDisplay = null;
  };

  J.fn = JNode.prototype = {
    constructor: JNode,

    style: function(key, val) {
      if(typeof val === 'undefined') {
        if(this._needsReflow) this.reflow();
        return window.getComputedStyle(this._el, null).getPropertyValue(key);
      }
      this._el.style[key] = val;
      return this;
    },
    width: function(val) {
      return this.style('width', val);
    },
    height: function(val) {
      return this.style('height', val);
    },
    reflow: function() {
      this._el.offsetWidth;
      return this;
    },
    html: function(val) {
      if(typeof val === 'undefined') return this.innerHTML;
      this._el.innerHTML = val;
      return this;
    },
    append: function(val) {
      this._el.innerHTML += val;
      return this;
    },
    prepend: function(val) {
      this._el.innerHTML = val + this._el.innerHTML;
      return this;
    },
    remove: function() {
      this._el.parentNode.removeChild(this._el);
    },
    hide: function() {
      this._originalDisplay = this.style('display');
      this.style('display', 'none');
      return this;
    },
    show: function() {
      var type = this._originalDisplay || 'block';
      this.style('display', type);
      return this;
    },
    updateStyle: function(key) {
      var computedStyle,
          currentStyle = this.style(key);

      this.hide();
      this.reflow();
      this.style(key, '');
      this.show();
      computedStyle = this.style(key);
      this.hide();
      this.reflow();
      this.style(key, currentStyle);
      this.show();
      this.reflow();
      this.style(key, computedStyle);
      return this;
    },
    on: function(evt, handler) {
      evt = vendoredEvent(evt);
      if(!evt) {
        setTimeout(function() {
          handler.call(this._el, {});
        }, 0);
        return this;
      }
      this._el.addEventListener(vendoredEvent(evt), handler, false);
      return this;
    },
    off: function(evt, handler) {
      evt = vendoredEvent(evt);
      if(!evt) return this;
      this._el.removeEventListener(vendoredEvent(evt), handler, false);
      return this;
    },
    once: function(evt, handler) {
      var ref = this;
      var wrapped = function() {
        handler.apply(this, arguments);
        ref.off(evt, wrapped);
      };
      return ref.on(evt, wrapped);
    }
  };

  var vendoredEvent = (function() {
    var events = {
      transitionend: {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        MsTransition: 'MSTransitionEnd',
        OTransition: 'oTransitionEnd',
        transition: 'transitionend'
      }
    };

    return function(evt) {
      var prop, curr, undef,
          body = document.body;
      if(events.hasOwnProperty(evt)) {
        curr = events[evt];
        for(prop in curr) {
          if(curr.hasOwnProperty(prop)) {
            if(body.style[prop] !== undef) return curr[prop];
          }
        }
        return null;
      }
      return evt;
    };
  })();

}(window);
