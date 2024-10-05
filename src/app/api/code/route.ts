// app/api/code/route.ts
import { NextResponse } from 'next/server';

// Import all your UI components here
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// ... import other components as needed

const componentMap: Record<string, string> = {
  button: Button.toString(),
  input: Input.toString(),
  // Add other components here
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json(
      { error: 'Filename is required' },
      { status: 400 },
    );
  }

  const componentName = filename.replace('.tsx', '');
  const code = componentMap[componentName];

  if (code) {
    return NextResponse.json({ code });
  } else {
    return NextResponse.json({ error: 'Component not found' }, { status: 404 });
  }
}
