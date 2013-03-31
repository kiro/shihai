// Generated by CoffeeScript 1.4.0
(function() {
  var bootstrap, docs, models;

  docs = window.BC.namespace("docs");

  docs.examples = window.BC.namespace("docs.examples");

  bootstrap = window.BC.namespace("bootstrap");

  models = window.BC.namespace("models");

  $.extend(this, bootstrap, models, docs);

  docs.examples.todomvc = function() {
    return section(h1("Todo MVC"), docs.code.todomvc(), example("TodoMVC app", "", function() {
      var all, done, footer, header, notDone, selectAll, todo, todoList, todoText, todos;
      todo = function(text, done) {
        if (done == null) {
          done = false;
        }
        return {
          text: model(text),
          done: model(done)
        };
      };
      todos = collection([todo('first todo')]);
      todoText = model("");
      selectAll = model(false);
      header = form.inline(input.checkbox(selectAll).on('click', function() {
        var todoItem, _i, _len, _ref, _results;
        _ref = todos();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          todoItem = _ref[_i];
          _results.push(todoItem.done(selectAll()));
        }
        return _results;
      }), input.text(todoText), button('Add', function() {
        return todos.add(todo(todoText("")));
      }));
      todoList = table().foreach(todos, function(todo) {
        return tr(td(input.checkbox(todo.done)), td(todo.text()), td(button("Remove", function() {
          return todos.remove(todo);
        })));
      });
      notDone = function(todo) {
        return !todo.done();
      };
      done = function(todo) {
        return todo.done();
      };
      all = function() {
        return true;
      };
      footer = div.row.fluid(div().span3(span().bindText(todos, function() {
        return todos.count(notDone) + " of " + todos.count();
      })), div().span6(button.link('All', function() {
        return todos.filter(all);
      }), button.link('Done', function() {
        return todos.filter(done);
      }), button.link('Left', function() {
        return todos.filter(notDone);
      })), div().span3(a('Remove all', function() {
        return todos.removeAll();
      })));
      return body(div.container(div().span6(header, todoList, footer)));
    }));
  };

}).call(this);
