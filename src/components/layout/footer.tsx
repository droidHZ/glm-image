'use client';

import Container from '@/components/layout/container';
import { Logo } from '@/components/layout/logo';
import { ModeSwitcherHorizontal } from '@/components/layout/mode-switcher-horizontal';
import { useFooterLinks } from '@/config/footer-config';
import { useSocialLinks } from '@/config/social-config';
import { LocaleLink } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import type React from 'react';

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations();
  const footerLinks = useFooterLinks();
  const socialLinks = useSocialLinks();

  return (
    <footer className={cn('border-t', className)}>
      <Container className="px-4">
        <div className="grid grid-cols-2 gap-8 py-16 md:grid-cols-6">
          <div className="flex flex-col items-start col-span-full md:col-span-2">
            <div className="space-y-4">
              {/* logo and name */}
              <div className="items-center space-x-2 flex">
                <Logo />
                <span className="text-xl font-semibold">
                  {t('Metadata.name')}
                </span>
              </div>

              {/* tagline */}
              <p className="text-muted-foreground text-base py-2 md:pr-12">
                {t('Marketing.footer.tagline')}
              </p>

              {/* social links */}
              <div className="flex items-center gap-4 py-2">
                <div className="flex items-center gap-2">
                  {socialLinks?.map((link) => (
                    <a
                      key={link.title}
                      href={link.href || '#'}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.title}
                      className="border border-border inline-flex h-8 w-8 items-center
                          justify-center rounded-full hover:bg-accent hover:text-accent-foreground"
                    >
                      <span className="sr-only">{link.title}</span>
                      {link.icon ? link.icon : null}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* footer links */}
          {footerLinks?.map((section) => (
            <div
              key={section.title}
              className="col-span-1 md:col-span-1 items-start"
            >
              <span className="text-sm font-semibold uppercase">
                {section.title}
              </span>
              <ul className="mt-4 list-inside space-y-3">
                {section.items?.map(
                  (item) =>
                    item.href && (
                      <li key={item.title}>
                        <LocaleLink
                          href={item.href || '#'}
                          target={item.external ? '_blank' : undefined}
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          {item.title}
                        </LocaleLink>
                      </li>
                    )
                )}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      {/* Embed links and badges */}
      <div className="border-t py-8">
        <Container className="px-4">
          <div className="flex flex-nowrap items-center justify-center gap-3 overflow-x-auto">
            <a
              href="https://backlinkdirs.com/item/glm-image-ai-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary whitespace-nowrap"
            >
              Backlink Dirs
            </a>

            <a
              href="https://toolfame.com/item/glm-image-ai-generator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://toolfame.com/badge-light.svg"
                alt="Featured on toolfame.com"
                className="h-8 w-auto"
              />
            </a>

            <a
              href="https://twelve.tools"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://twelve.tools/badge0-dark.svg"
                alt="Featured on Twelve Tools"
                className="h-8 w-auto"
              />
            </a>

            <a
              href="https://fazier.com/launches/glm-image.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=light"
                alt="Fazier badge"
                className="h-8 w-auto"
              />
            </a>

            <a
              href="https://startupfa.me/s/glm-image?utm_source=glm-image.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://startupfa.me/badges/featured-badge.webp"
                alt="Featured on Startup Fame"
                className="h-8 w-auto"
              />
            </a>

            <a
              href="https://turbo0.com/item/glm-image-ai-generator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.turbo0.com/badge-listed-light.svg"
                alt="Listed on Turbo0"
                className="h-8 w-auto"
              />
            </a>

            <a
              href="https://launchigniter.com/product/glm-image-ai-generator?ref=badge-glm-image-ai-generator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://launchigniter.com/api/badge/glm-image-ai-generator?theme=light"
                alt="Featured on LaunchIgniter"
                className="h-8 w-auto"
              />
            </a>
          </div>
        </Container>
      </div>

      <div className="border-t py-8">
        <Container className="px-4 flex items-center justify-between gap-x-4">
          <span className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} {t('Metadata.name')} All Rights
            Reserved.
          </span>

          <div className="flex items-center gap-x-4">
            <ModeSwitcherHorizontal />
          </div>
        </Container>
      </div>
    </footer>
  );
}
