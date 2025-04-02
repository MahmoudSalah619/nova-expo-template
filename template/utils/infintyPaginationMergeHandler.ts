/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */

const infintyPaginationMergeHandler = (currentCache: any, newItems: any) => {
  if (!newItems?.previous) {
    return {
      ...newItems,
    };
  }
  if (currentCache?.next) {
    currentCache.next = newItems?.next;
    currentCache.results.push(...newItems.results);
  }
};

export default infintyPaginationMergeHandler;
