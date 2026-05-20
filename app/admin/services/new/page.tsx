import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ServiceForm from '@/components/admin/ServiceForm';

export default function NewServicePage() {
  return (
    <div className="max-w-4xl">
      <Link
        href="/admin/services"
        className="inline-flex items-center gap-2 text-sm text-cream/60 hover:text-cyan mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to services
      </Link>
      <div className="mb-6 md:mb-8">
        <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-2">
          New service
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
          Create a service
        </h1>
      </div>
      <ServiceForm />
    </div>
  );
}