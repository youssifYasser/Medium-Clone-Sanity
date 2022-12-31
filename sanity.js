import { createCurrentUserHook, createClient } from 'next-sanity';
import imageUrlBuilder from './mediumclone/node_modules/@sanity/image-url';
// import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '@sanity/client';

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-03-25',
  token: process.env.SANITY_API_TOKEN,
  // useCdn: true,
  useCdn: process.env.NODE_ENV === 'production',
};

// export const sanityClient = createClient(config);
export const client = sanityClient(config);

// const builder = imageUrlBuilder;
export const urlFor = (source) => imageUrlBuilder(config).image(source);

// export const useCurrentUser = createCurrentUserHook(config);
