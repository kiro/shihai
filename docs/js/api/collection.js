// Generated by CoffeeScript 1.4.0
(function() {
  var bootstrap, docs, models, showCollection;

  docs = window.BC.namespace("docs");

  bootstrap = window.BC.namespace("bootstrap");

  models = window.BC.namespace("models");

  $.extend(this, bootstrap, models, docs);

  showCollection = function() {};

  docs.collectionApi = function() {
    return section(h1("Collection"), example(".add", "<p><code>.add(value)</code> <code>.add(1)</code>Appends an item to the collection. </p>\n<p><code>.add(values)</code> <code>.add(1, 2, 3)</code>Appends a comma separated list of items. </p>\n<p><code>.add(array)</code> <code>.add([1, 2, 3])</code>Appends items in the array. </p>", function() {
      var numbers, value;
      numbers = collection([1, 2, 3]);
      value = model("");
      showCollection = function(collection) {
        return div({
          "class": 'circles'
        }).foreach(collection, function(item) {
          return div({
            "class": 'circle'
          }, item).on('click', function() {
            return collection.remove(item);
          });
        });
      };
      return body(showCollection(numbers), form.inline(input.text().bindValue(value), button.success('Add', function() {
        return numbers.add(value(""));
      })));
    }), example(".remove", "<p><code>.remove(value)</code> removes items that have the same value.</p>\n<p><code>.remove(predicate)</code> remove all items for which the predicate function returns true.</p>", function() {
      var biggerThan, limit, numbers;
      numbers = collection([1, 2, 3, 4, 5, 6]);
      limit = model(3);
      biggerThan = function(number) {
        return number > limit();
      };
      return body(form.inline(button.danger("Remove", function() {
        return numbers.remove(biggerThan);
      }), " bigger than ", input.text().bindValue(limit)), "or click on a number to remove it", showCollection(numbers));
    }), example(".removeAll", "Removes all numbers from a collection.", function() {
      var numbers;
      numbers = collection([1, 2, 3, 4]);
      return body(showCollection(numbers), button.danger("Remove all", function() {
        return numbers.removeAll();
      }));
    }), example(".filter", "Filters items from the collection. The filtered items are not removed and\nonce a new filter is set it's applied on all the initial items.\n\n<p><code>.filter(predicate)</code> filters all items for which predicate returns false </p>", function() {
      var biggerThan, limit, numbers;
      numbers = collection([1, 2, 3, 4, 5, 6]);
      limit = model(3);
      biggerThan = function(number) {
        return number > limit();
      };
      return body(showCollection(numbers), form.inline(button.danger("Filter", function() {
        return numbers.filter(biggerThan);
      }), " bigger than ", input.text().span1().bindValue(limit)));
    }), example(".count", "Counts the current number of items in a collection. If there is a filter it counts only the\nitems that match it.\n\n<p><code>.count()</code> Returns the number of the current items in the collection.</p>\n<p><code>.count(predicate)</code> Returns the number of the current items in the collection that match the predicate</p>", function() {
      var numbers;
      numbers = collection([1, 2, 3, 4, 5, 6]);
      numbers.filter(function(number) {
        return number > 2;
      });
      return body("Click on a number to remove it", showCollection(numbers), span().bindText(numbers, function() {
        return 'Count ' + numbers.count();
      }), span().bindText(numbers, function() {
        return 'Even ' + numbers.count(function(number) {
          return number % 2 === 0;
        });
      }));
    }), example(".total", "Counts all the items in a collection, including the filtered.\n\n<p><code>.total()</code> Returns the number of items in the collection.</p>\n<p><code>.total(predicate)</code> Returns the number of items in the collection that match the predicate</p>", function() {
      var even, numbers;
      numbers = collection([1, 2, 3, 4, 5, 6]);
      numbers.filter(function(number) {
        return number > 2;
      });
      even = function(number) {
        return number % 2 === 0;
      };
      return body("Click on a number to remove it", showCollection(numbers), p().bindText(numbers, function() {
        return "Showing " + (numbers.count()) + " of " + (numbers.total());
      }), p().bindText(numbers, function() {
        return 'Even ' + numbers.total(even);
      }));
    }), example(".replace", "Replaces an item in the collection", function() {
      var from, numbers, to;
      numbers = collection([1, 2, 3, 4, 5, 6]);
      from = model("");
      to = model("");
      return body(showCollection(numbers), form.inline(button.warning("Replace", function() {
        return numbers.replace(parseInt(from()), parseInt(to()));
      }), input.text().span1().bindValue(from), " with ", input.text().span1().bindValue(to)));
    }), example(".replaceAll", "Replaces all items in the collection.", function() {
      var numbers;
      numbers = collection([1, 2, 3, 4, 5]);
      return body(showCollection(numbers), button.danger("Replace all", function() {
        return numbers.replaceAll([7, 8, 9]);
      }));
    }), example(".get", "Gets an item matching a predicate", function() {
      var byId, user, users;
      user = function(id, name) {
        return {
          id: id,
          name: name
        };
      };
      users = collection(user(1, "Bai Mangau"), user(2, "Test user"), user(3, "Mente"));
      byId = function(id) {
        return function(user) {
          return user.id.toString() === id.toString();
        };
      };
      return body(p("User 1 : ", users.get(byId(1))[0].name), p("User 2 : ", users.get(byId(2))[0].name));
    }), example(".subscribe", "Subscribes to changes in the collection, useful for building custom controls", function() {
      var numbers, text;
      numbers = collection(1, 2, 3, 4, 5, 6);
      text = model("Total length " + numbers.count());
      numbers.subscribe(function(items) {
        return text("Total length " + items.length);
      });
      return body("Click on a number to remove it", showCollection(numbers), span().bindText(text));
    }), docs.code.collection());
  };

}).call(this);
