import { useMemo } from 'react';
import { selectAuth } from '../app/features/authSlice';
import { useAppSelector } from './hooks';

export default function useAuth() {
  const authState = useAppSelector(selectAuth);

  return useMemo(() => ({ ...authState }), [authState]);
}
