import React, { useState, useEffect } from 'react';
import { useTranslation } from './useTranslation';

export const TranslateText = ({ children, fallback, markdown = false }) => {
    const { t, currentLanguage, isReady } = useTranslation();
    const [translated, setTranslated] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isReady || !children) {
            setTranslated(fallback || children || '');
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        const translateContent = async () => {
            try {
                const result = await t(children);
                setTranslated(result);
            } catch (error) {
                console.error('Translation error:', error);
                setTranslated(fallback || children || '');
            } finally {
                setIsLoading(false);
            }
        };

        translateContent();
    }, [children, t, currentLanguage, isReady, fallback]);

    if (isLoading) {
        return <span className="translation-loading">{fallback || children}</span>;
    }

    if (markdown) {
        return <div className="translated-markdown">{translated}</div>;
    }

    return <span className="translated-text">{translated}</span>;
};
