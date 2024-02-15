import { useQuery } from '@tanstack/react-query';
import { getUserInformation, fetchGraphQL } from 'lib/graphql/queries';
import { useNavigate } from 'react-router-dom';
import TransactionsTable from './transactions';


export default function User() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['getUserID'],
    queryFn: async () => fetchGraphQL(getUserInformation),

    onError: () => {
      navigate('/login');
    },
  });

 
  if (isLoading) return <div>Loading...</div>;

  if (data) {
    return (
      <div>
        <h1 className='text-2xl'>Welcome {data.user[0].login}</h1>
      </div>
    );
  }
}
