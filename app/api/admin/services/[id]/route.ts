import { NextResponse } from 'next/server';
import {
  getServiceById,
  updateService,
  deleteService,
  type ServiceInput,
} from '@/lib/queries';

export const dynamic = 'force-dynamic';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await getServiceById(Number(id));
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(service);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
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
      interior: Array.isArray(body.interior) ? body.interior : null,
      exterior: Array.isArray(body.exterior) ? body.exterior : [],
      popular: !!body.popular,
      showOnHomepage: !!body.showOnHomepage,
      homepageTag: body.homepageTag || null,
      isMaintenanceCallout: !!body.isMaintenanceCallout,
      sortOrder: Number(body.sortOrder) || 0,
      homepageSortOrder: Number(body.homepageSortOrder) || 0,
      isActive: body.isActive !== false,
    };
    const updated = await updateService(Number(id), data);
    return NextResponse.json(updated);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Update failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await deleteService(Number(id));
  return NextResponse.json({ ok: true });
}
