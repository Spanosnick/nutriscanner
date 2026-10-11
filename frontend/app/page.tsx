'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from './components/ui/LoadingScreen';
import { useAuth } from './context/authContext';

export default function Home() {
  const { store, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    router.replace(store ? '/dashboard' : '/login');
  }, [store, loading, router]);

  return <LoadingScreen />;
}
