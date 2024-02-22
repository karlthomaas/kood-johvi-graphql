export const transactionProgression = (transactions) => {
  const newData = transactions.reduce((acc, transaction) => (
    [
      ...acc,
      {
        date: transaction.date,
        amount: acc.length > 0 ? transaction.amount + acc[acc.length - 1].amount : transaction.amount
      }
    ]
  ), [])
  
  return newData;
};

export const transactionProgression2 = (transactions) => {
  let totalAmount = 0;
  const grouped = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const yearMonth = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2); // format as "yyyy-mm"

    if (!acc[yearMonth]) {
      acc[yearMonth] = { date: new Date(yearMonth), amount: 0 };
    }

    totalAmount += transaction.amount;
    acc[yearMonth].amount = totalAmount;

    return acc;
  }, {});

  const newData = Object.values(grouped);

  return newData;
};