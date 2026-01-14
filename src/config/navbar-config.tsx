'use client';

import { Routes } from '@/routes';
import type { NestedMenuItem } from '@/types';
import {
  AudioLinesIcon,
  BuildingIcon,
  ChartNoAxesCombinedIcon,
  CircleDollarSignIcon,
  CircleHelpIcon,
  ComponentIcon,
  CookieIcon,
  FileTextIcon,
  FilmIcon,
  FlameIcon,
  FootprintsIcon,
  ImageIcon,
  ListChecksIcon,
  LockKeyholeIcon,
  LogInIcon,
  MailIcon,
  MailboxIcon,
  MessageCircleIcon,
  NewspaperIcon,
  RocketIcon,
  ShieldCheckIcon,
  SnowflakeIcon,
  SplitSquareVerticalIcon,
  SquareCodeIcon,
  SquareKanbanIcon,
  SquarePenIcon,
  ThumbsUpIcon,
  UserPlusIcon,
  UsersIcon,
  WandSparklesIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { websiteConfig } from './website';

/**
 * Get navbar config with translations
 *
 * NOTICE: used in client components only
 *
 * docs:
 * https://mksaas.com/docs/config/navbar
 *
 * @returns The navbar config with translated titles and descriptions
 */
export function useNavbarLinks(): NestedMenuItem[] {
  const t = useTranslations('Marketing.navbar');

  return [
    {
      title: t('features.title'),
      href: Routes.Features,
      external: false,
    },
    {
      title: t('pricing.title'),
      href: Routes.Pricing,
      external: false,
    },

    // {
    //   title: t('blocks.title'),
    //   items: [
    //     {
    //       title: t('blocks.items.magicui.title'),
    //       icon: <ComponentIcon className="size-4 shrink-0" />,
    //       href: Routes.MagicuiBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.hero-section.title'),
    //       icon: <FlameIcon className="size-4 shrink-0" />,
    //       href: Routes.HeroBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.logo-cloud.title'),
    //       icon: <SquareCodeIcon className="size-4 shrink-0" />,
    //       href: Routes.LogoCloudBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.features.title'),
    //       icon: <WandSparklesIcon className="size-4 shrink-0" />,
    //       href: Routes.FeaturesBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.integrations.title'),
    //       icon: <SnowflakeIcon className="size-4 shrink-0" />,
    //       href: Routes.IntegrationsBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.content.title'),
    //       icon: <NewspaperIcon className="size-4 shrink-0" />,
    //       href: Routes.ContentBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.stats.title'),
    //       icon: <ChartNoAxesCombinedIcon className="size-4 shrink-0" />,
    //       href: Routes.StatsBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.team.title'),
    //       icon: <UsersIcon className="size-4 shrink-0" />,
    //       href: Routes.TeamBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.testimonials.title'),
    //       icon: <ThumbsUpIcon className="size-4 shrink-0" />,
    //       href: Routes.TestimonialsBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.callToAction.title'),
    //       icon: <RocketIcon className="size-4 shrink-0" />,
    //       href: Routes.CallToActionBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.footer.title'),
    //       icon: <FootprintsIcon className="size-4 shrink-0" />,
    //       href: Routes.FooterBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.pricing.title'),
    //       icon: <CircleDollarSignIcon className="size-4 shrink-0" />,
    //       href: Routes.PricingBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.comparator.title'),
    //       icon: <SplitSquareVerticalIcon className="size-4 shrink-0" />,
    //       href: Routes.ComparatorBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.faq.title'),
    //       icon: <CircleHelpIcon className="size-4 shrink-0" />,
    //       href: Routes.FAQBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.login.title'),
    //       icon: <LogInIcon className="size-4 shrink-0" />,
    //       href: Routes.LoginBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.signup.title'),
    //       icon: <UserPlusIcon className="size-4 shrink-0" />,
    //       href: Routes.SignupBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.forgot-password.title'),
    //       icon: <LockKeyholeIcon className="size-4 shrink-0" />,
    //       href: Routes.ForgotPasswordBlocks,
    //       external: false,
    //     },
    //     {
    //       title: t('blocks.items.contact.title'),
    //       icon: <MailIcon className="size-4 shrink-0" />,
    //       href: Routes.ContactBlocks,
    //       external: false,
    //     },
    //   ],
    // },
  ];
}
