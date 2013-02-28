bootstrap = window.BC.namespace("bootstrap")
docs = window.BC.namespace("docs")
models = window.BC.namespace("models")

$.extend(this, bootstrap, models)

content = model(docs.home())

site = div.container(
  navbar(
    div.container(
      navbar.brand("kiro.js")
      nav(
        a("Home", -> content(docs.home()))
        a("Api", -> content(docs.api()))
        a("Bootstrap", -> content(docs.bootstrap()))
        a("Examples", -> content(docs.examples()))
      )
    )
  ).inverse().fixedTop()
  div.row().bindHtml(content)
)

$('body').append(
  element(
    site
  )
)
