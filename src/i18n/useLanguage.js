import { useContext } from 'react';
import { LanguageContext } from './languageContext';

/**
 * 현재 언어와 번역 함수 꺼내기
 *   const { lang, setLang, t } = useLanguage();
 *   t('Main_menu1')  → 'Visitor Info' 또는 '관람 안내'
 */
export default function useLanguage() {
  return useContext(LanguageContext);
}
