'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/extendui/button';
import { Input } from '@/components/extendui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignIn01() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const emailValue = watch('email');
  const passwordValue = watch('password');

  const onSubmit = (data: SignInValues) => {
    toast.success(<pre>{JSON.stringify(data, null, 2)}</pre>);
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          autoComplete="off"
        >
          <div className="space-y-2">
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register('email')}
              value={emailValue}
              onChange={(e) => setValue('email', e.target.value)}
            >
              <Input.Group>
                <Input.Label>Email</Input.Label>
                <Input.ClearButton onClick={() => setValue('email', '')} />
              </Input.Group>
            </Input>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Input
              id="password"
              type={'password'}
              placeholder="Enter your password"
              {...register('password')}
              value={passwordValue}
              onChange={(e) => setValue('password', e.target.value)}
            >
              <Input.Group>
                <Input.Label>Password</Input.Label>
                <Input.ClearButton onClick={() => setValue('password', '')} />
                <Input.PasswordToggle />
              </Input.Group>
            </Input>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
            <div className="flex items-center justify-end">
              <Link href="#" className="text-sm underline">
                Forgot your password?
              </Link>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <Button variant="outline" className="mt-4 w-full">
          Login with Google
        </Button>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
