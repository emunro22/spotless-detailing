import { NextResponse } from 'next/server';
import { getAllSettings, updateSettings } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(await getAllSettings());
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (typeof body !== 'object' || body === null) {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
    }
    const flat: Record<string, string> = {};
    for (const [key, value] of Object.entries(body)) {
      if (typeof value === 'string') flat[key] = value;
    }
    await updateSettings(flat);
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Save failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
