docs = window.BC.namespace("docs")
docs.home = window.BC.namespace("docs.home")
bootstrap = window.BC.namespace("bootstrap")
models = window.BC.namespace("models")

$.extend(this, bootstrap, models, docs)

docs.home.index = () -> section(
  docs.code.home()

  div(class: 'hero-unit',
    h1("Enter kiro.js")
    br()
    a(href: 'bundle.zip', class: 'btn btn-success btn-large', "Download developer bundle")
    br()
    div("""<iframe src="http://ghbtns.com/github-btn.html?user=kiro&repo=shihai&type=watch&count=true&size=large"
        allowtransparency="true" frameborder="0" scrolling="0" width="170" height="30"></iframe>""")
  )

  example("Declarative bindings", """Binds models to html and automatically updates it.""", ->
    text = model("World")
    body(
      input.text(text)
      h3(map(text, ->  "Hello " + text()))
    )
  )

  example("Bootstrap controls", "Api around bootstrap for building beautiful web apps.", ->
    user = object(
      firstName: "Big"
      lastName: "Sha"
    )

    text = model("")

    body(
      h5("Buttons")
      button.primary("Primary", -> text("Primary"))

      dropdown(
        button.info("Info", -> text("Info, info")),
        a("Hello", -> text("Hello"))
        dropdown.divider()
        a("Test", -> text("Test"))
      )

      button.group(
        button.warning("Warning", -> text("Warning"))
        button.success("Success", -> text("Success"))
        button.danger("Danger", -> text("Danger"))
      )
      span(map(text, -> "I am " + text()))

      h5("Forms")
      form(
        "First name" : input.text(bind(user.firstName))
        "Last name" : input.text(bind(user.lastName))
      )
      pre(code(map(user, -> JSON.stringify(user, null, 4))))

      h5("Table")
      table().bordered().hover().foreach([1, 2], (row) ->
        tr().foreach([1, 2, 3], (col) ->
          td(row + ", " + col)
        )
      )

      h5("And more...")
    )
  )

  example("Html templating", "Building responsive widgets.", ->
    textEdit = (text) ->
      edit = () -> input.text({autofocus: true}, text)
        .on('blur', -> content(view()))
        .on('keydown', (e) -> if e.keyCode == 13 then content(view()))

      view = () -> span(text)
        .on('click', -> content(edit()))

      content = model(view())
      div(content)

    text = model("Click to edit")

    body(
      textEdit(text)
    )
  )

  example("Todo", "Classic todo app.", ->
    todo = (text, done = false) -> object(
      text: text
      done: done
    )

    todos = collection([todo('first todo')])

    notDone = (todo) -> !todo.done
    done = (todo) -> todo.done
    remaining = -> todos.count(notDone) + " of " + todos.total() + " remaining"

    todoText = model("")

    body(
      span(map(todos, remaining)),
      button.link("archive", -> todos.remove(done)),
      ul.unstyled().foreach(todos, (todo) ->
        li(
          input.checkbox(bind(todo.done))
            .label(span(bind(todo.text)))
        )
      ),
      form.inline(
        input.text(todoText),
        button.primary('Add', -> todos.add(todo(todoText(""))))
      )
    )
  )
)

