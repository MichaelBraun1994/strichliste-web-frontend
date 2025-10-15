import { useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';
import { AppState } from '.';
import {
  Article,
  User,
  getArticleById,
  getArticleList,
  getPayPal,
  getPopularArticles,
  getUserRecentArticles,
  getSettings,
  getUser,
  getUserArray,
  getUserBalance,
  getUserState,
  getFilteredUserIds,
  getGlobalError,
  isTransactionDeletable,
  isPaymentEnabled,
  Transaction,
} from './reducers';

export function useFilteredUsers(isActive: boolean) {
  return useMappedState<string[]>(
    useCallback(state => getFilteredUserIds(state, isActive), [isActive])
  );
}

export function useUser(id: string) {
  const user = useMappedState<User | undefined>(
    useCallback(state => getUser(state, id), [id])
  );
  return user;
}

export function useUserName(id: string): string {
  const user = useMappedState<User | undefined>(
    useCallback(state => getUser(state, id), [id])
  );
  return user ? user.name : '';
}

export function useUserBalance(id: string): number {
  return useMappedState<number>(
    useCallback(state => getUserBalance(state, id), [id])
  );
}

export function useArticles(): Article[] {
  return useMappedState<Article[]>(getArticleList);
}

export function useActiveArticles(isActive: boolean): Article[] {
  const articles = useArticles();

  return articles.filter(article => article.isActive === isActive);
}

export function usePopularArticles(): Article[] {
  return useMappedState<Article[]>(getPopularArticles);
}

export function useUserRecentArticles(userId: string): Article[] {
  return useMappedState<Article[]>(
    useCallback((state: AppState) => getUserRecentArticles(state, userId), [
      userId,
    ])
  );
}

export function useArticle(id: number | undefined) {
  return useMappedState<Article | undefined>(
    useCallback((state: AppState) => getArticleById(state, id || 0), [id])
  );
}

export function usePayPalSettings() {
  return useMappedState(getPayPal);
}

export function useSettings() {
  return useMappedState(getSettings);
}

export function useIsPaymentEnabled() {
  return useMappedState(isPaymentEnabled);
}

export function useUserArray() {
  return useMappedState(getUserArray);
}

export function useUserState() {
  return useMappedState(getUserState);
}

export function useGlobalError() {
  return useMappedState(getGlobalError);
}

export function useIsTransactionDeletable(id: number) {
  return useMappedState<boolean>(
    useCallback((state: AppState) => isTransactionDeletable(state, id), [id])
  );
}

export function useTransaction(id: number) {
  return useMappedState<Transaction | undefined>(
    useCallback((state: AppState) => state.transaction[id], [id])
  );
}
