window.BC.define('common', (common) ->

  common.bindings = (initialItems) ->
    el = null
    initializers = []

    identity = (x) -> x

    # Adds a initializer, which is a jquery call.
    addInitializer = (initializer) ->
      this.addAttr(id: common.nextId()) if not this.id()
      initializers.push(initializer)
      this

    binder = (f, defaultMap = identity) ->
      (observable, map = defaultMap) ->
        addInitializer.call(this, ->  el[f](map(observable.get())))
        addInitializer.call(this, -> observable.subscribe( (newValue) -> el[f](map(newValue))) )
        this

    initBindings: (element) ->
      el = element

      for initializer in initializers
        initializer()

    setValue: ->

    # Binds the value of an element to an observable
    bindValue: (observable) ->
      valueHandler = (newValue) -> el.val(newValue)

      this.setValue = (newValue) ->
        observable.unsubscribe(valueHandler)
        observable.set(newValue)
        observable.subscribe(valueHandler)

      addInitializer.call(this, ->  el.val(observable.get()))
      addInitializer.call(this, -> observable.subscribe(valueHandler))
      this

    # Binds the text of an element
    bindText: binder('text')

    # Binds the html of an element
    bindHtml: binder('html', (x) -> element(x))

    # Binds the css properties of an element
    bindCss: binder('css')

    # Binds the class of an element
    bindClass: (observable, map = (x) -> x) ->
      this.addAttr(id: common.nextId()) if !this.id()
      prevClass = map(observable.get())
      this.addAttr(class: prevClass)

      observable.subscribe((value) ->
        el.removeClass(prevClass)
        prevClass = map(value)
        el.addClass(prevClass)
      )
      this

    # Binds whether an element is visible
    bindVisible: (observable, condition = identity) ->
      this.bindCss(observable, (value) ->
        display: if condition(value) then "" else "none"
      )

    # Binds whether an element is disabled
    bindDisabled: (observable, condition = (x) -> x) ->
      this.bindAttr(observable, (value) -> disabled: condition(value))

    # Binds the attributes of an element
    bindAttr: binder('attr')

    # Adds event handlers, jquery style
    on: (events, selector, handler) ->
      if !handler
        handler = selector
        selector = ""

      addInitializer.call(this, => el.on(events, selector, this, handler))
      this

    # Binds the content of an element to collection
    foreach: (collection, render) ->
      this.addAttr(id: common.nextId()) if !this.id()

      collectionItems =
        if _.isFunction(collection) then collection()
        else if _.isArray(collection) then collection
        else throw Error(collection + " is expected to be an Array or model")

      index = 0
      this.addItems((render(item, index++) for item in collectionItems)...)

      if _.isFunction(collection)
        collection.subscribe( (newItems, path) =>
          elements = (common.element(item) for item in initialItems)
          index = 0
          elements = elements.concat (common.element(render(item, index++)) for item in newItems)
          el.html(elements)
        )
      this

    # Gets the jquery dom element of the html element, sued mostly for testing, in practice
    # it shouldn't be needed
    el: () -> el
)