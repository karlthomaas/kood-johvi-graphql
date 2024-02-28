import { useQuery } from '@tanstack/react-query';
import { getUserInformation, fetchGraphQL } from 'lib/graphql/queries';


export default function User() {

  const { data } = useQuery({
    queryKey: ['getUserInformation'],
    queryFn: async () => fetchGraphQL(getUserInformation),
  });

  if (data) {
    return (
        <h1 className='text-3xl tracking-wide'>Welcome, {data.user[0].login}!</h1>
    );
  }
}
