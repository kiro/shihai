// Generated by CoffeeScript 1.4.0
(function() {

  window.BC.define('rates', function(rates) {
    rates.NO_LIMIT = -1;
    rates.idempotent = function(id) {
      var value;
      if (id == null) {
        id = (function() {
          return 1;
        });
      }
      value = {};
      return {
        set: function(newValue) {
          return value[id(newValue)] = newValue;
        },
        get: function() {
          var result;
          result = _.values(value);
          value = {};
          return result;
        }
      };
    };
    rates.aggregate = function() {
      var value;
      value = [];
      return {
        set: function(newValue) {
          if (!_.isArray(newValue)) {
            newValue = [newValue];
          }
          return value = value.concat(newValue);
        },
        get: function() {
          var result;
          result = value;
          value = [];
          return result;
        }
      };
    };
    return rates.rate = function(action, request_rate, aggregator) {
      var hasTimeout;
      hasTimeout = false;
      return function(item) {
        var handler;
        aggregator.set(item);
        if (request_rate === rates.NO_LIMIT) {
          return action(aggregator.get());
        } else if (!hasTimeout) {
          hasTimeout = true;
          handler = function() {
            action(aggregator.get());
            return hasTimeout = false;
          };
          return window.setTimeout(handler, 1000 / request_rate);
        }
      };
    };
  });

}).call(this);