// Generated by CoffeeScript 1.4.0
(function() {
  var common, model, t;

  common = window.BC.namespace("common");

  model = window.BC.namespace("model");

  $.extend(this, common, model);

  t = tag("span", {
    "class": 'class1',
    id: 'span1'
  });

  describe("Tag tests", function() {
    it("Tests constructor", function() {
      expect(t().html()).toBe("<span id='span1' class='class1'></span>");
      expect(t("value").html()).toBe("<span id='span1' class='class1'>value</span>");
      return expect(t(1, t(), void 0).html()).toBe("<span id='span1' class='class1'>1<span id='span1' class='class1'></span></span>");
    });
    it("Tests add class", function() {
      var span;
      span = t().addClass("class2").addClass("test test");
      expect(span.html()).toBe("<span id='span1' class='class1 class2 test test'></span>");
      return expect(span.classes()).toBe("class1 class2 test test");
    });
    it("Tests add items", function() {
      return expect(t().addItems("value1", " value2").html()).toBe("<span id='span1' class='class1'>value1 value2</span>");
    });
    it("Tests add Attr", function() {
      expect(t().addAttr({
        disabled: true
      }).html()).toBe("<span id='span1' class='class1' disabled='disabled'></span>");
      expect(t().addAttr({
        disabled: false
      }).html()).toBe("<span id='span1' class='class1'></span>");
      return expect(t().addAttr({
        type: "text"
      }).html()).toBe("<span id='span1' class='class1' type='text'></span>");
    });
    it("Tests attributes", function() {
      var attr, f;
      attr = common.attributes();
      expect(attr.get("class")).toBeUndefined();
      attr = common.attributes({
        "class": "class1"
      });
      expect(attr.get("class")).toBe("class1");
      attr.merge({
        "class": "class2",
        type: "test"
      });
      expect(attr.get("class")).toBe("class1 class2");
      expect(attr.get("type")).toBe("test");
      f = function() {};
      expect(function() {
        return attr.merge({
          html: f,
          init: f,
          "class": "class3"
        });
      }).toThrow();
      return expect(attr.get("class")).toBe("class1 class2");
    });
    return it("Tests passing invalid argument to tag", function() {
      var a, f;
      a = tag("a");
      f = function(x) {
        return x;
      };
      expect(function() {
        return a(null);
      }).toThrow();
      return expect(function() {
        return a(f);
      }).toThrow();
    });
  });

}).call(this);