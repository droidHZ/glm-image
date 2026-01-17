'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { websiteConfig } from '@/config/website';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useMounted } from '@/hooks/use-mounted';
import { useLocalePathname } from '@/i18n/navigation';
import { formatPrice } from '@/lib/formatter';
import { cn } from '@/lib/utils';
import { CheckCircleIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { LoginWrapper } from '../auth/login-wrapper';
import { CheckoutButton } from './create-checkout-button';

interface PricingTableProps {
  metadata?: Record<string, string>;
  className?: string;
}

type PricingMode = 'payAsYouGo' | 'monthly' | 'yearly';

/**
 * Pricing Table Component with Tab-based Layout
 * Shows Pay as You Go, Monthly, and Yearly options
 * Each option displays 3 pricing cards
 */
export function PricingTable({ metadata, className }: PricingTableProps) {
  const t = useTranslations('PricingPage');
  const [mode, setMode] = useState<PricingMode>('payAsYouGo');
  const currentUser = useCurrentUser();
  const currentPath = useLocalePathname();
  const mounted = useMounted();

  const creditPackages = websiteConfig.credits.packages;

  // Define pricing data for each mode
  const pricingData = {
    payAsYouGo: [
      {
        id: 'basic',
        name: t('packages.basic.name'),
        price: 1900,
        currency: 'USD',
        credits: 1000,
        images: 100,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CREDITS_BASIC!,
        features: [
          t('packages.basic.feature1'),
          t('packages.basic.feature2'),
          t('packages.basic.feature3'),
        ],
        popular: false,
      },
      {
        id: 'standard',
        name: t('packages.standard.name'),
        price: 7900,
        currency: 'USD',
        credits: 5000,
        images: 500,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CREDITS_STANDARD!,
        features: [
          t('packages.standard.feature1'),
          t('packages.standard.feature2'),
          t('packages.standard.feature3'),
        ],
        popular: true,
      },
      {
        id: 'premium',
        name: t('packages.premium.name'),
        price: 29900,
        currency: 'USD',
        credits: 20000,
        images: 2000,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CREDITS_PREMIUM!,
        features: [
          t('packages.premium.feature1'),
          t('packages.premium.feature2'),
          t('packages.premium.feature3'),
        ],
        popular: false,
      },
    ],
    monthly: [
      {
        id: 'basic',
        name: t('monthly.basic.name'),
        price: 990,
        currency: 'USD',
        credits: 500,
        images: 50,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_BASIC!,
        features: [
          t('monthly.basic.feature1'),
          t('monthly.basic.feature2'),
          t('monthly.basic.feature3'),
        ],
        popular: false,
      },
      {
        id: 'standard',
        name: t('monthly.standard.name'),
        price: 3900,
        currency: 'USD',
        credits: 2500,
        images: 250,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_STANDARD!,
        features: [
          t('monthly.standard.feature1'),
          t('monthly.standard.feature2'),
          t('monthly.standard.feature3'),
        ],
        popular: true,
      },
      {
        id: 'pro',
        name: t('monthly.pro.name'),
        price: 6900,
        currency: 'USD',
        credits: 5000,
        images: 500,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY_PRO!,
        features: [
          t('monthly.pro.feature1'),
          t('monthly.pro.feature2'),
          t('monthly.pro.feature3'),
        ],
        popular: false,
      },
    ],
    yearly: [
      {
        id: 'basic',
        name: t('yearly.basic.name'),
        price: 9900,
        currency: 'USD',
        credits: 6000,
        monthlyAvg: 8,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_YEARLY_BASIC!,
        features: [
          t('yearly.basic.feature1'),
          t('yearly.basic.feature2'),
          t('yearly.basic.feature3'),
        ],
        popular: false,
      },
      {
        id: 'standard',
        name: t('yearly.standard.name'),
        price: 39900,
        currency: 'USD',
        credits: 30000,
        monthlyAvg: 33,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_YEARLY_STANDARD!,
        features: [
          t('yearly.standard.feature1'),
          t('yearly.standard.feature2'),
          t('yearly.standard.feature3'),
        ],
        popular: true,
      },
      {
        id: 'pro',
        name: t('yearly.pro.name'),
        price: 69900,
        currency: 'USD',
        credits: 60000,
        monthlyAvg: 58,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_YEARLY_PRO!,
        features: [
          t('yearly.pro.feature1'),
          t('yearly.pro.feature2'),
          t('yearly.pro.feature3'),
        ],
        popular: false,
      },
    ],
  };

  const currentPricing = pricingData[mode];

  return (
    <div className={cn('flex flex-col gap-12', className)}>
      {/* Pricing Mode Toggle */}
      <div className="flex justify-center">
        <ToggleGroup
          size="sm"
          type="single"
          value={mode}
          onValueChange={(value) => value && setMode(value as PricingMode)}
          className="border rounded-lg p-1"
        >
          <ToggleGroupItem
            value="payAsYouGo"
            className={cn(
              'px-4 py-2 cursor-pointer text-sm rounded-md',
              'data-[state=on]:bg-primary data-[state=on]:text-primary-foreground'
            )}
          >
            {t('payAsYouGo')}
          </ToggleGroupItem>
          <ToggleGroupItem
            value="monthly"
            className={cn(
              'px-4 py-2 cursor-pointer text-sm rounded-md',
              'data-[state=on]:bg-primary data-[state=on]:text-primary-foreground'
            )}
          >
            {t('monthlyTab')}
          </ToggleGroupItem>
          <ToggleGroupItem
            value="yearly"
            className={cn(
              'px-4 py-2 cursor-pointer text-sm rounded-md',
              'data-[state=on]:bg-primary data-[state=on]:text-primary-foreground'
            )}
          >
            {t('yearlyTab')}
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {currentPricing.map((pkg) => (
          <Card
            key={pkg.id}
            className={cn(
              'flex flex-col h-full',
              pkg.popular && 'relative border-primary shadow-lg'
            )}
          >
            {pkg.popular && (
              <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  {t('PricingCard.popular')}
                </span>
              </div>
            )}

            <CardHeader>
              <CardTitle>
                <h3 className="font-medium text-xl">{pkg.name}</h3>
              </CardTitle>

              <div className="flex items-baseline gap-2 my-4">
                <span className="text-4xl font-semibold">
                  {formatPrice(pkg.price, pkg.currency)}
                </span>
                {mode !== 'payAsYouGo' && (
                  <span className="text-lg text-muted-foreground">
                    /{mode === 'monthly' ? t('month') : t('year')}
                  </span>
                )}
              </div>

              <CardDescription>
                <p className="text-lg font-medium">
                  {pkg.credits.toLocaleString()} {t('credits')}
                </p>
              </CardDescription>

              {mounted && currentUser ? (
                mode === 'payAsYouGo' ? (
                  <CheckoutButton
                    userId={currentUser.id}
                    planId={pkg.id}
                    priceId={pkg.priceId}
                    metadata={metadata}
                    className="mt-4 w-full cursor-pointer"
                  >
                    {t('buyNow')}
                  </CheckoutButton>
                ) : (
                  <CheckoutButton
                    userId={currentUser.id}
                    planId={pkg.id}
                    priceId={pkg.priceId}
                    metadata={metadata}
                    className="mt-4 w-full cursor-pointer"
                  >
                    {t('subscribe')}
                  </CheckoutButton>
                )
              ) : (
                <LoginWrapper mode="modal" asChild callbackUrl={currentPath}>
                  <Button
                    variant="default"
                    className="mt-4 w-full cursor-pointer"
                  >
                    {mode === 'payAsYouGo' ? t('buyNow') : t('subscribe')}
                  </Button>
                </LoginWrapper>
              )}
            </CardHeader>

            <CardContent className="space-y-4">
              <hr className="border-dashed" />

              <ul className="list-outside space-y-3 text-sm">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircleIcon className="size-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
