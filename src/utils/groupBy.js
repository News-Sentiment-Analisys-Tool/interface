export const groupBy = (items, key) => items.reduce(
    (result, item) => ({
      ...result,
      [item[key].substring(0, 10)]: [
        ...(result[item[key].substring(0, 10)] || []),
        item,
      ],
    }), 
    {},
);

export const groupReportByDate = (items, key) => items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [
        ...(result[item[key]] || []),
        item,
      ],
    }), 
    {},
  );