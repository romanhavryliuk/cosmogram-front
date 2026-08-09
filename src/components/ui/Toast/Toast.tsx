'use client';

import { Toaster } from 'react-hot-toast';

/** Монтується один раз у root layout; сповіщення кидаємо через toast() */
export const ToastProvider = () => {
  return <Toaster />;
};
