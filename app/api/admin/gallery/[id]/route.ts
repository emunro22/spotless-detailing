import { NextResponse } from 'next/server';
import { del } from '@vercel/blob';
import { updateGalleryImage, deleteGalleryImage } from '@/lib/queries';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await req.json();
    const patch: Parameters<typeof updateGalleryImage>[1] = {};
    if (body.alt !== undefined) patch.alt = String(body.alt);
    if (body.tall !== undefined) patch.tall = !!body.tall;
    if (body.sortOrder !== undefined) patch.sortOrder = Number(body.sortOrder);
    if (body.showInPreview !== undefined) patch.showInPreview = !!body.showInPreview;
    const updated = await updateGalleryImage(Number(id), patch);
    return NextResponse.json(updated);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Update failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const removed = await deleteGalleryImage(Number(id));

  // If it was a Vercel Blob URL, try to delete the underlying blob too.
  if (removed && removed.url.includes('blob.vercel-storage.com')) {
    try {
      await del(removed.url);
    } catch {
      // Non-fatal — DB row is already gone.
    }
  }

  return NextResponse.json({ ok: true });
}
