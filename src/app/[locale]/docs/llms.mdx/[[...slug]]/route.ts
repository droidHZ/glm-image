import { getLLMText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';
import { notFound } from 'next/navigation';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug?: string[]; locale: string }> }
) {
  const { slug, locale } = await params;
  const language = locale as string;
  const page = source.getPage(slug, language);
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown',
    },
  });
}

export async function generateStaticParams() {
  const slugParams = source.generateParams();
  const { LOCALES } = await import('@/i18n/routing');

  return LOCALES.flatMap((locale) =>
    slugParams.map((param) => ({
      locale,
      slug: param.slug,
    }))
  );
}

