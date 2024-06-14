export const multiplyMoney = (amount, multiplyBy, significantDecimals = 2) => {
  const precision = Math.pow(10, significantDecimals);
  const wholeAmount = amount * precision;
  const result = Math.floor(wholeAmount * multiplyBy);
  return result / precision;
};

const divideMoney = (amount, divideBy, significantDecimals = 2) => {
  const precision = Math.pow(10, significantDecimals);
  const result = multiplyMoney(amount, 1 / divideBy, significantDecimals);
  const remainder = ((amount * precision) % (result * precision)) / precision;
  return [result, remainder];
};

const averagePerDay = (amount, days) => divideMoney(amount, days)[0];

const getBetweenDates = (orders, dateFrom, dateTo) =>
  orders.filter((order) => order.date >= dateFrom && order.date <= dateTo);

const calcTotalAmount = (orders) =>
  orders.reduce((acc, { amount }) => acc + amount, 0);

export const calcStat = async (date, getOrders) => {
  const thisDayBeg = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).getTime();

  const thisDayEnd = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59
  ).getTime();

  const thisMonBeg = new Date(date.getFullYear(), date.getMonth(), 1).getTime();

  let y = date.getFullYear();
  let m = date.getMonth() - 1;
  if (m < 0) {
    m = 11;
    y -= 1;
  }
  const prevMonBeg = new Date(y, m, 1).getTime();

  const orders = await getOrders(prevMonBeg, thisDayEnd);

  const thisDayOrders = getBetweenDates(orders, thisDayBeg, thisDayEnd);
  const thisDayAmount = calcTotalAmount(thisDayOrders);
  const thisMonTotal = calcTotalAmount(
    getBetweenDates(orders, thisMonBeg, thisDayEnd)
  );
  const thisMonDays = date.getDate();
  const prevMonTotal = calcTotalAmount(
    getBetweenDates(orders, prevMonBeg, thisMonBeg - 1)
  );

  const monthDelta = thisMonTotal - prevMonTotal;

  return {
    day: {
      amount: `${thisDayAmount} грн`,
      count: `${thisDayOrders.length} шт`,
    },
    month: {
      amount: `${thisMonTotal} грн`,
      amountByDay: `${averagePerDay(thisMonTotal, thisMonDays)} грн`,
      delta: monthDelta > 0 ? `+${monthDelta} грн` : `${monthDelta} грн`,
    },
  };
};
