import debounce from "@/utils/debounce";

describe("debounce (default export)", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("restarts the timer on every call and fires once with the latest args", () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 200);

    debounced("first");
    jest.advanceTimersByTime(150);
    debounced("second");
    jest.advanceTimersByTime(150);
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("second");
  });
});
