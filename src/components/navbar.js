import { useQuery } from '@tanstack/react-query';
import { fetchGraphQL, getUserInformation } from 'lib/graphql/queries';
import { LogOut, User, Github } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const Navbar = () => {
  const [, setCookie] = useCookies(['jwt']);

  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ['getUserInformation'],
    queryFn: async () => fetchGraphQL(getUserInformation),
  });

  const handleSignOut = () => {
    setCookie('token', '', { expires: new Date(0) });
    navigate('/login');
  };

  return (
    <div className='flex h-[60px] w-full items-center justify-between rounded-xl border border-border bg-card px-4'>
      {data?.user ? (
        <a
          target='_blank'
          href='https://01.kood.tech/git/Karl-Thomas/graphql'
          className='flex space-x-1 text-foreground/60 transition-colors duration-150 ease-in hover:text-white'
          rel='noreferrer'
        >
          <Github /> <p>01.kood.tech/git/Karl-Thomas/graphql</p>
        </a>
      ) : null}
      <div className='flex items-center space-x-4'>
        {data?.user && (
          <div className='flex items-center space-x-2 text-foreground/60 transition-colors duration-150 ease-in hover:text-white'>
            <User /> <div>{data.user[0].login}</div>
          </div>
        )}
        <Button
          onClick={() => handleSignOut()}
          variant='ghost'
          size='icon'
          className='group text-secondary hover:bg-secondary hover:text-white'
        >
          <LogOut className='text-secondary group-hover:text-white' />
        </Button>
      </div>
    </div>
  );
};
