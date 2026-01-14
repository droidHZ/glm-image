import { HeaderSection } from '@/components/layout/header-section';
import {
	BarChartIcon,
	BookOpenIcon,
	BriefcaseIcon,
	FlaskConicalIcon,
	LayoutTemplateIcon,
	NetworkIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function UseCasesSection() {
	const t = useTranslations('HomePage.usecases');

	const useCases = [
		{
			id: 'item-1',
			icon: BarChartIcon,
			title: t('items.item-1.title'),
			description: t('items.item-1.description'),
		},
		{
			id: 'item-2',
			icon: NetworkIcon,
			title: t('items.item-2.title'),
			description: t('items.item-2.description'),
		},
		{
			id: 'item-3',
			icon: BookOpenIcon,
			title: t('items.item-3.title'),
			description: t('items.item-3.description'),
		},
		{
			id: 'item-4',
			icon: LayoutTemplateIcon,
			title: t('items.item-4.title'),
			description: t('items.item-4.description'),
		},
		{
			id: 'item-5',
			icon: BriefcaseIcon,
			title: t('items.item-5.title'),
			description: t('items.item-5.description'),
		},
		{
			id: 'item-6',
			icon: FlaskConicalIcon,
			title: t('items.item-6.title'),
			description: t('items.item-6.description'),
		},
	];

	return (
		<section id="use-cases" className="px-4 py-16">
			<div className="mx-auto max-w-6xl space-y-8 lg:space-y-20">
				<HeaderSection
					title={t('title')}
					subtitle={t('subtitle')}
					subtitleAs="h2"
					description={t('description')}
					descriptionAs="p"
				/>

				<div className="relative mx-auto grid divide-x divide-y border *:p-8 sm:grid-cols-2 lg:grid-cols-3">
					{useCases.map((useCase) => {
						const Icon = useCase.icon;
						return (
							<div key={useCase.id} className="space-y-2">
								<div className="flex items-center gap-2">
									<Icon className="size-4" />
									<h3 className="text-base font-medium">{useCase.title}</h3>
								</div>
								<p className="text-sm text-muted-foreground mt-4">
									{useCase.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
