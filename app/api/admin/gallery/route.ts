import { NextResponse } from 'next/server';
import { getAllGalleryImages, addGalleryImage } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(await getAllGalleryImages());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.url) {
      return NextResponse.json({ error: 'url is required' }, { status: 400 });
    }
    const created = await addGalleryImage({
      url: body.url,
      alt: body.alt || '',
      tall: !!body.tall,
      sortOrder: Number(body.sortOrder) || 0,
      showInPreview: body.showInPreview !== false,
    });
    return NextResponse.json(created, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Create failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
