import { NextResponse } from 'next/server';
import {
  getAllCleaningServicesAdmin,
  createCleaningService,
  type CleaningServiceInput,
} from '@/lib/queries';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(await getAllCleaningServicesAdmin());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data: CleaningServiceInput = {
      slug: body.slug,
      name: body.name,
      shortName: body.shortName,
      tagline: body.tagline,
      description: body.description,
      features: Array.isArray(body.features) ? body.features : [],
      bestFor: body.bestFor,
      sortOrder: Number(body.sortOrder) || 0,
      isActive: body.isActive !== false,
    };
    const created = await createCleaningService(data);
    return NextResponse.json(created, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Create failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
