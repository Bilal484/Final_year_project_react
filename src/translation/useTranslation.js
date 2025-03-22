import { useContext } from 'react';
import { TranslationContext } from './TranslationService';

export function useTranslation() {
    const context = useContext(TranslationContext);

    if (!context) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }

    const { service, currentLanguage, changeLanguage, isReady, supportedLanguages } = context;

    const translate = async (text) => {
        if (!isReady || !text) return text;
        return service.translateText(text, currentLanguage);
    };

    return {
        t: translate,
        translateBatch: (texts) => service.translateBatch(texts, currentLanguage),
        currentLanguage,
        changeLanguage,
        isReady,
        supportedLanguages
    };
}
