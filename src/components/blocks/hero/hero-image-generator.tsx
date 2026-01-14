'use client';

import { generateHeroImageAction } from '@/actions/generate-hero-image';
import { LoginWrapper } from '@/components/auth/login-wrapper';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from '@/hooks/use-session';
import { cn } from '@/lib/utils';
import { usePromptStore } from '@/stores/prompt-store';
import { Loader2, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { toast } from 'sonner';

const ASPECT_RATIOS = [
  { value: '1:1', label: '1:1' },
  { value: '4:3', label: '4:3' },
  { value: '3:4', label: '3:4' },
  { value: '16:9', label: '16:9' },
  { value: '9:16', label: '9:16' },
] as const;

export function HeroImageGenerator() {
  const t = useTranslations('HomePage.heroGenerator');
  const session = useSession();
  const { prompt, setPrompt } = usePromptStore();
  const [aspectRatio, setAspectRatio] = useState<string>('1:1');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const isLoggedIn = !!session?.user;

  const { execute, isExecuting } = useAction(generateHeroImageAction, {
    onSuccess: (result) => {
      if (result.data?.success && result.data.imageUrl) {
        setGeneratedImage(result.data.imageUrl);
        toast.success(t('generateSuccess'));
      } else {
        toast.error(result.data?.error || t('generateError'));
      }
    },
    onError: () => {
      toast.error(t('generateError'));
    },
  });

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error(t('promptRequired'));
      return;
    }

    if (!isLoggedIn) {
      // LoginWrapper will handle showing the login dialog
      return;
    }

    execute({
      prompt: prompt.trim(),
      aspectRatio: aspectRatio as any,
    });
  };

  const handleClear = () => {
    setPrompt('');
    setGeneratedImage(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Main Generator Card */}
      <div className="bg-muted/50 backdrop-blur-sm border rounded-2xl p-6 md:p-8 shadow-lg">
        {/* Prompt Input */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="prompt-input"
              className="text-sm text-muted-foreground"
            >
              {t('promptLabel')}
            </label>
            <Textarea
              id="prompt-input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t('promptPlaceholder')}
              className="min-h-[200px] text-lg resize-none bg-background/50 border-muted"
              disabled={isExecuting}
            />
          </div>

          {/* Aspect Ratio Grid */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              {t('aspectRatioLabel')}
            </div>
            <div className="grid grid-cols-5 gap-2">
              {ASPECT_RATIOS.map((ratio) => (
                <button
                  key={ratio.value}
                  type="button"
                  onClick={() => setAspectRatio(ratio.value)}
                  className={cn(
                    'px-4 py-2 text-sm rounded-lg border-2 transition-colors',
                    aspectRatio === ratio.value
                      ? 'border-green-500 text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400'
                      : 'border-muted text-muted-foreground bg-background/50 hover:border-green-300 hover:text-green-600'
                  )}
                  disabled={isExecuting}
                >
                  {ratio.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              variant="ghost"
              onClick={handleClear}
              disabled={isExecuting}
              className="text-muted-foreground"
            >
              {t('clear')}
            </Button>

            {isLoggedIn ? (
              <Button
                size="lg"
                onClick={handleGenerate}
                disabled={isExecuting}
                className="bg-green-600 hover:bg-green-700 text-white px-8"
              >
                {isExecuting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    {t('generating')}
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 size-4" />
                    {t('generate')}
                  </>
                )}
              </Button>
            ) : (
              <LoginWrapper mode="modal" asChild>
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 cursor-pointer"
                >
                  <Sparkles className="mr-2 size-4" />
                  {t('loginToGenerateFree')}
                </Button>
              </LoginWrapper>
            )}
          </div>
        </div>
      </div>

      {/* Generated Image Display */}
      {generatedImage && (
        <div className="mt-8 rounded-2xl overflow-hidden border shadow-lg">
          <img src={generatedImage} alt={prompt} className="w-full h-auto" />
        </div>
      )}
    </div>
  );
}
