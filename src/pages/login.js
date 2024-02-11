import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { encode } from 'base-64';
import clsx from 'clsx';
import { useCookies } from 'react-cookie';
import BeatLoader from 'react-spinners/BeatLoader';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Login() {
  const [cookie, setCookie] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookie.token) {
      navigate('/dashboard');
    }
  });

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      axios.post(
        'https://01.kood.tech/api/auth/signin',
        {},
        {
          headers: {
            Authorization: `Basic ${data}`,
          },
        }
      ),
    onError: (error) => {
      if (error.response.status === 403) {
        setError('email', { type: 'manual' });
        setError('password', {
          type: 'manual',
          message: 'Invalid credentials',
        });
      }
    },

    onSuccess: (data) => {
      setCookie('token', data.data, {
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
      });
      navigate('/dashboard');
    },
  });

  const onSubmit = (data) => {
    clearErrors();
    const { email, password } = data;
    const credentials = encode(`${email}:${password}`);
    mutate(credentials);
  };

  return (
    <div className='flex h-screen w-full'>
      <div className='flex h-full w-full items-center justify-center bg-secondary 2xl:basis-[55%]'>
        <div className='flex h-max w-[90%] max-w-[550px] flex-col space-y-8 rounded-lg bg-foreground pb-7 shadow-lg'>
          <h1 className='mt-5 text-center text-xl font-medium text-background text-black'>Login to Kood/Jõhvi</h1>
          <form onSubmit={handleSubmit(onSubmit)} className='mx-auto mt-6 flex w-[95%] flex-col justify-center space-y-3 text-black'>
            <div>
              <Input
                type='text'
                placeholder='Username'
                {...register('email', { required: true })}
                className={clsx('mb-1', {
                  'border-2 border-red-500': errors.email,
                })}
              />
              {errors.email?.type === 'required' && <p className='text-xs text-red-500'>Email is required</p>}
            </div>
            <div>
              <Input
                type='password'
                placeholder='Password'
                {...register('password', { required: true })}
                className={clsx('mb-1', {
                  'border-2 border-red-500': errors.password,
                })}
              />
              {errors.password?.type === 'required' && <p className='text-xs text-red-500'>Password is required</p>}
            </div>
            <p className='text-xs text-red-500'>{errors.password?.message}</p>
            <Button type='submit' className='pt- mt-3 w-full bg-primary'>
              {isPending ? <BeatLoader size={8} color='white' /> : 'Login'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
