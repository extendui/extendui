
type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function Layout({ sidebar, children }: Props) {
  return (
    <div className="container mx-auto flex pt-16">
      {/* Sidebar */}
      <aside className="sticky top-16 hidden h-[calc(100vh-5rem)] self-start overflow-y-auto pb-5 xl:w-1/5 2xl:block">
        {sidebar}
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-4 mb-9 flex flex-col space-y-2 rounded-xl bg-white  p-8 px-4 pt-6 shadow-md shadow-slate-400 dark:bg-zinc-800 dark:shadow-none">
          {children}
        </div>
      </main>
    </div>
  );
}
