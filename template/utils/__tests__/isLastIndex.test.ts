import isLastIndex from "@/utils/isLastIndex";

describe("isLastIndex", () => {
  const list = ["a", "b", "c"];

  it("is true for the last index", () => {
    expect(isLastIndex({ index: 2, list })).toBe(true);
  });

  it("is false for any other index", () => {
    expect(isLastIndex({ index: 0, list })).toBe(false);
    expect(isLastIndex({ index: 1, list })).toBe(false);
  });
});
