import { mergeSortedLists } from "../src/algorithms/mergeSortedLists"

type Patient = {
  ssn: string
  age: number
  fullName: string
}

describe("Merge Sorted Lists - Normal Cases", () => {

  test("basic sorted merge", () => {
    const a: Patient[] = [
      { ssn: "111-11-1111", age: 30, fullName: "John Doe" },
      { ssn: "333-33-3333", age: 40, fullName: "Sarah Lee" },
    ]

    const b: Patient[] = [
      { ssn: "222-22-2222", age: 25, fullName: "Emma Stone" },
      { ssn: "444-44-4444", age: 50, fullName: "Mike Ross" },
    ]

    const result = mergeSortedLists(a, b)

    expect(result.map(p => p.ssn)).toEqual([
      "111-11-1111",
      "222-22-2222",
      "333-33-3333",
      "444-44-4444",
    ])
  })

  test("interleaved ordering", () => {
    const a: Patient[] = [
      { ssn: "100-00-0001", age: 20, fullName: "A" },
      { ssn: "300-00-0001", age: 30, fullName: "B" },
    ]

    const b: Patient[] = [
      { ssn: "200-00-0001", age: 25, fullName: "C" },
      { ssn: "400-00-0001", age: 35, fullName: "D" },
    ]

    const result = mergeSortedLists(a, b)

    expect(result.map(p => p.ssn)).toEqual([
      "100-00-0001",
      "200-00-0001",
      "300-00-0001",
      "400-00-0001",
    ])
  })

  test("one empty list", () => {
    const a: Patient[] = []
    const b: Patient[] = [
      { ssn: "111-11-1111", age: 22, fullName: "Only B" },
    ]

    expect(mergeSortedLists(a, b)).toEqual(b)
  })
})


describe("Merge Sorted Lists - Edge Cases", () => {

  test("duplicate SSNs preserved", () => {
    const a: Patient[] = [
      { ssn: "222-22-2222", age: 30, fullName: "A" },
    ]

    const b: Patient[] = [
      { ssn: "222-22-2222", age: 31, fullName: "B" },
    ]

    const result = mergeSortedLists(a, b)

    expect(result.map(p => p.ssn)).toEqual([
      "222-22-2222",
      "222-22-2222",
    ])
  })

  test("both lists empty", () => {
    expect(mergeSortedLists([], [])).toEqual([])
  })

  test("large imbalance case", () => {
    const a: Patient[] = [
      { ssn: "111-11-1111", age: 20, fullName: "A" },
      { ssn: "222-22-2222", age: 21, fullName: "B" },
      { ssn: "333-33-3333", age: 22, fullName: "C" },
    ]

    expect(mergeSortedLists(a, [])).toEqual(a)
  })
})
