// Generated by CoffeeScript 1.6.3
(function() {
  var bootstrap, docs, models;

  docs = window.BC.namespace("docs");

  docs.api = window.BC.namespace("docs.api");

  bootstrap = window.BC.namespace("bootstrap");

  models = window.BC.namespace("models");

  $.extend(this, bootstrap, models, docs);

  docs.api.model = function() {
    return section(h1("Models"), docs.code.model(), example("model", "Creates a model.\n<p><code>x = model(value)</code> creates a new model.</p>\n<p><code>x()</code> gets the value. </p>\n<p><code>x(newValue)</code> sets a new value </p>\n<p>Models can be bound to properties of the dom elements\nand they will be automatically updated when the value changes.<p>", function() {
      var count, text;
      count = model(0);
      text = map(count, function() {
        return "Total count " + count();
      });
      return body(button.primary("+1", function() {
        return count(count() + 1);
      }), span(text));
    }), example("object", "<p><code>object(obj)</code> - converts a javascript object to a model</p>\n<p>It creates a model for the object itself and for each field recursively.\n   All fields and subfields can be bound to. Arrays are converted to collections.</p>\n<p> <code>obj.field += 1</code> fields can be accessed normally. </p>\n<p> <code>bind(obj.field)</code> returns the model for a field. </p>\n\n<p> If a field or sub field in an object is changed, the change is propagated through all models up to the root object.<p>", function() {
      var location, obj;
      obj = object({
        name: "Kiril Minkov",
        cool: true,
        age: 25,
        locations: ["London", "Cambridge"],
        language: {
          name: "Bulgarian",
          "native": false
        }
      });
      location = model("");
      return body(form({
        "Name": input.text(bind(obj.name)),
        "Cool": input.checkbox(bind(obj.cool)),
        "Age": input.text(bind(obj.age)),
        "Locations": [
          div({
            "class": 'padded'
          }).foreach(obj.locations, function(location) {
            return span(type.label(location).on('click', function() {
              return obj.locations.remove(location);
            }), "&nbsp;");
          }), append(input.text(location).placeholder("Add location..."), button("Add", function() {
            return obj.locations.add(location(""));
          }))
        ],
        "Language": input.text(bind(obj.language.name)),
        "Native": input.checkbox(bind(obj.language["native"]))
      }), pre(code(map(obj, function() {
        return JSON.stringify(obj, null, 4);
      }))));
    }));
  };

}).call(this);
