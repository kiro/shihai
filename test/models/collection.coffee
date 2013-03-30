common = window.BC.namespace("common")
models = window.BC.namespace("models")
util = window.BC.namespace("test.util")

$.extend(this, common, models, util)

describe("Collection tests", ->
  it("Tests collection", ->
    expect(collection([1])()).toEqual([1])
    expect(collection([1, 2, 3])()).toEqual([1, 2, 3])

    numbers = collection([1, 2, 3])
    numbers([4, 5, 6])
    expect(numbers()).toEqual([4, 5, 6])
    numbers([7, 8, 9])
    expect(numbers()).toEqual([7, 8, 9])
    expect(collection([1])()).toEqual([1])
  )

  it("Tests add and addAll", ->
    subscriptionCalls = 0
    numbers = collection([1, 2])

    total = 3
    numbers.subscribe((values) ->
      subscriptionCalls++
      expect(values).toEqual([1..total])
    )
    numbers.add(3)
    expect(numbers()).toEqual([1..3])
    expect(subscriptionCalls).toEqual(1)

    total = 5
    numbers.addAll([4, 5])
    expect(numbers()).toEqual([1..5])
    expect(subscriptionCalls).toEqual(2)

    total = 7
    numbers.addAll([6, 7])
    expect(numbers()).toEqual([1..7])
    expect(subscriptionCalls).toEqual(3)
  )

  it("Tests remove", ->
    numbers = collection([1, 2, 2, 3, 3])

    numbers.remove(3)
    expect(numbers()).toEqual([1, 2, 2])

    numbers.addAll([4, 5, 6])
    numbers.remove((number) -> 2 < number < 6)
    expect(numbers()).toEqual([1, 2, 2, 6])

    subscriptionCalls = 0
    numbers.subscribe((values) ->
      subscriptionCalls++
      expect(values).toEqual([1, 6]))
    numbers.remove(2)
    expect(subscriptionCalls).toEqual(1)
  )

  it("Tests removeAll", ->
    subscriptionCalls = 0
    numbers = collection([1, 2, 3])

    numbers.subscribe((values) ->
      subscriptionCalls++
      expect(values).toEqual([]))

    numbers.removeAll()
    expect(numbers()).toEqual([])
    expect(subscriptionCalls).toEqual(1)
  )

  it("Tests get", ->
    numbers = collection([1, 2, 3])
    numbers.subscribe( -> throw Error("Get shouldn't trigger an update."))

    expect(numbers.get(1)).toEqual(2)
    expect(numbers.get(0)).toEqual(1)
    expect(numbers.get((number) -> number > 0 and number < 3)).toEqual([1, 2])
  )

  it("Tests count", ->
    numbers = collection([1, 2, 3, 4])
    numbers.subscribe( -> throw Error("Get shouldn't trigger an update."))

    expect(numbers.count()).toEqual(4)
    expect(numbers.count((number) -> 1 < number < 4)).toEqual(2)
  )

  it("Tests replace", ->
    subscriptionCalls = 0
    numbers = collection([1, 2, 2, 3])

    expectedValues = [1, 4, 4, 3]
    numbers.subscribe((values) ->
      subscriptionCalls++
      expect(values).toEqual(expectedValues))
    numbers.replace(2, 4)
    expect(numbers()).toEqual([1, 4, 4, 3])
    expect(subscriptionCalls).toEqual(1)

    expectedValues = [1, 2, 2, 3]
    numbers.replace(((number) -> number == 4), 2)
    expect(numbers()).toEqual([1, 2, 2, 3])
    expect(subscriptionCalls).toEqual(2)
  )

  it("Tests replaceAll", ->
    subscriptionCalls = 0

    expectedValues = [4, 5, 6]
    numbers = collection([1, 2, 3])
    numbers.subscribe((values) ->
      subscriptionCalls++
      expect(values).toEqual(expectedValues)
    )

    numbers.replaceAll([4, 5, 6])
    expect(numbers()).toEqual([4, 5, 6])
    expect(subscriptionCalls).toEqual(1)

    expectedValues = [7, 8, 9]
    numbers.replaceAll([7, 8, 9])
    expect(numbers()).toEqual([7, 8, 9])
    expect(subscriptionCalls).toEqual(2)
  )

  it("Tests filter", ->
    subscriptionCalls = 0
    numbers = collection([1..5])

    expectedValues = [1..5]
    numbers.subscribe((values) ->
      subscriptionCalls++
      expect(values).toEqual(expectedValues))

    expectedValues = [4, 5]
    numbers.filter((number) -> number > 3)
    expect(numbers.count()).toEqual(2)
    expect(numbers()).toEqual([4, 5])
    expect(subscriptionCalls).toEqual(1)

    expectedValues = [1..5]
    numbers.filter(-> true)
    expect(numbers.count()).toEqual(5)
    expect(numbers()).toEqual([1..5])
    expect(subscriptionCalls).toEqual(2)

    expectedValues = [5]
    numbers.filter(5)
    expect(numbers.count()).toEqual(1)
    expect(numbers()).toEqual([5])
    expect(subscriptionCalls).toEqual(3)

    expectedValues = []
    numbers.filter(-> false)
    expect(numbers.count()).toEqual(0)
    expect(numbers()).toEqual([])
    expect(subscriptionCalls).toEqual(4)
  )

  betweenThreeAndFive = (number) -> 3 <= number <= 5

  it("Tests filter with add", ->
    numbers = collection([1..6])
    numbers.filter(betweenThreeAndFive)
    numbers.add(7)

    expect(numbers()).toEqual([3..5])
    numbers.add(3)
    expect(numbers()).toEqual([3, 4, 5, 3])
  )

  it("Tests filter with replace and replaceAll", ->
    numbers = collection([1..6])
    numbers.filter(betweenThreeAndFive)

    numbers.replace(3, 7)
    expect(numbers()).toEqual([4, 5])
    numbers.replace(7, 3)
    expect(numbers()).toEqual([3, 4, 5])

    numbers.replaceAll([1, 2, 3])
    expect(numbers()).toEqual([3])
  )

  it("Tests filter with remove and removeAll", ->
    numbers = collection([1..6])
    numbers.filter(betweenThreeAndFive)

    numbers.remove(3)
    expect(numbers()).toEqual([4, 5])
    numbers.remove(1)
    expect(numbers()).toEqual([4, 5])
    numbers.removeAll()
    expect(numbers()).toEqual([])
  )

  it("Tests total", ->
    numbers = collection([1, 2, 3, 4])
    numbers.filter(betweenThreeAndFive)

    expect(numbers.total()).toBe(4)
    expect(numbers.count()).toBe(2)
    expect(numbers.total(betweenThreeAndFive)).toBe(2)
  )

  it("Tests sort", ->
    names = collection(["Java", "Ada", "C++"])
    names.sort()

    expect(names()).toEqual(["Ada", "C++", "Java"])
    names.add("Go")
    expect(names()).toEqual(["Ada", "C++", "Go", "Java"])
    names.filter((name) -> name != "Go")
    expect(names()).toEqual(["Ada", "C++", "Java"])
    names.add("Test")
    expect(names()).toEqual(["Ada", "C++", "Java", "Test"])
    names.add("ABC")
    expect(names()).toEqual(["ABC", "Ada", "C++", "Java", "Test"])
  )

  it("Tests subscription to models", ->
    player = (name, score) -> object(name: name, score: score)

    one = player("one", 1)
    two = player("two", 2)
    four = player("four", 4)

    players = collection([one, two])

    players.sort((player1, player2) ->
      return if player1.score < player2.score then 1 else (if player1.score > player2.score then -1 else 0)
    )

    expect(players()).toEqual([two, one])
    one.score += 2
    expect(players()).toEqual([one, two])
    players.add(four)
    expect(players()).toEqual([four, one, two])
    two.score = 5
    expect(players()).toEqual([two, four, one])
    four.score = 10
    expect(players()).toEqual([four, two, one])
  )
)