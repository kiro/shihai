// Generated by CoffeeScript 1.4.0
(function() {
  var common, ns,
    __slice = [].slice;

  ns = window.BC.namespace("mixins");

  common = window.BC.namespace("common");

  ns.control = function() {
    return {
      classes: "",
      addClass: function(className) {
        this.classes += className + " ";
        return this;
      }
    };
  };

  ns.composite = function(build) {
    return {
      build: function() {
        var items;
        items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return build(this.classes, items);
      }
    };
  };

  ns.spannable = function() {
    var span;
    span = function(size) {
      return function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        this.addClass("span" + size);
        if (args.length !== 0) {
          return this.build.apply(this, args);
        } else {
          return this;
        }
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

  ns.offsetable = function() {
    var offset;
    offset = function(size) {
      return function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        this.addClass("offset" + size);
        if (args.length !== 0) {
          return this.build.apply(this, args);
        } else {
          return this;
        }
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

  ns.contextual = function(prefix) {
    return {
      context: function() {
        var args, suffix;
        suffix = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        if (prefix) {
          prefix = prefix + "-";
        }
        this.addClass(prefix + suffix);
        if (args.length !== 0) {
          return this.build.apply(this, args);
        }
      },
      info: function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return this.context('info', args);
      },
      warning: function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return this.context('warning', args);
      },
      error: function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return this.context('error', args);
      },
      success: function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return this.context('success', args);
      }
    };
  };

  ns.textContextual = function() {
    return $.extend(ns.contextual('text'), {
      muted: function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        this.addClass("muted");
        if (args.length !== 0) {
          return this.build.apply(this, args);
        }
      }
    });
  };

}).call(this);