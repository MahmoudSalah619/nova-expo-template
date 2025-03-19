/* eslint-disable */

const handleOptions = (list: Record<string, any>[] = [], key = "name") => {
  return list.map((item) => {
    return { label: item[key], value: item?.id };
  });
};

export default handleOptions;
