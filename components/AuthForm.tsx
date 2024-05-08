'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions';
import PlaidLink from './PlaidLink';

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const userData = {
        firstName: data.firstName!,
        lastName: data.lastName!,
        address1: data.address1!,
        city: data.city!,
        state: data.state!,
        postalCode: data.postalCode!,
        dateOfBirth: data.dateOfBirth!,
        ssn: data.ssn!,
        email: data.email,
        password: data.password,
      };
      if (type === 'sign-up') {
        const newUser = await signUp(userData);
        setUser(newUser);
      }
      if (type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) return router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href='/' className='cursor-pointer flex items-center gap-1'>
          <Image
            src='/icons/logo.svg'
            width={34}
            height={34}
            alt='WePay logo'
          />
          <h1 className='text-26 font-ibm-plex-serif font-bold text-white'>
            WePay
          </h1>
        </Link>
        <div className='flex flex-col gap-1 md:gap-3'>
          <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
            {user ? 'Link Acount' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            <p className='text-16 font-normal text-gray-600'>
              {user
                ? 'Link your account to get started'
                : 'Please enter your details'}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className='flex flex-col gap-4'>
          <PlaidLink user={user} variant='primary' />
        </div>
      ) : (
        <>
          {' '}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {type === 'sign-up' && (
                <>
                  <div className='flex gap-4'>
                    <CustomInput
                      control={form.control}
                      name='firstName'
                      label='first name'
                      type='text'
                      placeholder='Enter your first name'
                    />
                    <CustomInput
                      control={form.control}
                      name='lastName'
                      label='last name'
                      type='text'
                      placeholder='Enter your last name'
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name='address1'
                    label='address'
                    type='text'
                    placeholder='Enter your address'
                  />
                  <CustomInput
                    control={form.control}
                    name='city'
                    label='city'
                    type='text'
                    placeholder='Enter your city'
                  />
                  <div className='flex gap-4'>
                    <CustomInput
                      control={form.control}
                      name='state'
                      label='state'
                      type='text'
                      placeholder='Example: Lagos'
                    />
                    <CustomInput
                      control={form.control}
                      name='postalCode'
                      label='postal code'
                      type='text'
                      placeholder='Example: 100012'
                    />
                  </div>
                  <div className='flex gap-4'>
                    <CustomInput
                      control={form.control}
                      name='dateOfBirth'
                      label='DOB'
                      type='text'
                      placeholder='YYYY-MM-DD'
                    />
                    <CustomInput
                      control={form.control}
                      name='ssn'
                      label='SSN'
                      type='text'
                      placeholder='Example: 1234'
                    />
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                label='email'
                name='email'
                placeholder='Enter your email'
                type='email'
              />
              <CustomInput
                control={form.control}
                label='password'
                name='password'
                placeholder='Enter your password'
                type='password'
              />
              <div className='flex flex-col gap-4'>
                <Button type='submit' className='form-btn' disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className='animate-spin' />{' '}
                      &nbsp;Loading...
                    </>
                  ) : type === 'sign-in' ? (
                    'Sign In'
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className='flex justify-center gap-1'>
            <p className='text-14 font-normal text-gray-600'>
              {type === 'sign-in'
                ? "Don't have an account?"
                : 'Already have an account'}
            </p>
            <Link
              href={type === 'sign-in' ? '/signup' : '/signin'}
              className='form-link'
            >
              {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};
export default AuthForm;
