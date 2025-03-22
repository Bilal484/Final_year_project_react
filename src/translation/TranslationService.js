import { createContext, useState, useContext, useEffect } from 'react';

const DEFAULT_CONFIG = {
    apiKey: process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY,
    defaultLanguage: 'en',
    cacheEnabled: true,
    cacheTTL: 24 * 60 * 60 * 1000,
    fallbackLanguage: 'en',
};

class TranslationCache {
    constructor(ttl) {
        this.ttl = ttl;
        this.cacheKey = 'app_translation_cache';
        this.loadCache();
    }

    loadCache() {
        try {
            const cachedData = localStorage.getItem(this.cacheKey);
            this.cache = cachedData ? JSON.parse(cachedData) : {};

            this.clearExpired();
        } catch (error) {
            console.error('Failed to load translation cache:', error);
            this.cache = {};
        }
    }

    saveCache() {
        try {
            localStorage.setItem(this.cacheKey, JSON.stringify(this.cache));
        } catch (error) {
            console.error('Failed to save translation cache:', error);
        }
    }

    clearExpired() {
        const now = Date.now();
        let hasChanged = false;

        Object.keys(this.cache).forEach(key => {
            if (this.cache[key].expiresAt < now) {
                delete this.cache[key];
                hasChanged = true;
            }
        });

        if (hasChanged) {
            this.saveCache();
        }
    }

    getKey(text, targetLanguage) {
        return `${targetLanguage}:${text}`;
    }

    get(text, targetLanguage) {
        const key = this.getKey(text, targetLanguage);
        const entry = this.cache[key];

        if (entry && entry.expiresAt > Date.now()) {
            return entry.translation;
        }

        return null;
    }

    set(text, targetLanguage, translation) {
        const key = this.getKey(text, targetLanguage);
        this.cache[key] = {
            translation,
            expiresAt: Date.now() + this.ttl
        };

        this.saveCache();
    }

    clear() {
        this.cache = {};
        localStorage.removeItem(this.cacheKey);
    }
}

class TranslationService {
    constructor(config = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };

        if (this.config.cacheEnabled) {
            this.cache = new TranslationCache(this.config.cacheTTL);
        }

        this.supportedLanguages = [];
        this.pendingTranslations = new Map();

        this.loadSupportedLanguages();
    }

    async loadSupportedLanguages() {
        try {
            const response = await fetch(
                `https://translation.googleapis.com/language/translate/v2/languages?key=${this.config.apiKey}`
            );

            if (!response.ok) throw new Error('Failed to fetch languages');

            const data = await response.json();
            this.supportedLanguages = data.data.languages.map(lang => lang.language);

        } catch (error) {
            console.error('Failed to load supported languages:', error);
            // Fallback to common languages if API fails
            this.supportedLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'ar'];
        }
    }

    isLanguageSupported(languageCode) {
        return this.supportedLanguages.includes(languageCode);
    }

    getValidLanguage(languageCode) {
        if (!languageCode || !this.isLanguageSupported(languageCode)) {
            return this.config.fallbackLanguage;
        }
        return languageCode;
    }

    getPendingKey(text, targetLanguage) {
        return `${targetLanguage}:${text}`;
    }

    async translateText(text, targetLanguage) {
        if (!text || typeof text !== 'string') {
            return text;
        }

        if (targetLanguage === this.config.defaultLanguage) {
            return text;
        }

        const validLanguage = this.getValidLanguage(targetLanguage);

        if (this.config.cacheEnabled) {
            const cachedTranslation = this.cache.get(text, validLanguage);
            if (cachedTranslation) {
                return cachedTranslation;
            }
        }

        const pendingKey = this.getPendingKey(text, validLanguage);
        if (this.pendingTranslations.has(pendingKey)) {
            return this.pendingTranslations.get(pendingKey);
        }

        const translationPromise = this.callTranslateAPI(text, validLanguage);
        this.pendingTranslations.set(pendingKey, translationPromise);

        try {
            const result = await translationPromise;
            this.pendingTranslations.delete(pendingKey);
            return result;
        } catch (error) {
            this.pendingTranslations.delete(pendingKey);
            throw error;
        }
    }

    async callTranslateAPI(text, targetLanguage) {
        try {
            const response = await fetch(
                `https://translation.googleapis.com/language/translate/v2?key=${this.config.apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        q: text,
                        target: targetLanguage,
                        format: 'text',
                        key: this.config.apiKey
                    })
                }
            );

            if (!response.ok) {
                throw new Error('Translation API error');
            }

            const data = await response.json();
            const translation = data.data.translations[0].translatedText;

            if (this.config.cacheEnabled) {
                this.cache.set(text, targetLanguage, translation);
            }

            return translation;
        } catch (error) {
            console.error('Translation error:', error);
            return text;
        }
    }

    async translateBatch(texts, targetLanguage) {
        if (!texts || !texts.length) {
            return [];
        }

        const stringsToTranslate = texts.filter(item => typeof item === 'string' && item.trim() !== '');
        // const stringsToTranslate = texts;

        if (stringsToTranslate.length === 0) {
            return texts;
        }

        if (targetLanguage === this.config.defaultLanguage) {
            return texts;
        }

        const validLanguage = this.getValidLanguage(targetLanguage);

        try {
            const response = await fetch(
                `https://translation.googleapis.com/language/translate/v2?key=${this.config.apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        q: stringsToTranslate,
                        target: validLanguage,
                        format: 'text',
                        key: this.config.apiKey
                    })
                }
            );

            if (!response.ok) {
                throw new Error('Batch translation API error');
            }

            const data = await response.json();
            const translations = data.data.translations.map(t => t.translatedText);

            if (this.config.cacheEnabled) {
                stringsToTranslate.forEach((text, index) => {
                    this.cache.set(text, validLanguage, translations[index]);
                });
            }

            let translationIndex = 0;
            // return texts;
            return texts.map(item => {
                if (typeof item === 'string' && item.trim() !== '') {
                    return translations[translationIndex++];
                }
                return item;
            });

        } catch (error) {
            console.error('Batch translation error:', error);
            return texts;
        }
    }
}

const TranslationContext = createContext(null);

export default TranslationService;
export { TranslationContext };
