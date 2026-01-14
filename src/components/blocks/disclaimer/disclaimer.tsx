import { AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function DisclaimerSection() {
  const t = useTranslations('HomePage.disclaimer');

  return (
    <section id="disclaimer" className="px-4 py-16 bg-muted/50">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border bg-card p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <AlertCircle className="size-6 text-amber-500" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">{t('title')}</h2>
              <p className="text-sm text-muted-foreground mb-4">{t('subtitle')}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t('description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
