// Generated by CoffeeScript 1.4.0
(function() {
  var __slice = [].slice;

  window.BC.define('bootstrap', function(bootstrap) {
    var button, common, dropdown, mixins;
    mixins = window.BC.namespace("bootstrap.mixins");
    common = window.BC.namespace("common");
    $.extend(this, common);
    button = function(init) {
      return function() {
        var args, click, last;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        last = _.last(args);
        click = function() {
          return false;
        };
        if (_.isFunction(last)) {
          click = function() {
            var args;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            last.apply(null, args);
            return false;
          };
          args = args.slice(0, args.length - 1);
        }
        return $.extend(tag('button', init).apply(null, args).on('click', click), mixins.sizeable('btn'), {
          block: function() {
            return this.addClass("btn-block");
          }
        });
      };
    };
    bootstrap.button = button({
      "class": 'btn'
    });
    bootstrap.button.primary = button({
      "class": 'btn btn-primary'
    });
    bootstrap.button.inverse = button({
      "class": 'btn btn-inverse'
    });
    bootstrap.button.link = button({
      "class": 'btn btn-link'
    });
    bootstrap.button.block = button({
      "class": 'btn btn-block'
    });
    bootstrap.button.info = button({
      "class": 'btn btn-info'
    });
    bootstrap.button.warning = button({
      "class": 'btn btn-warning'
    });
    bootstrap.button.success = button({
      "class": 'btn btn-success'
    });
    bootstrap.button.danger = button({
      "class": 'btn btn-danger'
    });
    bootstrap.button.submit = button({
      "class": 'btn',
      type: 'submit'
    });
    bootstrap.button.group = tag('div', {
      "class": 'btn-group'
    });
    bootstrap.button.group.vertical = tag('div', {
      "class": 'btn-group btn-group-vertical'
    });
    bootstrap.button.toolbar = tag('div', {
      "class": 'btn-toolbar'
    });
    bootstrap.a = function() {
      var args, click, last;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      last = _.last(args);
      click = function() {
        return true;
      };
      if (_.isFunction(last)) {
        click = function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          last.apply(null, args);
          return false;
        };
        args = args.slice(0, args.length - 1);
      }
      return tag('a', {
        href: '#'
      }).apply(null, args).on('click', click);
    };
    dropdown = function() {
      var button, item, items, toLi;
      button = arguments[0], items = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      button.addItems(span({
        "class": 'caret'
      })).addClass('dropdown-toggle').addAttr({
        'data-toggle': "dropdown"
      });
      toLi = function(item) {
        if (item.isDivider) {
          return bootstrap.li({
            "class": 'divider'
          });
        } else {
          return bootstrap.li(item);
        }
      };
      return [
        button, bootstrap.ul({
          "class": "dropdown-menu"
        }, (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = items.length; _i < _len; _i++) {
            item = items[_i];
            _results.push(toLi(item));
          }
          return _results;
        })())
      ];
    };
    bootstrap.dropdown = function() {
      var button, items;
      button = arguments[0], items = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return div({
        "class": "btn-group"
      }, dropdown.apply(null, [button].concat(__slice.call(items))));
    };
    bootstrap.dropdown.segmented = function() {
      var btn, items, toggle;
      btn = arguments[0], items = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      toggle = bootstrap.button().addClass(btn.classes());
      return div({
        "class": "btn-group"
      }, btn, dropdown.apply(null, [toggle].concat(__slice.call(items))));
    };
    return bootstrap.dropdown.divider = function() {
      return {
        isDivider: true
      };
    };
  });

}).call(this);
