import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json(
      { error: 'Filename is required' },
      { status: 400 },
    );
  }

  let fileUrl = '';

  if (filename.includes('showcase')) {
    fileUrl = `https://raw.githubusercontent.com/extendui/extendui/main/src/${filename}.tsx`;
  } else {
    fileUrl = `https://raw.githubusercontent.com/extendui/extendui/main/src/components/ui/${filename}.tsx`;
  }

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    const code = await response.text();
    return NextResponse.json({ code });
  } catch (error) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
