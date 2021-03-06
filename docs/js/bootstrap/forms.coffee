docs = window.BC.namespace("docs")
docs.bootstrap = window.BC.namespace("docs.bootstrap")
bootstrap = window.BC.namespace("bootstrap")
models = window.BC.namespace("models")

$.extend(this, bootstrap, models, docs)

docs.bootstrap.forms = -> section(h1("Forms"),
  docs.code.forms()

  example("Default styles", "Default from style", ->
    body(
      form(
        legend : "Legend"
        'Label name' : div(
          input.text().placeholder("Type something...")
          help.block("Example block-level help text here.")
        )
        'Check me out' : input.checkbox()
        '' : button.submit("Submit me")
      )
    )
  )

  example("Search form", "form has fields for different styles", ->
    body(
      form.search(
        input.search().medium()
        button.submit('Search')
      )
    )
  )

  example("Inline form", "Usage of form.inline", ->
    body(
      form.inline(
        input.text().small().placeholder("Email")
        input.password().small().placeholder("Password")
        input.checkbox().label("Remember me")
        button.submit("Sign in")
      )
    )
  )

  example("Horizontal form", "Creating horizontal form, it can have field without label", ->
    body(
      form.horizontal(
        'Email': input.text().placeholder('Email')
        'Password': input.password().placeholder('Password')
        'Remember me' : input.checkbox()
        '': button.submit("Sign in")
      )
    )
  )

  example("Textarea", "Textarea input, it can bind the value", ->
    value = model("text")

    body(
      textarea({rows: 3}, value)
      span(value)
    )
  )

  example("Stacked radio and checkbox", "Radio and checkbox inputs", ->
    body(
      input.checkbox().label("Option 1")
      input.radio(name: "radio", value: "value1").label("Option 1")
      input.radio(name: "radio", value: "value2").label("Option 2")
    )
  )

  example("Inline checkboxes", "Inline checkboxes", ->
    body(
      input.checkbox().inlineLabel("1")
      input.radio(name: "radio", value: "value1").inlineLabel("2")
      input.radio(name: "radio", value: "value2").inlineLabel("3")
    )
  )

  example("Append input", "Appending buttons and values to input, the first value is the input the rest are the controls", ->
    body(
      append(input.text(), "@")
      append(input.text(), button("Do it!"), button("Another one!"))
    )
  )

  example("Prepend input", "Prepending values to input, the last value is the input the others are the prepended controls", ->
    body(
      prepend("@", input.text())
      prepend(button("Check"), input.text())
    )
  )

  example("Search box append and prepend", "Appending prepending to search box", ->
    body(
      form.search(
        append(
          input.text(class: "input-medium search-query")
          button.submit('Search')
        ),
        prepend(
          button.submit('Search')
          input.text(class: "input-medium search-query")
        )
      )
    )
  )

  example("Input size styles", "Builder methods for input sizes", ->
    body(div(class: "controls docs-input-sizes",
      input.text().mini().placeholder('mini')
      input.text().small().placeholder('small')
      input.text().medium().placeholder('medium')
      input.text().large().placeholder('large')
      input.text().xlarge().placeholder('xlarge')
      input.text().xxlarge().placeholder('xxlarge')
    ))
  )

  example("Input span", "Span style builder methods for input sizes", ->
    items = (option(i) for i in [1..5])

    body(div(class: "controls docs-input-sizes",
      input.text().span2().placeholder('span2')
      input.text().span4().placeholder('span4')
      input.text().span6().placeholder('span6')
      select().span2(items)
      select().span4(items)
      select().span6(items)
    ))
  )

  example("Row inputs", "Span style input sizes", ->
    body(div(class: "docs-input-sizes",
      div.controls.row(input.text().span1(), input.text().span5())
      div.controls.row(input.text().span3(), input.text().span3())
      div.controls.row(input.text().span5(), input.text().span1())
    ))
  )

  example("Form actions in action", "If values are passed after the form fields object, they are appended as form action", ->
    body(
      form.horizontal(
        "First Name" : input.text()
        "Last Name" : input.text()
        actions : [button("Submit"), button("Remove")]
      )
    )
  )

  example("Different image styles", "predefined image styles, it accepts config object with src and class proeprties", ->
    body(
      img(class:'image', src: 'img.jpeg')
      img.polaroid(class:'image', src: 'img.jpeg')
      img.circle(class:'image', src: 'img.jpeg')
      img.rounded(class:'image', src: 'img.jpeg')
    )
  )

  example("Icons", "Use <code>icon.</code> for the icons ", ->
    body(
      [value() for name, value of icon]
    )
  )

  example("Icon buttons", "Examples of using icons", ->
    body(
      button(icon.asterisk(), "Asterisk"),
      form(
        "Email" : prepend(icon.envelope(), input.text())
      )

      ul(class: "nav nav-list",
        li({class: "active"}, a(icon.home(), 'Home'))
        li(a(icon.book(), 'Library'))
        li(a(icon.pencil(), "Applications"))
        li(a("Misc"))
      )
    )
  )
)