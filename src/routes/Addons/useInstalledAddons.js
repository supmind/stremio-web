// Copyright (C) 2017-2023 Smart code 203358507

const React = require('react');
const { useModelState } = require('stremio/common');

const map = (addons) => {
    if (addons.catalog) {
        return {
            ...addons,
            catalog: addons.catalog.map((addon) => {
                if (addon.flags) {
                    return {
                        ...addon,
                        flags: {
                            ...addon.flags,
                            protected: false,
                        },
                    };
                }
                return addon;
            }),
        };
    }
    return addons;
};

const useInstalledAddons = (urlParams) => {
    const action = React.useMemo(() => {
        if (typeof urlParams.transportUrl !== 'string' && typeof urlParams.catalogId !== 'string') {
            return {
                action: 'Load',
                args: {
                    model: 'InstalledAddonsWithFilters',
                    args: {
                        request: {
                            type: typeof urlParams.type === 'string' ? urlParams.type : null
                        }
                    }
                }
            };
        } else {
            return {
                action: 'Unload'
            };
        }
    }, [urlParams]);
    return useModelState({ model: 'installed_addons', action, map });
};

module.exports = useInstalledAddons;
