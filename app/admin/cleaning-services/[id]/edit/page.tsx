import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getCleaningServiceById } from '@/lib/queries';
import CleaningServiceForm from '@/components/admin/CleaningServiceForm';

export const dynamic = 'force-dynamic';

export default async function EditCleaningServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getCleaningServiceById(Number(id));
  if (!service) notFound();

  return (
    <div className="max-w-4xl">
      <Link
        href="/admin/cleaning-services"
        className="inline-flex items-center gap-2 text-sm text-cream/60 hover:text-cyan mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to cleaning services
      </Link>
      <div className="mb-6 md:mb-8">
        <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-2">
          Edit cleaning service
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight truncate">
          {service.name}
        </h1>
        <p className="mt-2 text-cream/60 text-sm">/{service.slug}</p>
      </div>
      <CleaningServiceForm service={service} />
    </div>
  );
}
