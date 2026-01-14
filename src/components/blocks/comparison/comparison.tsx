import { HeaderSection } from '@/components/layout/header-section';
import { Check, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ComparisonSection() {
  const t = useTranslations('HomePage.comparison');

  const comparisonItems = [
    {
      id: 'item-1',
      feature: t('items.item-1.feature'),
      glmImage: t('items.item-1.glmImage'),
      typical: t('items.item-1.typical'),
    },
    {
      id: 'item-2',
      feature: t('items.item-2.feature'),
      glmImage: t('items.item-2.glmImage'),
      typical: t('items.item-2.typical'),
    },
    {
      id: 'item-3',
      feature: t('items.item-3.feature'),
      glmImage: t('items.item-3.glmImage'),
      typical: t('items.item-3.typical'),
    },
    {
      id: 'item-4',
      feature: t('items.item-4.feature'),
      glmImage: t('items.item-4.glmImage'),
      typical: t('items.item-4.typical'),
    },
    {
      id: 'item-5',
      feature: t('items.item-5.feature'),
      glmImage: t('items.item-5.glmImage'),
      typical: t('items.item-5.typical'),
    },
  ];

  return (
    <section id="comparison" className="px-4 py-16 bg-muted/30">
      <div className="mx-auto max-w-5xl">
        <HeaderSection
          title={t('title')}
          titleAs="h2"
          subtitle={t('subtitle')}
          subtitleAs="p"
          description={t('description')}
          descriptionAs="p"
        />

        <div className="mt-12 overflow-hidden rounded-2xl border shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    {t('headers.feature')}
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    {t('headers.glmImage')}
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    {t('headers.typical')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {comparisonItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium">
                      {item.feature}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-green-600 dark:text-green-400 font-medium">
                      {item.glmImage}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                      {item.typical}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
