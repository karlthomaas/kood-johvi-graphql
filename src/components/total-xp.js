import { useQuery } from '@tanstack/react-query';
import { fetchGraphQL, getTransactions } from 'lib/graphql/queries';
import { calculateTotalXp } from 'lib/algorithms/total-xp-algo';
import { useCookies } from 'react-cookie';
import demoData from 'data/demo/getLatestTransactions.json';

export const TotalXp = () => {
  const [cookies] = useCookies();

  const { data: transactionsData } = useQuery({
    queryKey: ['getLatestTransactions'],
    queryFn: async () => {
      if (cookies.token === 'demo') {
        return demoData.data;
      }
      return fetchGraphQL(getTransactions, { order_by: [{ createdAt: 'asc' }] });
    },
  });

  if (transactionsData) {
    const totalXp = calculateTotalXp(transactionsData.transaction);
    const roundedXp = Math.round(totalXp / 1000);
    return (
      <div
        className='space-y-3\ flex h-[300px] w-full flex-col justify-center
       rounded-md border border-border bg-card p-4 '
      >
        <div className='-mt-4 text-[55px] text-primary'>
          {roundedXp} <span className='text-foreground'>kB</span>
        </div>
        <h3 className='text-lg sm:text-xl'>Last activity</h3>
        <hr className='my-2 border-primary' />
        <div className='grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 sm:text-base'>
          {transactionsData.transaction.slice(-4).map((transaction, index) => (
            <div key={index}>
              <span className='capitalize'>{transaction.object.type}</span> - {transaction.object.name}{' '}
              {Math.round(transaction.amount / 1000)} kB
            </div>
          ))}
        </div>
      </div>
    );
  }
};
