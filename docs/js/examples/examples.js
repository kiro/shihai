// Generated by CoffeeScript 1.4.0
(function() {
  var bootstrap, docs, models;

  docs = window.BC.namespace("docs");

  docs.examples = window.BC.namespace("docs.examples");

  bootstrap = window.BC.namespace("bootstrap");

  models = window.BC.namespace("models");

  $.extend(this, bootstrap, models, docs);

  docs.examples.index = function() {
    var content;
    content = model(docs.examples.players());
    return div(div().span3(nav(a("Players", function() {
      return content(docs.examples.players());
    }), a("Email", function() {
      return content(docs.examples.email());
    }), a("Chat", function() {
      return content(docs.examples.chat());
    })).addClass('nav-list bs-docs-sidenav sidenav affix')), div().span9().bindHtml(content));
  };

}).call(this);
