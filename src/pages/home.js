import { Link } from 'react-router-dom';
import { Button } from 'components/ui/button';
import { useCookies } from 'react-cookie';

export default function Home() {
  const [, setCookie] = useCookies();

  const handleDemo = () => {
    setCookie('token', 'demo', { secure: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 7 });
  };

  return (
    <div className='h-full w-full'>
      <div className='mx-auto flex max-w-screen-xl flex-col items-center justify-center'>
        <p className='mt-[10%] font-extrabold tracking-wider sm:text-2xl md:text-4xl'>
          Welcome to <span className='text-primary'>Kood/Jõhvi</span> GraphQL!
        </p>
        <div className='mt-8 flex space-x-8'>
          <Link to='/login'>
            <Button
              className='ease-in-out\ sm:text-md h-8 w-[100px] bg-primary
           text-sm transition-all duration-150 hover:-translate-y-1 hover:bg-primary/80 hover:shadow-lg sm:h-10'
            >
              Login
            </Button>
          </Link>
          <Button
            href='/login'
            className='ease-in-out\ sm:text-md h-8 w-[100px] bg-white text-sm text-black
            transition-all duration-150 hover:-translate-y-1 hover:bg-white/80 hover:shadow-lg sm:h-10'
            onClick={handleDemo}
          >
            <Link to='/dashboard'>Demo</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
