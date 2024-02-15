import { useQuery } from '@tanstack/react-query';
import { fetchGraphQL, getTransactions } from 'lib/graphql/queries';
import { Chart } from 'react-google-charts';
import { transactionProgression } from 'lib/algorithms/transaction-progression';

const reshapeDataToChart = (data) => (
  data.map((transaction) => (
    [transaction.date, transaction.amount]
  ))
)

const reshapeDataToAlgorithm = (data) => (
  data.map((transaction) => (
    { date: new Date(transaction.createdAt), amount: transaction.amount}
  ))
)

const options = {
  title: 'Transactions',
  curveType: 'function',
  // legend: { position: 'bottom' },
}

export default function TransactionsTable() {
  const { data, isloading, isSuccess } = useQuery({
    queryKey: ['getTransactions'],
    queryFn: async () => fetchGraphQL(getTransactions),
  });


  if (data && data.transaction && data.transaction.length > 0) {
    const reshapedData = reshapeDataToAlgorithm(data.transaction);
    const results = transactionProgression(reshapedData);
    const chartData = reshapeDataToChart(results);
    console.log("🚀 ~ TransactionsTable ~ chartData:", chartData)

    return (
      <div className='text-white w-full h-full'>

        <Chart
          chartType="LineChart"
          data={[["Date", "Amount"], ...chartData]}
          width="100%"
          height="400px"
          legendToggle
          options={options}
        />
      </div>
    );
  }

  return <div>Loading...</div>;
}
