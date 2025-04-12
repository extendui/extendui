'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { RotateCcw, Send } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { type z } from 'zod';

import { sendEmail } from '@/app/actions/send-email';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ContactFormSchema } from '@/lib/schemas';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

type Inputs = z.infer<typeof ContactFormSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });
  const processForm: SubmitHandler<Inputs> = async (data) => {
    try {
      const result = await sendEmail(data);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success('Message sent successfully!');
      reset();
    } catch (err) {
      console.error(err);
      toast.error('Failed to send message. Please try again.');
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(processForm)}>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="h-16">
          <Input
            id="name"
            type="text"
            placeholder="Name"
            autoComplete="name"
            {...register('name')}
          />
          {errors.name?.message && (
            <p className="input-error">{errors.name.message}</p>
          )}
        </div>
        <div className="h-16">
          <Input
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register('email')}
          />

          {errors.email?.message && (
            <p className="input-error">{errors.email.message}</p>
          )}
        </div>
        <div className="h-32 sm:col-span-2">
          <Textarea
            rows={4}
            placeholder="How can we help?"
            autoComplete="Message"
            className="resize-none"
            {...register('message')}
          />

          {errors.message?.message && (
            <p className="input-error">{errors.message.message}</p>
          )}
        </div>
      </div>
      <div className="mt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <span>Sending...</span>
              <RotateCcw className="ml-2 animate-spin" />
            </div>
          ) : (
            <div className="flex items-center">
              <span>Send Message</span>
              <Send className="ml-2" />
            </div>
          )}
        </Button>
        <p className="text-muted-foreground mt-4 text-xs">
          By submitting this form, I agree to the{' '}
          <Popover>
            <PopoverTrigger> privacy&nbsp;policy.</PopoverTrigger>
            <PopoverContent>
              When you contact us by email or through our contact form, you
              decide what information to share. We&apos;ll only use it to
              respond and engage in conversation—no gimmicks, just genuine
              communication.
            </PopoverContent>
          </Popover>
        </p>
      </div>
    </form>
  );
}
