import React from 'react';
import { TranslationProvider } from './TranslationProvider';

export function AppTranslationWrapper({ children }) {
    const apiKey = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;

    const getBrowserLanguage = () => {
        const browserLang = navigator.language || navigator.userLanguage;
        return browserLang ? browserLang.split('-')[0] : 'en';
    };

    return (
        <TranslationProvider
            config={{
                apiKey,
                cacheEnabled: true,
                cacheTTL: 7 * 24 * 60 * 60 * 1000,
                fallbackLanguage: 'en',
            }}
            defaultLanguage={getBrowserLanguage()}
        >
            {children}
        </TranslationProvider>
    );
}
