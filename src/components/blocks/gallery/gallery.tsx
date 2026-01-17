'use client';

import { HeaderSection } from '@/components/layout/header-section';
import { cn } from '@/lib/utils';
import { usePromptStore } from '@/stores/prompt-store';
import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { galleryPrompts } from './gallery-data';

export default function GallerySection() {
  const t = useTranslations('HomePage.gallery');
  const { setPrompt } = usePromptStore();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleGalleryClick = (id: number, prompt: string) => {
    setSelectedId(id);
    setPrompt(prompt);

    // Scroll to hero section smoothly
    const heroElement = document.getElementById('hero');
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="gallery" className="px-4 py-16">
      <div className="mx-auto max-w-7xl px-6 space-y-8 md:space-y-16">
        <HeaderSection
          title={t('title')}
          subtitle={t('subtitle')}
          subtitleAs="h2"
          description={t('description')}
          descriptionAs="p"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryPrompts.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleGalleryClick(item.id, item.prompt)}
              className={cn(
                'group relative overflow-hidden rounded-2xl border-2 transition-all duration-300',
                'hover:border-green-500 hover:shadow-lg hover:scale-105',
                'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
                selectedId === item.id
                  ? 'border-green-500 shadow-lg'
                  : 'border-muted'
              )}
            >
              {/* Image Container */}
              <div className="aspect-[3/4] relative bg-muted/50">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Selected indicator */}
              {selectedId === item.id && (
                <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1.5">
                  <Sparkles className="size-4" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
