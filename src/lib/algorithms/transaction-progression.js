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
