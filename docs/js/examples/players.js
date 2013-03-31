// Generated by CoffeeScript 1.4.0
(function() {
  var bootstrap, docs, models;

  docs = window.BC.namespace("docs");

  docs.examples = window.BC.namespace("docs.examples");

  bootstrap = window.BC.namespace("bootstrap");

  models = window.BC.namespace("models");

  $.extend(this, bootstrap, models, docs);

  docs.examples.players = function() {
    return section(h1("Players"), docs.code.players(), example("Players app", "", function() {
      var player, players, selected;
      player = function(name, score) {
        return object({
          name: name,
          score: score
        });
      };
      players = collection([player("C++", 5), player("Java", 10), player("Javascript", 15), player("Go", 25), player("Python", 20)]);
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
      selected = model();
      return body(div({
        id: 'outer'
      }, div({
        "class": 'leader board'
      }).foreach(players, function(player) {
        return div({
          "class": 'player'
        }, span({
          "class": 'name'
        }, player.name), span({
          "class": 'score'
        }, player.score)).bindClass(selected, 'selected', function() {
          return selected() === player;
        }).on('click', function() {
          return selected(player);
        });
      })), div({
        "class": 'details'
      }, div({
        "class": 'name'
      }, map(selected, function() {
        if (selected()) {
          return selected().name;
        }
      })), button({
        "class": 'inc'
      }, "Give 5 points", function() {
        return selected().score += 5;
      })).bindVisible(selected), div({
        "class": 'none'
      }, 'Click a player to select').bindVisible(selected, function() {
        return !selected();
      }));
    }));
  };

}).call(this);
