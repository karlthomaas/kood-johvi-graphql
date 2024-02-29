export const calculateTotalXp = (data) => {
  return data.reduce((acc, data) => acc + data.amount, 0);
};
