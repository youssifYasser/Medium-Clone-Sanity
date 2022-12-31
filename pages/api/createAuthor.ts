import type { NextApiRequest, NextApiResponse } from 'next';
import sanityClient from '@sanity/client';

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
};

const client = sanityClient(config);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, bio, tempSlug, profileImage } = JSON.parse(req.body);

  try {
    await client.create({
      _type: 'author',
      name,
      email,
      bio,
      slug: {
        _type: 'slug',
        current: tempSlug,
      },
      profileImage,
    });
  } catch (error) {
    res.status(500).json({ message: `couldn't create author`, error });
  }
  res.status(200).json({ message: 'Author Created!' });
}
