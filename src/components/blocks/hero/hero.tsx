import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { HeroImageGenerator } from './hero-image-generator';

export default function HeroSection() {
  const t = useTranslations('HomePage.hero');
  const linkIntroduction = '/#how-it-works';
  const linkPrimary = '/#pricing';
  const linkSecondary = '/#faqs';

  return (
    <>
      <main id="hero" className="overflow-hidden">
        {/* background, light shadows on top of the hero section */}
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
        >
          <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>

        <section>
          <div className="relative pt-12">
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                {/* introduction */}
                <LocaleLink
                  href={linkIntroduction}
                  className="hover:bg-accent group mx-auto flex w-fit items-center gap-2 rounded-full border p-1 pl-4"
                >
                  <span className="text-foreground text-sm">
                    {t('introduction')}
                  </span>

                  <div className="size-6 overflow-hidden rounded-full duration-500">
                    <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                      <span className="flex size-6">
                        <ArrowRight className="m-auto size-3" />
                      </span>
                      <span className="flex size-6">
                        <ArrowRight className="m-auto size-3" />
                      </span>
                    </div>
                  </div>
                </LocaleLink>

                {/* title */}
                <h1 className="mt-8 text-balance text-5xl font-bricolage-grotesque lg:mt-16 xl:text-[5rem]">
                  {t('title')}
                </h1>

                {/* description */}
                <p className="mx-auto mt-8 max-w-4xl text-balance text-lg text-muted-foreground">
                  {t('description')}
                </p>

                {/* action buttons */}
                <div className="mt-12 flex flex-row items-center justify-center gap-4">
                  <div className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5">
                    <Button
                      asChild
                      size="lg"
                      className="rounded-xl px-5 text-base"
                    >
                      <LocaleLink href={linkPrimary}>
                        <span className="text-nowrap">{t('primary')}</span>
                      </LocaleLink>
                    </Button>
                  </div>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-10.5 rounded-xl px-5"
                  >
                    <LocaleLink href={linkSecondary}>
                      <span className="text-nowrap">{t('secondary')}</span>
                    </LocaleLink>
                  </Button>
                </div>
              </div>
            </div>

            {/* Hero Image Generator */}
            <div className="relative mt-8 px-2 sm:mt-12 md:mt-20">
              <HeroImageGenerator />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
