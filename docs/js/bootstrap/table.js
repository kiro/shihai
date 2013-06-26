// Generated by CoffeeScript 1.6.3
(function() {
  var bootstrap, docs;

  docs = window.BC.namespace("docs");

  docs.bootstrap = window.BC.namespace("docs.bootstrap");

  bootstrap = window.BC.namespace("bootstrap");

  $.extend(this, bootstrap, docs);

  docs.bootstrap.table = function() {
    return section(h1("Tables"), docs.code.table(), example("Table", "Table construction.", function() {
      var i, j;
      return body(table(thead(tr((function() {
        var _i, _results;
        _results = [];
        for (i = _i = 1; _i <= 5; i = ++_i) {
          _results.push(th("Column " + i));
        }
        return _results;
      })())), (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 1; _i <= 5; i = ++_i) {
          _results.push(tr((function() {
            var _j, _results1;
            _results1 = [];
            for (j = _j = 1; _j <= 5; j = ++_j) {
              _results1.push(td(i + "," + j));
            }
            return _results1;
          })()));
        }
        return _results;
      })()));
    }), example("Stripped table", "Builder method for stripped table.", function() {
      var i, j;
      return body(table().stripped(thead(tr((function() {
        var _i, _results;
        _results = [];
        for (i = _i = 1; _i <= 5; i = ++_i) {
          _results.push(th("Column " + i));
        }
        return _results;
      })())), (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 1; _i <= 5; i = ++_i) {
          _results.push(tr((function() {
            var _j, _results1;
            _results1 = [];
            for (j = _j = 1; _j <= 5; j = ++_j) {
              _results1.push(td(i + "," + j));
            }
            return _results1;
          })()));
        }
        return _results;
      })()));
    }), example("Mega table", "Using builder methods for different table classes, each of them can take as a parameter the content of the table.", function() {
      var i, j;
      return body(table().stripped().condensed().hover().bordered(thead(tr((function() {
        var _i, _results;
        _results = [];
        for (i = _i = 1; _i <= 5; i = ++_i) {
          _results.push(th("Column " + i));
        }
        return _results;
      })())), (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 1; _i <= 5; i = ++_i) {
          _results.push(tr((function() {
            var _j, _results1;
            _results1 = [];
            for (j = _j = 1; _j <= 5; j = ++_j) {
              _results1.push(td(i + "," + j));
            }
            return _results1;
          })()));
        }
        return _results;
      })()));
    }), example("Row classes", "Builder methods for table row style, each of them can take the row content.", function() {
      return body(table(tr().info(td(1), td(2)), tr().warning(td(3), td(4)), tr().success(td(5), td(6)), tr().error(td(7), td(8))));
    }));
  };

}).call(this);
