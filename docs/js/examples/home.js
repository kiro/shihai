// Generated by CoffeeScript 1.6.3
(function() {
  var bootstrap, docs, models;

  docs = window.BC.namespace("docs");

  docs.home = window.BC.namespace("docs.home");

  bootstrap = window.BC.namespace("bootstrap");

  models = window.BC.namespace("models");

  $.extend(this, bootstrap, models, docs);

  docs.home.index = function() {
    return section(docs.code.home(), div({
      "class": 'hero-unit'
    }, h1("Enter kiro.js"), br(), a({
      href: 'bundle.zip',
      "class": 'btn btn-success btn-large'
    }, "Download developer bundle"), br(), div("<iframe src=\"http://ghbtns.com/github-btn.html?user=kiro&repo=shihai&type=watch&count=true&size=large\"\nallowtransparency=\"true\" frameborder=\"0\" scrolling=\"0\" width=\"170\" height=\"30\"></iframe>")), example("Declarative bindings", "Binds models to html and automatically updates it.", function() {
      var text;
      text = model("World");
      return body(input.text(text), h3(map(text, function() {
        return "Hello " + text();
      })));
    }), example("Bootstrap controls", "Api around bootstrap for building beautiful web apps.", function() {
      var text, user;
      user = object({
        firstName: "Big",
        lastName: "Sha"
      });
      text = model("");
      return body(h5("Buttons"), button.primary("Primary", function() {
        return text("Primary");
      }), dropdown(button.info("Info", function() {
        return text("Info, info");
      }), a("Hello", function() {
        return text("Hello");
      }), dropdown.divider(), a("Test", function() {
        return text("Test");
      })), button.group(button.warning("Warning", function() {
        return text("Warning");
      }), button.success("Success", function() {
        return text("Success");
      }), button.danger("Danger", function() {
        return text("Danger");
      })), span(map(text, function() {
        return "I am " + text();
      })), h5("Forms"), form({
        "First name": input.text(bind(user.firstName)),
        "Last name": input.text(bind(user.lastName))
      }), pre(code(map(user, function() {
        return JSON.stringify(user, null, 4);
      }))), h5("Table"), table().bordered().hover().foreach([1, 2], function(row) {
        return tr().foreach([1, 2, 3], function(col) {
          return td(row + ", " + col);
        });
      }), h5("And more..."));
    }), example("Html templating", "Building responsive widgets.", function() {
      var text, textEdit;
      textEdit = function(text) {
        var content, edit, view;
        edit = function() {
          return input.text({
            autofocus: true
          }, text).on('blur', function() {
            return content(view());
          }).on('keydown', function(e) {
            if (e.keyCode === 13) {
              return content(view());
            }
          });
        };
        view = function() {
          return span(text).on('click', function() {
            return content(edit());
          });
        };
        content = model(view());
        return div(content);
      };
      text = model("Click to edit");
      return body(textEdit(text));
    }), example("Todo", "Classic todo app.", function() {
      var done, notDone, remaining, todo, todoText, todos;
      todo = function(text, done) {
        if (done == null) {
          done = false;
        }
        return object({
          text: text,
          done: done
        });
      };
      todos = collection([todo('first todo')]);
      notDone = function(todo) {
        return !todo.done;
      };
      done = function(todo) {
        return todo.done;
      };
      remaining = function() {
        return todos.count(notDone) + " of " + todos.total() + " remaining";
      };
      todoText = model("");
      return body(span(map(todos, remaining)), button.link("archive", function() {
        return todos.remove(done);
      }), ul.unstyled().foreach(todos, function(todo) {
        return li(input.checkbox(bind(todo.done)).label(span(bind(todo.text))));
      }), form.inline(input.text(todoText), button.primary('Add', function() {
        return todos.add(todo(todoText("")));
      })));
    }));
  };

}).call(this);
