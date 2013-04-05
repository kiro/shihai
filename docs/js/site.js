// Generated by CoffeeScript 1.4.0
(function() {
  var app, bootstrap, content, docs, models, site;

  bootstrap = window.BC.namespace("bootstrap");

  docs = window.BC.namespace("docs");

  models = window.BC.namespace("models");

  $.extend(this, bootstrap, models);

  content = model(docs.home());

  site = div.container(navbar(div.container(navbar.brand("kiro.js"), nav(a("Home", function() {
    return content(docs.home());
  }), a("Api", function() {
    return content(docs.api.index());
  }), a("Bootstrap", function() {
    return content(docs.bootstrap.index());
  }), a("Examples", function() {
    return content(docs.examples.index());
  })))).inverse().fixedTop(), div.row().bindHtml(content));

  $('body').append(element(site));

  app = Sammy('body', function() {
    this.get('#/:first', function() {});
    return this.get('#/:first/:second', function() {});
  });

  app.run('/#');

}).call(this);
