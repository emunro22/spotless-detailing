import { NextResponse } from 'next/server';
import { getAllServicesAdmin, createService, type ServiceInput } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(await getAllServicesAdmin());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data: ServiceInput = {
      slug: body.slug,
      name: body.name,
      shortName: body.shortName,
      tagline: body.tagline,
      description: body.description,
      startingPrice: Number(body.startingPrice) || 0,
      priceLabel: body.priceLabel || null,
      duration: body.duration || '',
      interior: Array.isArray(body.interior) ? body.interior : [],
      exterior: Array.isArray(body.exterior) ? body.exterior : [],
      popular: !!body.popular,
      showOnHomepage: !!body.showOnHomepage,
      homepageTag: body.homepageTag || null,
      isMaintenanceCallout: !!body.isMaintenanceCallout,
      sortOrder: Number(body.sortOrder) || 0,
      homepageSortOrder: Number(body.homepageSortOrder) || 0,
      isActive: body.isActive !== false,
    };
    const created = await createService(data);
    return NextResponse.json(created, { status: 201 });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Create failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
