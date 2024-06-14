const pad = (num, size) => {
  num = num.toString();
  while (num.length < size) {
    num = "0" + num;
  }
  return num;
};

export const getDateString = (date) =>
  date instanceof Date
    ? `${pad(date.getDate(), 2)}.${pad(date.getMonth() + 1, 2)}.${pad(
        date.getFullYear(),
        4
      )}`
    : "";
