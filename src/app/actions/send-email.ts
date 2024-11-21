'use server';

import { type ReactElement } from 'react';
import { Resend } from 'resend';
import { type z } from 'zod';

import EmailTemplate from '@/components/email-template';
import { ContactFormSchema } from '@/lib/schemas';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(data: z.infer<typeof ContactFormSchema>) {
  try {
    const result = ContactFormSchema.safeParse(data);
    if (!result.success) {
      return { error: 'Invalid form data' };
    }

    const { name, email, message } = result.data;

    const { error } = await resend.emails.send({
      from: 'Extend UI <contact@extend-ui.com>',
      to: ['contact@extend-ui.com'],
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      react: EmailTemplate({ name, email, message }) as ReactElement,
    });

    if (error) {
      return { error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: 'Failed to send email' };
  }
}
