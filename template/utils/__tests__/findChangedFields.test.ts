// The source file name has a trailing space: "utils/findChangedFields .ts".
import { findChangedFields } from "@/utils/findChangedFields ";

describe("findChangedFields", () => {
  it("returns an empty object when nothing changed", () => {
    const value = { name: "a", tags: ["x"], address: { city: "Cairo" } };

    expect(findChangedFields(value, structuredClone(value))).toEqual({});
  });

  it("returns only the changed fields with their new values", () => {
    const previous = { name: "a", age: 30 };
    const current = { name: "b", age: 30 };

    expect(findChangedFields(previous, current)).toEqual({ name: "b" });
  });

  it("detects deep changes in nested objects and arrays", () => {
    const previous = { address: { city: "Cairo" }, tags: ["x", "y"] };
    const current = { address: { city: "Giza" }, tags: ["x", "z"] };

    expect(findChangedFields(previous, current)).toEqual(current);
  });

  it("reports keys that were added or removed", () => {
    const previous: Record<string, unknown> = { a: 1 };
    const current: Record<string, unknown> = { b: 2 };

    expect(findChangedFields(previous, current)).toEqual({ a: undefined, b: 2 });
  });

  it("treats a value changing to null as a change", () => {
    expect(findChangedFields({ a: 1 as number | null }, { a: null })).toEqual({
      a: null,
    });
  });
});
