// Generated by CoffeeScript 1.4.0
(function() {
  var common, models, util;

  common = window.BC.namespace("common");

  models = window.BC.namespace("models");

  util = window.BC.namespace("test.util");

  $.extend(this, common, models, util);

  describe("Collection tests", function() {
    var betweenThreeAndFive;
    it("Tests collection", function() {
      var numbers;
      expect(collection([1])()).toEqual([1]);
      expect(collection([1, 2, 3])()).toEqual([1, 2, 3]);
      numbers = collection([1, 2, 3]);
      numbers([4, 5, 6]);
      expect(numbers()).toEqual([4, 5, 6]);
      numbers([7, 8, 9]);
      expect(numbers()).toEqual([7, 8, 9]);
      return expect(collection([1])()).toEqual([1]);
    });
    it("Tests add", function() {
      var numbers, subscriptionCalls, total;
      subscriptionCalls = 0;
      numbers = collection([1, 2]);
      total = 3;
      numbers.subscribe(function(values) {
        var _i, _results;
        subscriptionCalls++;
        return expect(values).toEqual((function() {
          _results = [];
          for (var _i = 1; 1 <= total ? _i <= total : _i >= total; 1 <= total ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this));
      });
      numbers.add(3);
      expect(numbers()).toEqual([1, 2, 3]);
      return expect(subscriptionCalls).toEqual(1);
    });
    it("Tests remove", function() {
      var numbers, subscriptionCalls;
      numbers = collection([1, 2, 2, 3, 3]);
      numbers.remove(3);
      expect(numbers()).toEqual([1, 2, 2]);
      numbers.add(4);
      numbers.add(5);
      numbers.add(6);
      numbers.remove(function(number) {
        return (2 < number && number < 6);
      });
      expect(numbers()).toEqual([1, 2, 2, 6]);
      subscriptionCalls = 0;
      numbers.subscribe(function(values) {
        subscriptionCalls++;
        return expect(values).toEqual([1, 6]);
      });
      numbers.remove(2);
      return expect(subscriptionCalls).toEqual(1);
    });
    it("Tests clear", function() {});
    it("Tests get", function() {
      var numbers;
      numbers = collection([1, 2, 3]);
      numbers.subscribe(function() {
        throw Error("Get shouldn't trigger an update.");
      });
      expect(numbers.get(1)).toEqual(2);
      expect(numbers.get(0)).toEqual(1);
      return expect(numbers.get(function(number) {
        return number > 0 && number < 3;
      })).toEqual([1, 2]);
    });
    it("Tests count", function() {
      var numbers;
      numbers = collection([1, 2, 3, 4]);
      numbers.subscribe(function() {
        throw Error("Get shouldn't trigger an update.");
      });
      expect(numbers.count()).toEqual(4);
      return expect(numbers.count(function(number) {
        return (1 < number && number < 4);
      })).toEqual(2);
    });
    it("Tests replace", function() {
      var expectedValues, numbers, subscriptionCalls;
      subscriptionCalls = 0;
      numbers = collection([1, 2, 2, 3]);
      expectedValues = [1, 4, 4, 3];
      numbers.subscribe(function(values) {
        subscriptionCalls++;
        return expect(values).toEqual(expectedValues);
      });
      numbers.replace(2, 4);
      expect(numbers()).toEqual([1, 4, 4, 3]);
      expect(subscriptionCalls).toEqual(1);
      expectedValues = [1, 2, 2, 3];
      numbers.replace((function(number) {
        return number === 4;
      }), 2);
      expect(numbers()).toEqual([1, 2, 2, 3]);
      return expect(subscriptionCalls).toEqual(2);
    });
    it("Tests filter", function() {
      var expectedValues, numbers, subscriptionCalls;
      subscriptionCalls = 0;
      numbers = collection([1, 2, 3, 4, 5]);
      expectedValues = [1, 2, 3, 4, 5];
      numbers.subscribe(function(values) {
        subscriptionCalls++;
        return expect(values).toEqual(expectedValues);
      });
      expectedValues = [4, 5];
      numbers.filter(function(number) {
        return number > 3;
      });
      expect(numbers.count()).toEqual(2);
      expect(numbers()).toEqual([4, 5]);
      expect(subscriptionCalls).toEqual(1);
      expectedValues = [1, 2, 3, 4, 5];
      numbers.filter(function() {
        return true;
      });
      expect(numbers.count()).toEqual(5);
      expect(numbers()).toEqual([1, 2, 3, 4, 5]);
      expect(subscriptionCalls).toEqual(2);
      expectedValues = [5];
      numbers.filter(5);
      expect(numbers.count()).toEqual(1);
      expect(numbers()).toEqual([5]);
      expect(subscriptionCalls).toEqual(3);
      expectedValues = [];
      numbers.filter(function() {
        return false;
      });
      expect(numbers.count()).toEqual(0);
      expect(numbers()).toEqual([]);
      return expect(subscriptionCalls).toEqual(4);
    });
    betweenThreeAndFive = function(number) {
      return (3 <= number && number <= 5);
    };
    it("Tests filter with add", function() {
      var numbers;
      numbers = collection([1, 2, 3, 4, 5, 6]);
      numbers.filter(betweenThreeAndFive);
      numbers.add(7);
      expect(numbers()).toEqual([3, 4, 5]);
      numbers.add(3);
      return expect(numbers()).toEqual([3, 4, 5, 3]);
    });
    it("Tests filter with replace and replaceAll", function() {
      var numbers;
      numbers = collection([1, 2, 3, 4, 5, 6]);
      numbers.filter(betweenThreeAndFive);
      numbers.replace(3, 7);
      expect(numbers()).toEqual([4, 5]);
      numbers.replace(7, 3);
      return expect(numbers()).toEqual([3, 4, 5]);
    });
    it("Tests filter with remove and removeAll", function() {
      var numbers;
      numbers = collection([1, 2, 3, 4, 5, 6]);
      numbers.filter(betweenThreeAndFive);
      numbers.remove(3);
      expect(numbers()).toEqual([4, 5]);
      numbers.remove(1);
      expect(numbers()).toEqual([4, 5]);
      numbers.clear();
      return expect(numbers()).toEqual([]);
    });
    it("Tests total", function() {
      var numbers;
      numbers = collection([1, 2, 3, 4]);
      numbers.filter(betweenThreeAndFive);
      expect(numbers.total()).toBe(4);
      expect(numbers.count()).toBe(2);
      return expect(numbers.total(betweenThreeAndFive)).toBe(2);
    });
    it("Tests sort", function() {
      var names;
      names = collection(["Java", "Ada", "C++"]);
      names.sort();
      expect(names()).toEqual(["Ada", "C++", "Java"]);
      names.add("Go");
      expect(names()).toEqual(["Ada", "C++", "Go", "Java"]);
      names.filter(function(name) {
        return name !== "Go";
      });
      expect(names()).toEqual(["Ada", "C++", "Java"]);
      names.add("Test");
      expect(names()).toEqual(["Ada", "C++", "Java", "Test"]);
      names.add("ABC");
      return expect(names()).toEqual(["ABC", "Ada", "C++", "Java", "Test"]);
    });
    it("Tests sort on objects", function() {
      var one, player, players, three, two;
      player = function(name, score) {
        return object({
          name: name,
          score: score
        });
      };
      one = player("C++", 5);
      two = player("Java", 10);
      three = player("Javascript", 15);
      players = collection([one, two, three]);
      players.sort(function(player1, player2) {
        if (player1.score < player2.score) {
          return -1;
        } else {
          if (player1.score > player2.score) {
            return 1;
          } else {
            return 0;
          }
        }
      });
      expect(players()).toEqual([one, two, three]);
      one.score = 20;
      expect(players()).toEqual([two, three, one]);
      two.score = 5;
      expect(players()).toEqual([two, three, one]);
      three.score = 1;
      expect(players()).toEqual([three, two, one]);
      one.score = -1;
      return expect(players()).toEqual([one, three, two]);
    });
    it("Tests subscription to models", function() {
      var four, one, player, players, two;
      player = function(name, score) {
        return object({
          name: name,
          score: score
        });
      };
      one = player("one", 1);
      two = player("two", 2);
      four = player("four", 4);
      players = collection([one, two]);
      players.sort(function(player1, player2) {
        if (player1.score < player2.score) {
          return 1;
        } else {
          if (player1.score > player2.score) {
            return -1;
          } else {
            return 0;
          }
        }
      });
      expect(players()).toEqual([two, one]);
      one.score += 2;
      expect(players()).toEqual([one, two]);
      players.add(four);
      expect(players()).toEqual([four, one, two]);
      two.score = 5;
      expect(players()).toEqual([two, four, one]);
      four.score = 10;
      return expect(players()).toEqual([four, two, one]);
    });
    return it("Tests that a collection subscribes to changes in it's underlying models", function() {
      var c, calls;
      c = collection([
        object({
          value: 1
        }), object({
          value: 2
        }), object({
          value: 3
        })
      ]);
      calls = 0;
      c.subscribe(function() {
        return calls++;
      });
      c.get(0).value = 3;
      expect(calls).toBe(1);
      c.get(1).value = 5;
      expect(calls).toBe(2);
      map(c, function() {
        return c.total();
      }).subscribe(function() {
        return calls++;
      });
      c.get(0).value = 5;
      return expect(calls).toBe(3);
    });
  });

}).call(this);
