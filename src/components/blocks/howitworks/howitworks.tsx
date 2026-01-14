import { HeaderSection } from '@/components/layout/header-section';
import { useTranslations } from 'next-intl';

export default function HowItWorksSection() {
  const t = useTranslations('HomePage.howitworks');

  const steps = [
    {
      id: 'item-1',
      number: '1',
      title: t('items.item-1.title'),
      description: t('items.item-1.description'),
    },
    {
      id: 'item-2',
      number: '2',
      title: t('items.item-2.title'),
      description: t('items.item-2.description'),
    },
    {
      id: 'item-3',
      number: '3',
      title: t('items.item-3.title'),
      description: t('items.item-3.description'),
    },
    {
      id: 'item-4',
      number: '4',
      title: t('items.item-4.title'),
      description: t('items.item-4.description'),
    },
  ];

  return (
    <section id="how-it-works" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <HeaderSection
          title={t('title')}
          titleAs="h2"
          subtitle={t('subtitle')}
          subtitleAs="p"
          description={t('description')}
          descriptionAs="p"
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                {step.number}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
