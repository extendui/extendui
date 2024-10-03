type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function Layout({ sidebar, children }: Props) {
  return (
    <div className="mx-auto flex max-w-11xl items-center justify-between p-5 pt-24 sm:px-6 lg:px-8">
      <aside className="sticky top-24 mb-8 hidden h-[calc(100vh-5rem)] self-start overflow-y-auto pr-12 md:block xl:w-1/5">
        {sidebar}
      </aside>
      <main className="mb-4 flex-1">{children}</main>
    </div>
  );
}
