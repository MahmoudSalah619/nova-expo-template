/* eslint-disable @typescript-eslint/no-explicit-any */
const isLastIndex = ({ index, list }: { index: number; list: any[] }) =>
  index === list.length - 1;

export default isLastIndex;
