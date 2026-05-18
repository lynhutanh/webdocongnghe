import '../style/globals.css';

import React, { Suspense } from 'react';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { SWRConfig } from 'swr';
import dynamic from 'next/dynamic';
import SiteSettingsHead from '@components/SiteSettingsHead';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextI18NextConfig = require('../next-i18next.config.js');

const Toasty = dynamic(() => import('src/components/common/toasty'), {
  ssr: false,
  loading: () => null
});

function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        shouldRetryOnError: true
      }}
    >
      <SiteSettingsHead />
      <Toasty />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full" />
          </div>
        }
      >
        <Component {...pageProps} />
      </Suspense>
    </SWRConfig>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
