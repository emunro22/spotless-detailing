import { getAllSettings } from '@/lib/queries';
import SettingsForm from '@/components/admin/SettingsForm';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const settings = await getAllSettings();
  return (
    <div className="max-w-3xl">
      <div className="mb-6 md:mb-8">
        <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-2">
          Settings
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
          Site settings
        </h1>
        <p className="mt-2 md:mt-3 text-sm md:text-base text-cream/60">
          Hero cover image, hero stats and business contact info.
        </p>
      </div>
      <SettingsForm initial={settings} />
    </div>
  );
}