// Generated by CoffeeScript 1.6.3
(function() {
  var __slice = [].slice;

  window.BC.define('bootstrap.mixins', function(mixins) {
    mixins.spannable = function() {
      var span;
      span = function(size) {
        return function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return this.addClassAndItems.apply(this, ['span' + size].concat(__slice.call(args)));
        };
      };
      return {
        span1: span(1),
        span2: span(2),
        span3: span(3),
        span4: span(4),
        span5: span(5),
        span6: span(6),
        span7: span(7),
        span8: span(8),
        span9: span(9),
        span10: span(10),
        span11: span(11),
        span12: span(12)
      };
    };
    mixins.offsetable = function() {
      var offset;
      offset = function(size) {
        return function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return this.addClassAndItems.apply(this, ["offset" + size].concat(__slice.call(args)));
        };
      };
      return {
        offset1: offset(1),
        offset2: offset(2),
        offset3: offset(3),
        offset4: offset(4),
        offset5: offset(5),
        offset6: offset(6),
        offset7: offset(7),
        offset8: offset(8),
        offset9: offset(9),
        offset10: offset(10),
        offset11: offset(11),
        offset12: offset(12)
      };
    };
    mixins.contextual = function(prefix) {
      var context;
      context = function(suffix) {
        return function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (prefix) {
            prefix = prefix + "-";
          }
          return this.addClassAndItems.apply(this, [prefix + suffix].concat(__slice.call(args)));
        };
      };
      return {
        info: context('info'),
        warning: context('warning'),
        error: context('error'),
        success: context('success'),
        inverse: context('inverse')
      };
    };
    mixins.textContextual = function() {
      return $.extend(mixins.contextual('text'), {
        muted: function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return this.addClassAndItems("muted", args);
        }
      });
    };
    return mixins.sizeable = function(prefix) {
      var size;
      size = function(suffix) {
        return function() {
          if (prefix) {
            prefix = prefix + "-";
          }
          return this.addClass(prefix + suffix);
        };
      };
      return {
        mini: size("mini"),
        small: size("small"),
        medium: size("medium"),
        large: size("large"),
        xlarge: size("xlarge"),
        xxlarge: size("xxlarge")
      };
    };
  });

}).call(this);
