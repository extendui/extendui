import { Button } from '@/components/extendui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export default function CookieBanner() {
  return (
    <div className="absolute bottom-0 right-0 px-6 pb-6">
      <Card className="max-w-md rounded-xl border bg-white p-6">
        <CardContent className="p-0 text-sm text-gray-900">
          We use cookies to ensure you get the best experience on our website.
        </CardContent>
        <CardFooter className="mt-2 flex items-center gap-2 p-0">
          <Button size={'sm'}>Accept</Button>
          <Button size={'sm'} variant={'outline'}>
            Decline
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
