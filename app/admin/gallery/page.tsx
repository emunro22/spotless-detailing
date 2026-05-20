import { getAllGalleryImages } from '@/lib/queries';
import GalleryManager from '@/components/admin/GalleryManager';

export const dynamic = 'force-dynamic';

export default async function GalleryAdminPage() {
  const images = await getAllGalleryImages();

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-[0.22em] text-cyan font-medium mb-2">
          Gallery
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
          Manage gallery
        </h1>
        <p className="mt-3 text-cream/60">
          Upload, reorder, rename and remove gallery images. Images marked
          &ldquo;Show on homepage&rdquo; appear in the preview grid; all images appear
          on the full <code className="text-cyan text-xs">/gallery</code> page.
        </p>
      </div>
      <GalleryManager initialImages={images} />
    </div>
  );
}
