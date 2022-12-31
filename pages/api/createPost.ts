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
  const { title, desc, authorId, tempSlug, postBody, postImage } = JSON.parse(
    req.body
  );
  try {
    await client.create({
      _type: 'post',
      title,
      description: desc,
      body: postBody,
      postImage,
      slug: {
        _type: 'slug',
        current: tempSlug,
      },
      author: {
        _type: 'reference',
        _ref: authorId,
      },
    });
  } catch (error) {
    res.status(500).json({ message: `couldn't create author`, error });
  }
  res.status(200).json({ message: 'Post Created!' });
}
