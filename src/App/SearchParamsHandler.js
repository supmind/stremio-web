// Copyright (C) 2017-2023 Smart code 203358507

const React = require('react');
const isEqual = require('lodash.isequal');
const { withCoreSuspender } = require('stremio/common');

const SearchParamsHandler = () => {
    const [searchParams, setSearchParams] = React.useState({});

    const onLocationChange = () => {
        const { origin, hash, search } = window.location;
        const { searchParams } = new URL(`${origin}${hash.replace('#', '')}${search}`);

        setSearchParams((previousSearchParams) => {
            const currentSearchParams = Object.fromEntries(searchParams.entries());
            return isEqual(previousSearchParams, currentSearchParams) ? previousSearchParams : currentSearchParams;
        });
    };

    React.useEffect(() => {
        // NOTE: searchParams are handled here
    }, [searchParams]);

    React.useEffect(() => {
        onLocationChange();
        window.addEventListener('hashchange', onLocationChange);
        return () => window.removeEventListener('hashchange', onLocationChange);
    }, []);

    return null;
};

module.exports = withCoreSuspender(SearchParamsHandler);