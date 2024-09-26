import PreviewTabs from './_components/preview-tabs';

export default function ComponentPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className="flex flex-col space-y-2 rounded-md bg-white p-8 px-4 pt-6 dark:bg-zinc-800">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-start text-left">
        <p className="text-2xl font-semibold tracking-tight">Button</p>
        <p className="font-tight text-lg tracking-tight text-slate-400">
          Displays a button or a component that looks like a button.
        </p>
        <div className="mt-4 w-full">
          <PreviewTabs
            component={undefined}
            settingsEngine={undefined}
            data={undefined}
          />
        </div>
      </div>
    </div>
  );
}
