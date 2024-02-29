import { useQuery } from '@tanstack/react-query';
import { fetchGraphQL, getTransactions } from 'lib/graphql/queries';
import { transactionProgression } from 'lib/algorithms/transaction-progression-algo';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { useCookies } from 'react-cookie';
import demoData from 'data/demo/getTransactions.json';

const reshapeDataToAlgorithm = (data) =>
  data.map((transaction) => {
    const date = new Date(transaction.createdAt);
    return { date, amount: transaction.amount };
  });

const reshapeDataToChart = (data) =>
  data.map((transaction) => ({
    date: transaction.date,
    amount: transaction.amount,
  }));

let lastMonth = null;
const formatXAxis = (tickItem) => {
  const date = new Date(tickItem);
  const currentMonth = date.toLocaleDateString('default', { month: 'short' });

  if (lastMonth !== currentMonth) {
    lastMonth = currentMonth;
    return currentMonth;
  }

  return '';
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const date = new Date(label);
    const formattedDate = moment(date).format('DD MMM');
    return (
      <div className='text-foreground'>
        <p className='label'>{formattedDate}</p>
        <p className='label'>{`Amount: ${payload[0].value}`}</p>
      </div>
    );
  }
};

export const XpProgression = () => {
  const [cookies] = useCookies();
  const { data } = useQuery({
    queryKey: ['getTransactions'],
    queryFn: async () => {
      if (cookies.token === 'demo') {
        return demoData.data;
      }

      return fetchGraphQL(getTransactions, { order_by: [{ createdAt: 'asc' }] });
    },
  });

  if (data && data.transaction && data.transaction.length > 0) {
    console.log(data);
    const reshapedData = reshapeDataToAlgorithm(data.transaction);
    const results = transactionProgression(reshapedData);
    const chartData = reshapeDataToChart(results);

    return (
      <div className='h-[300px] w-full rounded-md border border-border bg-card'>
        <ResponsiveContainer height='100%' width='100%'>
          <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
            <Line type='stepBefore' dataKey='amount' stroke='hsl(var(--primary))' dot={false} />
            <XAxis dataKey='date' interval='preserveEnd' tickFormatter={formatXAxis} />
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
};
