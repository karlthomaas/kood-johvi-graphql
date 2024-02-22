import { useQuery } from '@tanstack/react-query';
import { fetchGraphQL, getTransactions } from 'lib/graphql/queries';
import { transactionProgression, transactionProgression2 } from 'lib/algorithms/transaction-progression';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import moment from 'moment';

const reshapeDataToAlgorithm = (data) => (
  data.map((transaction) => {
    const date = new Date(transaction.createdAt);
    date.setDate(1); // set the day to the first day of the month
    return { date, amount: transaction.amount };
  })
)

const reshapeDataToChart = (data) => (
  data.map((transaction) => (
    {
      name: transaction.date,
      amount: transaction.amount,
    }
  ))
)

const formatXAxis = (tickItem) => (
  moment(tickItem).format('MMM YYYY')
)
 


export default function XpProgression() {
    const { data, isloading, isSuccess } = useQuery({
        queryKey: ['getTransactions'],
        queryFn: async () => fetchGraphQL(getTransactions),
      });

    if (data && data.transaction && data.transaction.length > 0) {
      const reshapedData = reshapeDataToAlgorithm(data.transaction);
      const results = transactionProgression(reshapedData);
      const chartData = reshapeDataToChart(results);

      return (
        <LineChart width={600} height={300} data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 50 }}>
          <Line type="stepBefore" dataKey="amount" stroke="#8884d8" />
          <XAxis dataKey="name" interval="preserveEnd" tickFormatter={formatXAxis}/>
          <YAxis/>
          <Tooltip />
        </LineChart>
      )

    }
}