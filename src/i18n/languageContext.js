import { createContext } from 'react';
import { DEFAULT_LANGUAGE, translate } from './strings';

/**
 * 현재 언어를 앱 전체에서 함께 쓰기 위한 Context
 * 값: { lang: 'en' | 'ko', setLang(lang), t(key, vars) }
 * 직접 쓰지 말고 useLanguage()로 꺼내 쓰세요.
 */
export const LanguageContext = createContext({
  lang: DEFAULT_LANGUAGE,
  setLang: () => {},
  t: (key, vars) => translate(DEFAULT_LANGUAGE, key, vars),
});
