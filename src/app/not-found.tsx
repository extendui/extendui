import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
            <p className="text-4xl font-bold mb-4">404 Not Found</p>
            <p className="text-lg mb-4">Could not find requested resource</p>
            <Link href="/">
                <Button>Return Home</Button>
            </Link>
        </div>
    )
}