import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export default function EmailTemplate({
  name,
  email,
  message,
}: EmailTemplateProps) {
  return (
    <div>
      <h1>New Contact Form Submission from Extend UI</h1>
      <div>From: {name}</div>
      <div>Email: {email}</div>
      <div>Message:</div>
      <div>{message}</div>
      <hr />
      <div>This message was sent from the Extend UI contact form.</div>
    </div>
  );
}
