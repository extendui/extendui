import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col items-start justify-start text-left">
      <div className=" ">
        <p className="text-3xl font-semibold tracking-tight">
          Welcome to Extend UI
        </p>
        <p className="text-xl font-normal tracking-tight text-slate-400">
          Extend UI is a collection of React components that can be used in any
          project that uses shadcn.
        </p>
        <div className="mt-4">
          <Link href="/components/button" passHref>
            <Button variant={"default"}>Get started</Button>
          </Link>
          <Link
            href="https://github.com/extendui/extendui"
            passHref
            target="_blank"
          >
            <Button variant={"link"} className="ml-2">
              GitHub
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
