'use client';

import { useState, useEffect, Suspense } from 'react';
import DashboardClient from './DashboardClient';

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Or a loading spinner
  }

  return (
    <Suspense fallback={null}>
      <DashboardClient />
    </Suspense>
  );
}
