import {
  cloneDeep,
  debounce,
  groupBy,
  isEqual,
  orderBy,
  throttle,
  uniqBy,
} from "@/utils/lodash";

describe("debounce", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("calls the function once, with the latest args, after the wait", () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 300);

    debounced("a");
    debounced("b");
    jest.advanceTimersByTime(299);
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("b");
  });

  it("defaults the wait to 300ms", () => {
    const fn = jest.fn();
    debounce(fn)();

    jest.advanceTimersByTime(300);

    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe("throttle", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("calls immediately, then ignores calls until the wait has passed", () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);

    throttled(1);
    throttled(2);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(1);

    jest.advanceTimersByTime(100);
    throttled(3);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith(3);
  });
});

describe("cloneDeep", () => {
  it("returns an equal value that shares no nested references", () => {
    const original = { a: { b: [1, 2] } };

    const copy = cloneDeep(original);
    copy.a.b.push(3);

    expect(original).toEqual({ a: { b: [1, 2] } });
  });
});

describe("isEqual", () => {
  it.each([
    [1, 1, true],
    ["a", "b", false],
    [{ a: 1, b: { c: [1, 2] } }, { a: 1, b: { c: [1, 2] } }, true],
    [{ a: 1 }, { a: 1, b: 2 }, false],
    [{ a: 1 }, { b: 1 }, false],
    [null, {}, false],
    [[1, 2], [1, 2], true],
    [[1, 2], [2, 1], false],
  ])("isEqual(%j, %j) -> %s", (a, b, expected) => {
    expect(isEqual(a, b)).toBe(expected);
  });
});

describe("uniqBy", () => {
  it("keeps the first item for each key value", () => {
    const items = [
      { id: 1, name: "a" },
      { id: 2, name: "b" },
      { id: 1, name: "c" },
    ];

    expect(uniqBy(items, "id")).toEqual([
      { id: 1, name: "a" },
      { id: 2, name: "b" },
    ]);
  });
});

describe("groupBy", () => {
  it("groups items under the stringified key value", () => {
    const items = [
      { type: 1, v: "a" },
      { type: 2, v: "b" },
      { type: 1, v: "c" },
    ];

    expect(groupBy(items, "type")).toEqual({
      "1": [items[0], items[2]],
      "2": [items[1]],
    });
  });

  it("returns an empty object for an empty list", () => {
    expect(groupBy([] as { k: string }[], "k")).toEqual({});
  });
});

describe("orderBy", () => {
  const items = [{ n: 2 }, { n: 3 }, { n: 1 }];

  it("sorts ascending by default", () => {
    expect(orderBy(items, "n").map((i) => i.n)).toEqual([1, 2, 3]);
  });

  it("sorts descending", () => {
    expect(orderBy(items, "n", "desc").map((i) => i.n)).toEqual([3, 2, 1]);
  });

  it("does not mutate the input", () => {
    orderBy(items, "n");

    expect(items.map((i) => i.n)).toEqual([2, 3, 1]);
  });
});
