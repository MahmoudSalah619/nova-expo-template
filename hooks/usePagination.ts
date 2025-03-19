/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { PaginatedResponse } from "@/apis/@types/general";

interface PagiatedProductsHookProps {
  page: number;
  setPage: (e: number) => void;
  params: any;
  rtkLazyHook: (...args: any) => any;
}

interface ReturnValuesHook<T> {
  data: PaginatedResponse<T>;
  isLoading: boolean;
  isRefreshing: boolean;
  loadMoreData: () => void;
  refetch: () => void;
}

const SUCCESS_DUMMY_PROMISE = new Promise((resolve) => {
  resolve(true);
});

/**
 * Generic Pagination Hook which take T as returned data object
 * which take and use in pagation list type
 */
export default function usePaginatedRequest<T = any>({
  page,
  setPage,
  params,
  rtkLazyHook,
}: PagiatedProductsHookProps): ReturnValuesHook<T> {
  const [isRefreshing, setisRefreshing] = useState(false);

  const [triggerRequest, { data, isFetching: isLoading }] = rtkLazyHook();

  const getData = ({ isPagenatedRequest = false } = {}) => {
    if (!isPagenatedRequest && page !== 1) {
      setPage(1);
      return SUCCESS_DUMMY_PROMISE;
    }
    return triggerRequest({
      page: !isPagenatedRequest ? 1 : page,
      ...params,
    })
      .unwrap()
      .finally(() => {
        if (isPagenatedRequest) {
          setisRefreshing(false);
        }
      });
  };

  const regetProductsDependcy = [JSON.stringify(params)];

  useEffect(() => {
    getData();
  }, regetProductsDependcy);

  useEffect(() => {
    getData({ isPagenatedRequest: true });
  }, [page]);

  const loadMoreData = () => {
    if (isLoading) return;
    if (!data?.next) return;
    setPage(page + 1);
  };

  const refetch = () => {
    setisRefreshing(true);
    return getData().finally(() => {
      setisRefreshing(false);
    });
  };

  return {
    data,
    isLoading: isLoading && !isRefreshing,
    isRefreshing,
    loadMoreData,
    refetch,
  };
}
