import React, { useState, useEffect } from 'react';
import { useTranslation } from './useTranslation';

export function withTranslation(Component, propsToTranslate = []) {
    return function TranslatedComponent(props) {
        const { t, isReady } = useTranslation();
        const [translatedProps, setTranslatedProps] = useState(props);

        useEffect(() => {
            if (!isReady || propsToTranslate.length === 0) {
                setTranslatedProps(props);
                return;
            }

            const translateProps = async () => {
                const newProps = { ...props };

                for (const propName of propsToTranslate) {
                    if (typeof props[propName] === 'string') {
                        newProps[propName] = await t(props[propName]);
                    }
                }

                setTranslatedProps(newProps);
            };

            translateProps();
        }, [props, t, isReady]);

        return <Component {...translatedProps} />;
    };
}
