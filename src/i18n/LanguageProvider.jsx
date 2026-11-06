import { useCallback, useEffect, useMemo, useState } from 'react';
import { LanguageContext } from './languageContext';
import { DEFAULT_LANGUAGE, LANGUAGES, translate } from './strings';

/**
 * LanguageProvider — 언어 전환 기능
 *   - 고른 언어를 브라우저에 기억 (새로고침해도 유지)
 *   - <html lang>을 현재 언어로 바꿈 (화면낭독기가 알맞은 발음으로 읽음)
 * TODO: URL 구조(/en, /ko) 확정 후 주소로도 언어를 나눌지 결정
 */
const STORAGE_KEY = 'suma-lang';

function readSavedLanguage() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return LANGUAGES.includes(saved) ? saved : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

export default function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readSavedLanguage);

  const setLang = useCallback((next) => {
    if (!LANGUAGES.includes(next)) return;
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // 저장이 막힌 브라우저(사생활 보호 모드 등)에서는 기억만 하지 않음
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t: (key, vars) => translate(lang, key, vars) }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
