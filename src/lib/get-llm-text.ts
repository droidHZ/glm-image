import type { source } from '@/lib/source';
import { getBaseUrl } from '@/lib/urls/urls';
import type { InferPageType } from 'fumadocs-core/source';

/**
 * Get the raw Markdown/MDX content of page for AI agents
 * https://www.fumadocs.dev/docs/integrations/llms#docs-for-llm
 */
export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');
  const fullUrl = `${getBaseUrl()}${page.url}`;

  return `# ${page.data.title} (${fullUrl})

${processed}`;
}
