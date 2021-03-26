const add = require("./main");
test("should add 1+2 to equal 3", () => {
  expect(add(1, 2)).toBe(3);
});

describe("Add function", () => {
  it("should 1+2=3", () => {
    expect(add(1, 2)).toBe(3);
  });
  it("should 1+2=3", () => {
    expect(add(10, 20)).toBe(30);
  });
});
