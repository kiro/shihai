// Generated by CoffeeScript 1.4.0
(function() {
  var app, bootstrap, content, docs, models, site;

  bootstrap = window.BC.namespace("bootstrap");

  docs = window.BC.namespace("docs");

  models = window.BC.namespace("models");

  $.extend(this, bootstrap, models);

  content = model(docs.home.index());

  site = div.container(navbar(div.container(navbar.brand("kiro.js"), nav(a("Home", function() {
    return navigateTo('#/');
  }), a("Api", function() {
    return navigateTo('#/api/');
  }), a("Bootstrap", function() {
    return navigateTo('#/bootstrap/');
  }), a("Examples", function() {
    return navigateTo('#/examples/');
  })))).inverse().fixedTop(), div.row().bindHtml(content));

  app = Sammy('body', function() {
    this.get('#/', function() {
      return content(docs.home.index());
    });
    this.get('#/:first/', function() {
      var first;
      first = this.params['first'];
      return content(docs[first]['index']());
    });
    return this.get('#/:first/:second/', function() {
      var first, second;
      first = this.params['first'];
      second = this.params['second'];
      return content(docs[first].index(docs[first][second]()));
    });
  });

  app.raise_errors = true;

  $(function() {
    return app.run('#/');
  });

  $('body').append(element(site));

}).call(this);
