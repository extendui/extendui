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
      <p>From: {name}</p>
      <p>Email: {email}</p>
      <h2>Message:</h2>
      <p>{message}</p>
      <hr />
      <p>This message was sent from the Extend UI contact form.</p>
    </div>
  );
}
