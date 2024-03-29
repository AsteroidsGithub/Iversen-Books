import '@Styles/globals.css';

import ModalController from '@Components/ModalController';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

export default ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="application-name" content="Quick60" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Quick60" />
        <meta name="description" content="Best PWA App in the world" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <ModalController>
        <div className='flex flex-col h-screen w-screen'>

        <Component {...pageProps} />
        </div>
      </ModalController>
    </>
  );
};
