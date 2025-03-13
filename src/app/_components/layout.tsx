type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function Layout({ sidebar, children }: Props) {
  return (
    <div className="mx-auto flex max-w-11xl justify-between p-5 pt-8 sm:px-6 lg:px-8">
      <aside className="sticky top-24 mb-8 hidden h-[calc(100vh-5rem)] self-start overflow-y-auto pr-12 md:block md:w-1/3 lg:w-1/4 xl:w-1/5">
        {sidebar}
      </aside>
      <main className="mx-auto mb-4 mt-2 w-full flex-1 md:w-2/3 lg:w-3/4 xl:w-4/5">
        {children}
      </main>
    </div>
  );
}
