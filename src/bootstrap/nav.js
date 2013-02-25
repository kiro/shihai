// Generated by CoffeeScript 1.4.0
(function() {
  var activate, bootstrap, common, mixins,
    __slice = [].slice;

  bootstrap = window.BC.namespace("bootstrap");

  mixins = window.BC.namespace("bootstrap.mixins");

  common = window.BC.namespace("common");

  $.extend(this, common, bootstrap);

  activate = function(el) {
    console.log("test");
    $(el).parent('li').removeClass('active');
    return $(el).addClass('active');
  };

  bootstrap.nav = function() {
    var item, items;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    items = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        _results.push(li(item));
      }
      return _results;
    })();
    items[0].addClass('active');
    return ul().foreach(items, function(item) {
      return item.on('click', function() {
        return activate(this);
      });
    }).addClass('nav');
  };

  bootstrap.tabs = function() {
    var active, content, id, links, tabList, tabs;
    tabs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    id = nextId();
    active = once("active");
    links = _.map(tabs, function(tab, index) {
      return a({
        id: id + "_" + index,
        'data-toggle': 'tab'
      }, tab.name).on('click', tab.click);
    });
    tabList = bootstrap.nav.apply(bootstrap, links).addClass('nav-tabs');
    active = once("active");
    content = div({
      "class": 'tab-content'
    }).foreach(tabs, function(tab, index) {
      return div({
        id: id + "_" + index,
        "class": 'tab-pane'
      }, tab.content).addClass(active());
    });
    return $.extend(div({
      "class": 'tabbable'
    }, tabList, content), {
      left: function() {
        return this.addClass('tabs-left');
      },
      right: function() {
        return this.addClass('tabs-right');
      },
      below: function() {
        return this.addClass('tabs-below');
      },
      stacked: function() {
        return tabList.addClass('nav-stacked');
      }
    });
  };

  bootstrap.tab = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (_.isObject(args[0]) && args.length === 1) {
      return args[0];
    }
    return {
      name: args[0],
      content: _.rest(args)
    };
  };

  bootstrap.pills = function() {
    var items;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return bootstrap.nav.apply(bootstrap, items).addClass('nav-pills');
  };

  bootstrap.pills.stacked = function() {
    var items;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return bootstrap.nav.apply(bootstrap, items).addClass('nav-pills nav-stacked');
  };

  bootstrap.pill = function(name, click) {
    return li(a(name)).on('click', click);
  };

  bootstrap.navbar = function() {
    var items;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return $.extend(div({
      "class": 'navbar'
    }, div({
      "class": 'navbar-inner'
    }, items)), {
      fixedTop: function() {
        return this.addClass('navbar-fixed-top');
      },
      fixedBottom: function() {
        return this.addClass('navbar-fixed-bottom');
      },
      staticTop: function() {
        return this.addClass('navbar-static-top');
      },
      inverse: function() {
        return this.addClass('navbar-inverse');
      }
    });
  };

  bootstrap.navbar.brand = function() {
    var items;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return a.apply(null, [{
      "class": 'brand'
    }].concat(__slice.call(items)));
  };

  bootstrap.navbar.divider = function() {
    return li({
      "class": 'divider-vertical'
    });
  };

  bootstrap.navbar.form = function() {
    var items;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return form.inline.apply(form, items).addClass('navbar-form');
  };

  bootstrap.navbar.search = function() {
    var items;
    items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return form.inline.apply(form, items).addClass('navbar-search');
  };

}).call(this);