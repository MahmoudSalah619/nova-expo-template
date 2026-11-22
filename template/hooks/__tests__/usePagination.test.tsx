import { act, renderHook } from "@testing-library/react-native";

import usePaginatedRequest from "@/hooks/usePagination";

type Page = { next: string | null; results: number[] };

/** A fake RTK Query lazy hook: `[trigger, { data, isFetching }]`. */
function makeLazyHook({ data, isFetching = false }: { data?: Page; isFetching?: boolean } = {}) {
  const unwrap = jest.fn(() => Promise.resolve(data));
  const trigger = jest.fn(() => ({ unwrap }));
  const rtkLazyHook = jest.fn(() => [trigger, { data, isFetching }]);
  return { trigger, rtkLazyHook };
}

async function renderPagination({
  page = 1,
  params = {},
  lazy = makeLazyHook(),
}: { page?: number; params?: object; lazy?: ReturnType<typeof makeLazyHook> } = {}) {
  const setPage = jest.fn();
  const hook = await renderHook(
    (props: { page: number; params: object }) =>
      usePaginatedRequest<number>({ ...props, setPage, rtkLazyHook: lazy.rtkLazyHook }),
    { initialProps: { page, params } },
  );
  return { ...hook, setPage, trigger: lazy.trigger };
}

describe("usePaginatedRequest", () => {
  it("requests page 1 with the params on mount", async () => {
    const { trigger } = await renderPagination({ params: { q: "shoe" } });

    expect(trigger).toHaveBeenCalledWith({ page: 1, q: "shoe" });
  });

  it("requests the new page when the page changes", async () => {
    const { trigger, rerender } = await renderPagination({ params: { q: "shoe" } });
    trigger.mockClear();

    await rerender({ page: 2, params: { q: "shoe" } });

    expect(trigger).toHaveBeenCalledWith({ page: 2, q: "shoe" });
  });

  it("goes back to page 1 when the params change on a later page", async () => {
    const { setPage, rerender } = await renderPagination({ page: 3, params: { q: "a" } });
    setPage.mockClear();

    await rerender({ page: 3, params: { q: "b" } });

    expect(setPage).toHaveBeenCalledWith(1);
  });

  it("loads the next page when there is one", async () => {
    const lazy = makeLazyHook({ data: { next: "?page=2", results: [1] } });
    const { result, setPage } = await renderPagination({ lazy });

    await act(async () => result.current.loadMoreData());

    expect(setPage).toHaveBeenCalledWith(2);
  });

  it("does not load more on the last page", async () => {
    const lazy = makeLazyHook({ data: { next: null, results: [1] } });
    const { result, setPage } = await renderPagination({ lazy });

    await act(async () => result.current.loadMoreData());

    expect(setPage).not.toHaveBeenCalled();
  });

  it("does not load more while a request is in flight", async () => {
    const lazy = makeLazyHook({ data: { next: "?page=2", results: [1] }, isFetching: true });
    const { result, setPage } = await renderPagination({ lazy });

    await act(async () => result.current.loadMoreData());

    expect(setPage).not.toHaveBeenCalled();
  });

  it("refetches page 1 and clears the refreshing flag afterwards", async () => {
    const { result, trigger } = await renderPagination({ params: { q: "a" } });
    trigger.mockClear();

    await act(async () => {
      await result.current.refetch();
    });

    expect(trigger).toHaveBeenCalledWith({ page: 1, q: "a" });
    expect(result.current.isRefreshing).toBe(false);
  });
});
