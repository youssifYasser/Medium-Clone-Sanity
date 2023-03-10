import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface Session {
    user: {
      name: string;
      email: string;
      image: string;
    };
  }
}

export interface Provider {
  id: string;
  name: string;
}

export interface Post {
  _id: string;
  _createdAt: string;
  author: {
    name: string;
    image: string;
    profileImage: string;
  };
  description: string;
  title: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  postImage: string;
  body: string;
  comments: Comment[];
}

export interface Comment {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}

export interface Author {
  _id: string;
  name: string;
  bio: string;
  profileImage: string;
  image: {
    asset: {
      url: string;
    };
  };
}
