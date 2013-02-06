// Generated by CoffeeScript 1.4.0
(function() {
  var controls;

  controls = window.BC.namespace("controls");

  $.extend(this, controls);

  element(table(tr(td(1), td(2), td(3))));

  describe("Table tests", function() {
    it("", function() {});
    it("5x5 Table", function() {
      var i, j;
      return $('.suite').last().append(element(table(thead(tr((function() {
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
      })())));
    });
    it("Stripped table", function() {
      var i, j;
      return $('.suite').last().append(element(table().stripped().build(thead(tr((function() {
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
      })())));
    });
    it("Mega table", function() {
      var i, j;
      return $('.suite').last().append(element(table().stripped().condensed().hover().bordered().build(thead(tr((function() {
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
      })())));
    });
    return it("Row classes", function() {
      return $('.suite').last().append(element(table(tr().info(td(1), td(2)), tr().warning(td(3), td(4)), tr().success(td(5), td(6)), tr().error(td(7), td(8)))));
    });
  });

}).call(this);