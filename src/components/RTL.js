import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

function RTL(props) {
    if (props.isRtl) {
        return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
    } else {
        return props.children;
    }
}

export default RTL;
