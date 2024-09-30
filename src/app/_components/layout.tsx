type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;

};

export default function Layout({ sidebar, children }: Props) {
  return (
    <div className="container mx-auto flex pt-24">
      <aside className="sticky top-24 hidden h-[calc(100vh-5rem)] self-start overflow-y-auto mb-8 pl-5 xl:block xl:w-1/5">
        {sidebar}
      </aside>
      <main className="mx-4 mb-4 flex-1">{children}</main>
    </div>
  );
}
