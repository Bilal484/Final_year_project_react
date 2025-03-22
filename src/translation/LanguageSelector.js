import React from 'react';
import { useTranslation } from './useTranslation';

const LANGUAGE_NAMES = {
    'en': 'English',
    'es': 'Español',
    'fr': 'Français',
    'ar': 'العربية',
    'ur': 'اردو'
};

export const LanguageSelector = ({ className, onChange }) => {
    const { currentLanguage, changeLanguage, isReady } = useTranslation();

    if (!isReady) {
        return <div className="language-selector-loading">Loading languages...</div>;
    }

    const handleChange = (e) => {
        const newLanguage = e.target.value;
        changeLanguage(newLanguage);
        if (onChange) {
            onChange(newLanguage);
        }
    };

    return (
        <select
            className={`language-selector ${className || ''}`}
            value={currentLanguage}
            onChange={handleChange}
        >
            {Object.entries(LANGUAGE_NAMES).map(([lang, label]) => (
                <option key={lang} value={lang}>
                    {label}
                </option>
            ))}
        </select>
    );
};