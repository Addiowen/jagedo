import { Metadata } from 'next';
import logoImg from '@public/logo.svg';
import { LAYOUT_OPTIONS } from '@/config/enums';
import logoIconImg from '@public/logo-short.svg';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import Japageo_01 from '@public/fwdhello/Japageo_01.png';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Jagedo',
  description: ``,
  logo: '',
  icon: Japageo_01,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - Jagedo` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Jagedos` : title,
      description,
      url: 'https://isomorphic-furyroad.vercel.app',
      siteName: 'Jagedo', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: 'https://s3.amazonaws.com/redqteam.com/-furyroad/itemdep/isobanner.png',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
