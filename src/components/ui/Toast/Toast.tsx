'use client';

import { Toaster } from 'react-hot-toast';

/** Монтується один раз у root layout; сповіщення кидаємо через toast() */
export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: 'var(--ink)',
          color: 'var(--parchment)',
          border: '1px solid var(--line)',
          borderRadius: '3px',
          boxShadow: 'var(--glow-violet)',
          fontFamily: 'var(--font-body), Inter, sans-serif',
          fontSize: '14px',
        },
        error: {
          iconTheme: { primary: '#e08a86', secondary: 'var(--void)' },
        },
        success: {
          iconTheme: { primary: 'var(--gold-soft)', secondary: 'var(--void)' },
        },
      }}
    />
  );
};
