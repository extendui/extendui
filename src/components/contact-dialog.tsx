import { Button } from '@/components/extendui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import ContactForm from './contact-form';

export default function ContactDialog({
  featured,
}: {
  featured: boolean | undefined;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={featured ? 'secondary' : 'outline'}
          className={`w-full ${featured ? 'bg-neutral-200 text-black dark:bg-neutral-200 dark:hover:bg-neutral-100' : ''}`}
        >
          Contact Us
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send us a message</DialogTitle>
          <DialogDescription>We&apos;ll get back to you soon</DialogDescription>
        </DialogHeader>
        <ContactForm />
      </DialogContent>
    </Dialog>
  );
}
