controls = window.BC.namespace("controls")

$.extend(this, controls)
console.log(div.row(text("123")))

$("body").append(element(
  div.container.fluid(
    div.row.fluid(
      div.span2(text("span2")),
      div.span5(text("span10"))
    ),
    div.row.fluid(
      div.span2(text("test"))
    )
  )
))