import { consumeCreditsAction } from '@/actions/consume-credits';
import { getCreditBalanceAction } from '@/actions/get-credit-balance';
import { getCreditStatsAction } from '@/actions/get-credit-stats';
import { getCreditTransactionsAction } from '@/actions/get-credit-transactions';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import type { SortingState } from '@tanstack/react-table';

// Simple filter interface
interface SimpleFilter {
  id: string;
  value: string;
}

// Query keys
export const creditsKeys = {
  all: ['credits'] as const,
  balance: (userId: string) => [...creditsKeys.all, 'balance', userId] as const,
  stats: (userId: string) => [...creditsKeys.all, 'stats', userId] as const,
  transactions: (userId: string) =>
    [...creditsKeys.all, 'transactions', userId] as const,
  transactionsList: (
    userId: string,
    filters: {
      pageIndex: number;
      pageSize: number;
      search: string;
      sorting: SortingState;
      filters: SimpleFilter[];
    }
  ) => [...creditsKeys.transactions(userId), filters] as const,
};

// Hook to fetch credit balance
export function useCreditBalance(userId: string | undefined) {
  return useQuery({
    queryKey: creditsKeys.balance(userId || ''),
    queryFn: async () => {
      if (!userId) {
        throw new Error('User ID is required');
      }
      console.log('Fetching credit balance...');
      const result = await getCreditBalanceAction();
      if (!result?.data?.success) {
        console.log('useCreditBalance error:', result?.data?.error);
        throw new Error(
          result?.data?.error || 'Failed to fetch credit balance'
        );
      }
      console.log('Credit balance fetched:', result.data.credits);
      return result.data.credits || 0;
    },
    enabled: !!userId,
  });
}

// Hook to fetch credit statistics
export function useCreditStats(userId: string | undefined) {
  return useQuery({
    queryKey: creditsKeys.stats(userId || ''),
    queryFn: async () => {
      if (!userId) {
        throw new Error('User ID is required');
      }
      console.log('Fetching credit stats...');
      const result = await getCreditStatsAction();
      if (!result?.data?.success) {
        console.log('useCreditStats error:', result?.data?.error);
        throw new Error(result?.data?.error || 'Failed to fetch credit stats');
      }
      console.log('Credit stats fetched:', result.data.data);
      return result.data.data;
    },
    enabled: !!userId,
  });
}

// Hook to consume credits
export function useConsumeCredits(userId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      amount,
      description,
    }: {
      amount: number;
      description: string;
    }) => {
      const result = await consumeCreditsAction({
        amount,
        description,
      });
      if (!result?.data?.success) {
        console.log('useConsumeCredits error:', result?.data?.error);
        throw new Error(result?.data?.error || 'Failed to consume credits');
      }
      return result.data;
    },
    onSuccess: () => {
      if (!userId) return;
      // Invalidate credit balance, stats, and transactions after consuming credits
      queryClient.invalidateQueries({
        queryKey: creditsKeys.balance(userId),
      });
      queryClient.invalidateQueries({
        queryKey: creditsKeys.stats(userId),
      });
      queryClient.invalidateQueries({
        queryKey: creditsKeys.transactions(userId),
      });
    },
  });
}

// Hook to fetch credit transactions with pagination, search, sorting, and filters
export function useCreditTransactions(
  userId: string | undefined,
  pageIndex: number,
  pageSize: number,
  search: string,
  sorting: SortingState,
  filters: SimpleFilter[]
) {
  return useQuery({
    queryKey: creditsKeys.transactionsList(userId || '', {
      pageIndex,
      pageSize,
      search,
      sorting,
      filters,
    }),
    queryFn: async () => {
      if (!userId) {
        throw new Error('User ID is required');
      }
      const result = await getCreditTransactionsAction({
        pageIndex,
        pageSize,
        search,
        sorting,
        filters,
      });

      if (!result?.data?.success) {
        console.log('useCreditTransactions error:', result?.data?.error);
        throw new Error(
          result?.data?.error || 'Failed to fetch credit transactions'
        );
      }

      return {
        items: result.data.data?.items || [],
        total: result.data.data?.total || 0,
      };
    },
    enabled: !!userId,
    placeholderData: keepPreviousData,
  });
}
