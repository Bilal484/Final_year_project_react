import React, { useState, useEffect } from 'react';
import TranslationService, { TranslationContext } from './TranslationService';

export function TranslationProvider({ children, config, defaultLanguage }) {
    const [service] = useState(() => new TranslationService({
        ...config,
        defaultLanguage: defaultLanguage || config?.defaultLanguage || 'en'
    }));

    const [currentLanguage, setCurrentLanguage] = useState(() => {
        const saved = localStorage.getItem('app_language');
        return saved || defaultLanguage || config?.defaultLanguage || 'en';
    });

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        localStorage.setItem('app_language', currentLanguage);
    }, [currentLanguage]);

    useEffect(() => {
        const initialize = async () => {
            await service.loadSupportedLanguages();
            setIsReady(true);
        };

        initialize();
    }, [service]);

    const changeLanguage = (language) => {
        const validLanguage = service.getValidLanguage(language);
        setCurrentLanguage(validLanguage);
    };

    const contextValue = {
        service,
        currentLanguage,
        changeLanguage,
        isReady,
        supportedLanguages: service.supportedLanguages
    };

    return (
        <TranslationContext.Provider value={contextValue}>
            {children}
        </TranslationContext.Provider>
    );
}
