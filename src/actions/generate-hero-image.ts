'use server';

import { addCredits, consumeCredits, getUserCredits } from '@/credits/credits';
import type { User } from '@/lib/auth-types';
import { userActionClient } from '@/lib/safe-action';
import { z } from 'zod';

const HERO_IMAGE_COST = 10;
const Z_IMAGE_API_URL = 'https://api.kie.ai/api/v1/jobs';

// Generate hero image schema
const generateHeroImageSchema = z.object({
  prompt: z.string().min(1).max(1000),
  aspectRatio: z.enum(['1:1', '4:3', '3:4', '16:9', '9:16']).default('1:1'),
});

interface ZImageCreateResponse {
  code: number;
  msg: string;
  data: {
    taskId: string;
  };
}

interface ZImageQueryResponse {
  code: number;
  msg: string;
  data: {
    taskId: string;
    model: string;
    state: 'waiting' | 'success' | 'fail';
    param: string;
    resultJson: string | null;
    failCode: string | null;
    failMsg: string | null;
    costTime: number | null;
    completeTime: number | null;
    createTime: number;
  };
}

/**
 * Generate hero image using Z Image API
 */
export const generateHeroImageAction = userActionClient
  .schema(generateHeroImageSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { prompt, aspectRatio } = parsedInput;
    const currentUser = (ctx as { user: User }).user;

    try {
      // Check if user has enough credits
      const currentCredits = await getUserCredits(currentUser.id);
      if (currentCredits < HERO_IMAGE_COST) {
        return {
          success: false,
          error: 'Insufficient credits',
          creditsNeeded: HERO_IMAGE_COST,
          currentCredits,
        };
      }

      // Consume credits before generation
      await consumeCredits({
        userId: currentUser.id,
        amount: HERO_IMAGE_COST,
        description: `Hero image generation: ${prompt.substring(0, 50)}...`,
      });

      // Get API key from environment
      const apiKey = process.env.Z_IMAGE_API_KEY;
      if (!apiKey) {
        // Refund credits if API key is missing
        await addCredits({
          userId: currentUser.id,
          amount: HERO_IMAGE_COST,
          type: 'REFUND',
          description: 'Refund: API key missing',
        });
        return {
          success: false,
          error: 'API configuration error',
        };
      }

      // Create generation task
      const createResponse = await fetch(`${Z_IMAGE_API_URL}/createTask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'z-image',
          input: {
            prompt,
            aspect_ratio: aspectRatio,
          },
        }),
      });

      const createData = (await createResponse.json()) as ZImageCreateResponse;

      if (!createResponse.ok || createData.code !== 200) {
        // Refund credits on failure
        await addCredits({
          userId: currentUser.id,
          amount: HERO_IMAGE_COST,
          type: 'REFUND',
          description: 'Refund: Image generation failed',
        });
        return {
          success: false,
          error: createData.msg || 'Failed to create generation task',
        };
      }

      const taskId = createData.data.taskId;

      // Poll for results (max 60 seconds)
      const maxAttempts = 60;
      const pollInterval = 1000; // 1 second

      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        await new Promise((resolve) => setTimeout(resolve, pollInterval));

        const queryResponse = await fetch(
          `${Z_IMAGE_API_URL}/recordInfo?taskId=${taskId}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        const queryData = (await queryResponse.json()) as ZImageQueryResponse;

        if (queryData.code === 200 && queryData.data.state === 'success') {
          // Parse result
          const resultJson = JSON.parse(queryData.data.resultJson || '{}');
          const imageUrl = resultJson.resultUrls?.[0];

          if (imageUrl) {
            return {
              success: true,
              imageUrl,
              taskId,
              costTime: queryData.data.costTime,
            };
          }
        }

        if (queryData.code === 200 && queryData.data.state === 'fail') {
          // Refund credits on failure
          await addCredits({
            userId: currentUser.id,
            amount: HERO_IMAGE_COST,
            type: 'REFUND',
            description: 'Refund: Image generation failed',
          });
          return {
            success: false,
            error: queryData.data.failMsg || 'Image generation failed',
          };
        }
      }

      // Timeout - refund credits
      await addCredits({
        userId: currentUser.id,
        amount: HERO_IMAGE_COST,
        type: 'REFUND',
        description: 'Refund: Image generation timeout',
      });

      return {
        success: false,
        error: 'Generation timeout',
      };
    } catch (error) {
      console.error('Generate hero image error:', error);

      // Refund credits on error
      try {
        await addCredits({
          userId: currentUser.id,
          amount: HERO_IMAGE_COST,
          type: 'REFUND',
          description: 'Refund: Image generation error',
        });
      } catch (refundError) {
        console.error('Refund error:', refundError);
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Something went wrong',
      };
    }
  });
