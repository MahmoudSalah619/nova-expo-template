import infintyPaginationMergeHandler from "@/utils/infintyPaginationMergeHandler";

const page = (n: number, results: number[], hasNext = true) => ({
  count: 10,
  previous: n > 1 ? `?page=${n - 1}` : null,
  next: hasNext ? `?page=${n + 1}` : null,
  results,
});

describe("infintyPaginationMergeHandler (RTK Query `merge`)", () => {
  it("replaces the cache with the first page (e.g. after a refresh)", () => {
    const cache = page(2, [1, 2, 3, 4]);
    const firstPage = page(1, [9]);

    expect(infintyPaginationMergeHandler(cache, firstPage)).toEqual(firstPage);
  });

  it("appends a later page's results to the cache in place", () => {
    const cache = page(1, [1, 2]);

    const returned = infintyPaginationMergeHandler(cache, page(2, [3, 4], false));

    // RTK Query merges by mutating the Immer draft and returning nothing.
    expect(returned).toBeUndefined();
    expect(cache.results).toEqual([1, 2, 3, 4]);
    expect(cache.next).toBeNull();
  });

  it("ignores a later page when the cache has no next page", () => {
    const cache = page(1, [1, 2], false);

    infintyPaginationMergeHandler(cache, page(2, [3]));

    expect(cache.results).toEqual([1, 2]);
  });
});
