export const KEY_ACTIVE = 'active';

export const calculateBalance = ({ year, month, records }) => {
  let balance = 0;

  if (records[year] && records[year][month]) {
    balance = records[year][month].totalIncome - records[year][month].totalExpenses;
  }

  return { balance, color: pickAmountTextColor({ amount: balance }) };
};

export const pickAmountTextColor = ({ amount }) => {
  if (amount > 0) return '#258C5F';
  if (amount < 0) return '#8C2424';
  return '#50565B';
};

export const filterRecords = ({ month, records, year }) => {
  let results = [];

  if (records[year] && records[year][month]) {
    results = records[year][month].records;
  }

  return groupBy(results, 'date');
};

export const groupBy = (xs, key) => {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
