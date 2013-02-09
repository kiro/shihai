ns = window.BC.namespace("mixins")
common = window.BC.namespace("common")

ns.spannable = ->
  span = (size) ->
    (args...) -> this.addClassAndItems('span' + size, args...)

  span1: span(1)
  span2: span(2)
  span3: span(3)
  span4: span(4)
  span5: span(5)
  span6: span(6)
  span7: span(7)
  span8: span(8)
  span9: span(9)
  span10: span(10)
  span11: span(11)
  span12: span(12)

ns.offsetable = ->
  offset = (size) ->
    (args...) -> this.addClassAndItems("offset" + size, args...)

  offset1: offset(1)
  offset2: offset(2)
  offset3: offset(3)
  offset4: offset(4)
  offset5: offset(5)
  offset6: offset(6)
  offset7: offset(7)
  offset8: offset(8)
  offset9: offset(9)
  offset10: offset(10)
  offset11: offset(11)
  offset12: offset(12)

ns.contextual = (prefix) ->
  context: (suffix, args...) ->
    if prefix then prefix = prefix + "-"
    this.addClassAndItems(prefix + suffix, args...)

  info: (args...) -> this.context('info', args...)
  warning: (args...) -> this.context('warning', args...)
  error: (args...) -> this.context('error', args...)
  success: (args...) -> this.context('success', args...)

ns.textContextual = -> $.extend(ns.contextual('text'),
  muted: (args...) ->
    this.addClass("muted")
    this.addItems(args...)
)