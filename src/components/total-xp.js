import { useQuery } from '@tanstack/react-query';
import { fetchGraphQL, getTransactions } from 'lib/graphql/queries';
import { calculateTotalXp } from 'lib/algorithms/total-xp-algo';

export const TotalXp = () => {
  const { data: transactionsData } = useQuery({
    queryKey: ['getLatestTransactions'],
    queryFn: async () => fetchGraphQL(getTransactions, { order_by: [{ createdAt: 'asc' }] }),
  });

  if (transactionsData) {
    console.log(transactionsData.transaction);
    const totalXp = calculateTotalXp(transactionsData.transaction);
    const roundedXp = Math.round(totalXp / 1000);
    return (
      <div className='flex h-[230px] w-[550px] flex-col space-y-3 rounded-md bg-card border border-border p-4'>
        <h1 className='text-[55px] text-primary'>
          {roundedXp} <span className='text-foreground'>kB</span>
        </h1>
        <h3 className='text-lg'>Last activity</h3>
        <hr className='border-primary' />
        <div className='grid grid-cols-2 gap-2 text-sm'>
          {transactionsData.transaction.slice(-4).map((transaction, index) => (
            <div key={index}>
              <span className='capitalize'>{transaction.object.type}</span> - {transaction.object.name}{' '}
              {Math.round(transaction.amount / 1000)} kB
            </div>
          ))}
        </div>
        <div></div>
      </div>
    );
  }
};
