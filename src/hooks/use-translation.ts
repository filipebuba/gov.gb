'use client';

import { useLocaleStore } from '@/stores/locale-store';
import { getDictionary } from '@/lib/i18n/dictionaries';

export function useTranslation() {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const t = getDictionary(locale);
  return { t, locale, setLocale } as const;
}
