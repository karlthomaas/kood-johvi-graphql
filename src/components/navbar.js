import { useQuery } from '@tanstack/react-query';
import { fetchGraphQL, getUserInformation } from 'lib/graphql/queries';
import { LogOut, User, Github } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import demoData from 'data/demo/getUserInformation.json';
export const Navbar = () => {
  const cookies = new Cookies(null, { path: '/' });

  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ['getUserInformation'],
    queryFn: async () => {
      const cookie = cookies.get('token');
      if (cookie === 'demo') {
        return demoData.data;
      } else {
        return fetchGraphQL(getUserInformation);
      }
    },
  });

  const handleSignOut = () => {
    const cookie = cookies.get('token');

    if (cookie === 'demo') {
      navigate('/');
    } else {
      navigate('/login');
    }

    cookies.set('token', '', {
      expires: new Date(0),
      sameSite: 'None',
      secure: true,
    });
  };

  return (
    <div className='flex h-[60px] w-full items-center justify-between rounded-xl border border-border bg-card px-4'>
      {data?.user ? (
        <a
          target='_blank'
          href='https://github.com/karlthomaas/kood-johvi-graphql'
          className='flex space-x-1 text-foreground/60 transition-colors duration-150 ease-in hover:text-white'
          rel='noreferrer'
        >
          <Github /> <p className='hidden sm:block'>github.com/karlthomaas/kood-johvi-graphql</p>
        </a>
      ) : null}
      <div className='flex items-center space-x-4'>
        {data?.user && (
          <div className='hidden items-center space-x-2 text-foreground/60 transition-colors duration-150 ease-in hover:text-white sm:flex'>
            <User /> <div>{data.user[0].login}</div>
          </div>
        )}
        <Button onClick={handleSignOut} variant='ghost' size='icon' className='group text-secondary hover:bg-secondary hover:text-white'>
          <LogOut className='text-secondary group-hover:text-white' />
        </Button>
      </div>
    </div>
  );
};
