// Generated by CoffeeScript 1.4.0
(function() {
  var util,
    __slice = [].slice;

  util = window.BC.namespace("test.util");

  util.show = function() {
    var items;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return $('.suite').last().append(element(div({
      "class": "bs-docs-example"
    }, items)));
  };

}).call(this);
