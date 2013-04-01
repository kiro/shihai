// Generated by CoffeeScript 1.4.0
(function() {

  window.BC.define('models', function(models) {
    var COLLECTION_CHANGE, assertArray, common;
    common = window.BC.namespace("common");
    COLLECTION_CHANGE = "collection.change";
    assertArray = function(arr) {
      if (!_.isArray(arr)) {
        throw Error(arr + " is expected to be an array");
      }
    };
    return models.collection = function(initial) {
      var all, allItems, callUpdate, collection, compareFunction, defaultCompare, filter, items, o, toPredicate, update;
      if (initial == null) {
        initial = [];
      }
      assertArray(initial);
      allItems = initial;
      items = allItems;
      compareFunction = void 0;
      o = common.observable();
      all = function() {
        return true;
      };
      filter = all;
      collection = function(arg) {
        if (_.isUndefined(arg)) {
          return items;
        } else {
          assertArray(arg);
          allItems = arg;
          return update();
        }
      };
      callUpdate = function(item, path) {
        return update(path);
      };
      update = function(path) {
        var item, _i, _len;
        if (path == null) {
          path = COLLECTION_CHANGE;
        }
        if (compareFunction) {
          allItems.sort(compareFunction);
          path = COLLECTION_CHANGE;
        }
        items = _.filter(allItems, filter);
        if (filter !== all) {
          path = COLLECTION_CHANGE;
        }
        for (_i = 0, _len = allItems.length; _i < _len; _i++) {
          item = allItems[_i];
          if (common.isModel(item)) {
            item.subscribe(callUpdate);
          }
        }
        return o.publish(items, path);
      };
      toPredicate = function(arg) {
        if (_.isFunction(arg)) {
          return arg;
        } else {
          return function(item) {
            return item === arg;
          };
        }
      };
      collection.add = function(arg) {
        allItems.push(arg);
        return update();
      };
      collection.addAll = function(items) {
        assertArray(items);
        allItems = allItems.concat(items);
        return update();
      };
      collection.remove = function(arg) {
        var predicate;
        predicate = toPredicate(arg);
        allItems = _.filter(allItems, function(item) {
          return !predicate(item);
        });
        return update();
      };
      collection.removeAll = function() {
        allItems = [];
        return update();
      };
      collection.filter = function(arg) {
        filter = toPredicate(arg);
        return update();
      };
      collection.count = function(arg) {
        if (_.isUndefined(arg)) {
          return items.length;
        } else if (_.isFunction(arg)) {
          return _.reduce(items, (function(memo, item) {
            if (arg(item)) {
              return 1 + memo;
            } else {
              return memo;
            }
          }), 0);
        } else {
          throw Error(arg + " is expected to be function or undefined");
        }
      };
      collection.total = function(arg) {
        if (_.isUndefined(arg)) {
          return allItems.length;
        } else if (_.isFunction(arg)) {
          return _.reduce(allItems, (function(memo, item) {
            if (arg(item)) {
              return 1 + memo;
            } else {
              return memo;
            }
          }), 0);
        } else {
          throw Error(arg + " is expected to be function or undefined");
        }
      };
      collection.replace = function(oldValue, newValue) {
        var i, predicate, _i, _ref;
        predicate = toPredicate(oldValue);
        for (i = _i = 0, _ref = allItems.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          if (predicate(allItems[i])) {
            allItems[i] = newValue;
          }
        }
        return update();
      };
      collection.replaceAll = function(items) {
        assertArray(items);
        allItems = items;
        return update();
      };
      collection.get = function(arg) {
        if (_.isFunction(arg)) {
          return _.filter(items, arg);
        } else {
          return items[arg];
        }
      };
      defaultCompare = function(a, b) {
        if (a > b) {
          return 1;
        } else if (a < b) {
          return -1;
        } else {
          return 0;
        }
      };
      collection.sort = function(f) {
        if (f == null) {
          f = defaultCompare;
        }
        compareFunction = f;
        return update();
      };
      collection.subscribe = function(listener) {
        o.subscribe(listener);
        return this;
      };
      collection._get = function() {
        return items;
      };
      collection._set = function(arg) {
        assertArray(arg);
        allItems = arg;
        return update();
      };
      return collection;
    };
  });

}).call(this);
