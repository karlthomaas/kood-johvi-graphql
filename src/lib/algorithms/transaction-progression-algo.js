export const transactionProgression = (transactions) => {
  const results = []
  let previousDate = null;
  let totalAmount = 0;

  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    const date = new Date(transaction.date)

    if (previousDate === null) {
      previousDate = date;
      totalAmount = transaction.amount;
    }

    if (date.getDate() - previousDate.getDate() === 0) {
      totalAmount += transaction.amount;
      continue
    }


    if (date.getDate() - previousDate.getDate() === 1) {
      totalAmount += transaction.amount;
      results.push({ date: previousDate, amount: totalAmount });
      previousDate = date;
      continue
    }
    
    // if the difference is more than 1 day - calculate total days betwee two Dates
    const difference = (date - previousDate) / (1000 * 60 * 60 * 24);

    for (let j = 0; j < difference - 1; j++) {
      const newDate = new Date(previousDate);
      newDate.setDate(previousDate.getDate() + j);
      results.push({ date: newDate, amount: totalAmount });
    }
    
    totalAmount += transaction.amount;
    results.push({ date: previousDate, amount: totalAmount });
    previousDate = date;
  }

  return results;

};