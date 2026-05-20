'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Upload, Trash2, Loader2 } from 'lucide-react';
import type { GalleryImage } from '@/lib/types';

export default function GalleryManager({
  initialImages,
}: {
  initialImages: GalleryImage[];
}) {
  const router = useRouter();
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError('');

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);

        const uploadRes = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });
        if (!uploadRes.ok) {
          const data = await uploadRes.json().catch(() => ({}));
          throw new Error(data.error || `Upload of ${file.name} failed`);
        }
        const { url } = await uploadRes.json();

        const addRes = await fetch('/api/admin/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url,
            alt: file.name.replace(/\.[^.]+$/, ''),
            tall: false,
            sortOrder: (images.length + 1) * 10,
            showInPreview: true,
          }),
        });
        if (!addRes.ok) throw new Error('Adding image to DB failed');
        const newImage: GalleryImage = await addRes.json();
        setImages((prev) => [...prev, newImage]);
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
      router.refresh();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Upload failed';
      setError(message);
    } finally {
      setUploading(false);
    }
  }

  async function updateImage(id: number, patch: Partial<GalleryImage>) {
    const optimistic = images.map((img) => (img.id === id ? { ...img, ...patch } : img));
    setImages(optimistic);

    const res = await fetch(`/api/admin/gallery/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    if (!res.ok) {
      setError('Update failed');
      setImages(initialImages);
      return;
    }
    const updated: GalleryImage = await res.json();
    setImages((prev) => prev.map((img) => (img.id === id ? updated : img)));
    router.refresh();
  }

  async function deleteImage(id: number) {
    if (!confirm('Delete this image? This cannot be undone.')) return;
    const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      setError('Delete failed');
      return;
    }
    setImages((prev) => prev.filter((img) => img.id !== id));
    router.refresh();
  }

  return (
    <div className="space-y-6">
      {/* Upload box */}
      <div className="glass border-gradient rounded-2xl p-6">
        <label className="block mb-3">
          <span className="block text-xs uppercase tracking-[0.16em] text-cream/60 mb-2">
            Upload new images
          </span>
          <span className="text-xs text-cream/50 block mb-3">
            JPG or PNG. Stored in Vercel Blob. Multiple files supported.
          </span>
        </label>
        <label
          className={`flex items-center justify-center gap-3 border-2 border-dashed rounded-xl px-6 py-10 cursor-pointer transition-colors ${
            uploading
              ? 'border-cyan/40 bg-cyan/5'
              : 'border-cream/15 hover:border-cyan/40 hover:bg-cyan/5'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            disabled={uploading}
            className="hidden"
          />
          {uploading ? (
            <>
              <Loader2 className="w-5 h-5 text-cyan animate-spin" />
              <span className="text-sm text-cyan">Uploading…</span>
            </>
          ) : (
            <>
              <Upload className="w-5 h-5 text-cream/60" />
              <span className="text-sm text-cream/70">
                Click to select images, or drag and drop here
              </span>
            </>
          )}
        </label>
        {error && (
          <p className="mt-3 text-sm text-red-400 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
            {error}
          </p>
        )}
      </div>

      {/* Image grid */}
      {images.length === 0 ? (
        <div className="glass border-gradient rounded-2xl p-12 text-center">
          <p className="text-cream/50">No images yet. Upload some above.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="glass border-gradient rounded-2xl overflow-hidden"
            >
              <div className="relative aspect-[4/3] bg-midnight-700">
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-3">
                <label className="block">
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-cream/50 mb-1">
                    Alt text
                  </span>
                  <input
                    type="text"
                    value={img.alt}
                    onChange={(e) =>
                      setImages((prev) =>
                        prev.map((i) => (i.id === img.id ? { ...i, alt: e.target.value } : i))
                      )
                    }
                    onBlur={(e) => updateImage(img.id, { alt: e.target.value })}
                    className="w-full bg-midnight-900 border border-cream/10 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-cyan/40"
                  />
                </label>

                <div className="flex items-center gap-3 flex-wrap text-xs">
                  <label className="flex items-center gap-1.5 text-cream/70">
                    <span>Order:</span>
                    <input
                      type="number"
                      value={img.sortOrder}
                      onChange={(e) =>
                        setImages((prev) =>
                          prev.map((i) =>
                            i.id === img.id ? { ...i, sortOrder: Number(e.target.value) } : i
                          )
                        )
                      }
                      onBlur={(e) =>
                        updateImage(img.id, { sortOrder: Number(e.target.value) })
                      }
                      className="w-16 bg-midnight-900 border border-cream/10 rounded px-2 py-1 text-xs focus:outline-none focus:border-cyan/40"
                    />
                  </label>

                  <label className="flex items-center gap-1.5 text-cream/70 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={img.tall}
                      onChange={(e) => updateImage(img.id, { tall: e.target.checked })}
                      className="accent-cyan"
                    />
                    Tall
                  </label>

                  <label className="flex items-center gap-1.5 text-cream/70 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={img.showInPreview}
                      onChange={(e) =>
                        updateImage(img.id, { showInPreview: e.target.checked })
                      }
                      className="accent-cyan"
                    />
                    Homepage
                  </label>

                  <button
                    onClick={() => deleteImage(img.id)}
                    className="ml-auto inline-flex items-center gap-1 text-red-400 hover:text-red-300"
                    aria-label="Delete image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
