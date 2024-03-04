import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { encode } from 'base-64';
import clsx from 'clsx';
import Cookies from 'universal-cookie';
import BeatLoader from 'react-spinners/BeatLoader';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Login() {
  const cookies = new Cookies(null, { path: '/' });
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = cookies.get('token');
    if (cookie) {
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
      if (error.response.status === 403 || error.response.status === 401) {
        setError('email', { type: 'manual', message: 'Invalid credentials' });
        setError('password', {
          type: 'manual',
          message: 'Invalid credentials',
        });
      }
    },

    onSuccess: (data) => {
      navigate('/dashboard');
      cookies.set('token', data.data, {
        path: '/',
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
      });
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
      <div className='flex h-full w-full items-center justify-center bg-background'>
        <div className='flex h-max w-[90%] max-w-[550px] flex-col space-y-8 rounded-lg border border-border bg-card pb-7 shadow-lg'>
          <h1 className='mt-5 text-center text-xl font-medium text-card-foreground'>Login to Kood/Jõhvi</h1>
          <form onSubmit={handleSubmit(onSubmit)} className='mx-auto mt-6 flex w-[95%] flex-col justify-center space-y-3 text-black'>
            <div>
              <Input
                type='text'
                placeholder='Email'
                {...register('email', { required: true })}
                className={clsx('mb-1 border-input bg-input text-foreground ring-ring', {
                  'border-2 border-red-500 ': errors.email,
                })}
              />
              {errors.email?.type === 'required' && <p className='text-xs text-red-500'>Email is required</p>}
            </div>
            <div>
              <Input
                type='password'
                placeholder='Password'
                {...register('password', { required: true })}
                className={clsx('mb-1 border-input bg-input text-foreground', {
                  'border-2 border-red-500': errors.password,
                })}
              />
              {errors.password?.type === 'required' && <p className='text-xs text-red-500'>Password is required</p>}
            </div>
            <p className='text-xs text-red-500'>{errors.password?.message}</p>
            <Button type='submit' className='pt- mt-3 w-full bg-primary hover:bg-primary/80'>
              {isPending ? <BeatLoader size={8} color='white' /> : 'Login'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
