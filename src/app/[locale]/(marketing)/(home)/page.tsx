import CallToActionSection from '@/components/blocks/calltoaction/calltoaction';
import ComparisonSection from '@/components/blocks/comparison/comparison';
import DisclaimerSection from '@/components/blocks/disclaimer/disclaimer';
import FaqSection from '@/components/blocks/faqs/faqs';
import FeaturesSection from '@/components/blocks/features/features';
import Features2Section from '@/components/blocks/features/features2';
import Features3Section from '@/components/blocks/features/features3';
import GallerySection from '@/components/blocks/gallery/gallery';
import HeroSection from '@/components/blocks/hero/hero';
import HowItWorksSection from '@/components/blocks/howitworks/howitworks';
import PricingSection from '@/components/blocks/pricing/pricing';
import StatsSection from '@/components/blocks/stats/stats';
import CrispChat from '@/components/layout/crisp-chat';
import { constructMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

/**
 * https://next-intl.dev/docs/environments/actions-metadata-route-handlers#metadata-api
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    pathname: '',
  });
}

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage(props: HomePageProps) {
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations('HomePage');

  return (
    <>
      <div className="flex flex-col">
        <HeroSection />

        <GallerySection />

        <StatsSection />

        <Features3Section />

        <FeaturesSection />

        <Features2Section />

        <HowItWorksSection />

        <ComparisonSection />

        <PricingSection />

        <FaqSection />

        <CallToActionSection />

        <DisclaimerSection />

        <CrispChat />
      </div>
    </>
  );
}
