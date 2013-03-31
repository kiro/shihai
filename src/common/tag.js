// Generated by CoffeeScript 1.4.0
(function() {
  var __slice = [].slice;

  window.BC.define('common', function(common) {
    return common.tag = function(name, initialAttr) {
      if (initialAttr == null) {
        initialAttr = {};
      }
      return function() {
        var attr, bindings, index, item, items, map, result, _i, _j, _len, _len1;
        items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        attr = common.attributes(_.clone(initialAttr));
        if (items.length > 0 && attr.isAttributes(items[0])) {
          attr.merge(items[0]);
          items = _.rest(items);
        }
        index = 0;
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          index++;
          if (!isValid(item)) {
            throw Error("Item " + item + " at position " + index + " is expected to be String, Number, Array, undefined" + " or have .html() function");
          }
        }
        bindings = common.bindings(_.clone(items));
        result = $.extend(bindings, {
          id: function() {
            return attr.get('id');
          },
          html: function() {
            return _.template("<" + name + " <%=attr%>><% _.each(items, function(item) { %><%=toHtml(item)%><% }) %></" + name + ">", {
              items: items,
              toHtml: common.toHtml,
              attr: attr.render()
            });
          },
          init: function(context) {
            var el, id;
            common.init(items, context);
            id = this.id();
            if (id && context.attr('id') === id.toString()) {
              el = context;
            } else {
              if (id) {
                el = context.find('#' + id).first();
              }
            }
            return bindings.initBindings(el);
          },
          addClass: function(name) {
            if (name) {
              attr.merge({
                "class": name
              });
            }
            return this;
          },
          addItems: function() {
            var newItems;
            newItems = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            items = items.concat(newItems);
            return this;
          },
          addClassAndItems: function() {
            var items, name;
            name = arguments[0], items = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            this.addClass(name);
            return this.addItems.apply(this, items);
          },
          addAttr: function(value) {
            attr.merge(value);
            return this;
          },
          observable: function() {
            $.extend(this, common.observable());
            return this;
          },
          classes: function() {
            return attr.get('class');
          }
        });
        map = function(observable, map) {
          var value;
          if (map == null) {
            map = function(x) {
              return x;
            };
          }
          value = map(observable._get());
          return {
            _get: function() {
              return value;
            },
            _set: function(newValue) {
              throw Error("_set is not supported for mapped values");
            },
            subscribe: function(callback) {
              return observable.subscribe(function(baseValue) {
                value = map(baseValue);
                return callback(value);
              });
            }
          };
        };
        if (items.length === 1 && common.isModel(items[0])) {
          result.bindHtml(items[0]);
        } else {
          for (_j = 0, _len1 = items.length; _j < _len1; _j++) {
            item = items[_j];
            if (common.isModel(item)) {
              throw Error(items + " should have only one model");
            }
          }
        }
        return result;
      };
    };
  });

}).call(this);
