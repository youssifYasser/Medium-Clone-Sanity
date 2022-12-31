import CreatePost from '../../components/CreatePost';
import { client } from '../../sanity';
import { Author } from '../../typings';

interface Props {
  authors: Author[];
}
const signUpPage = ({ authors }: Props) => {
  return <CreatePost authors={authors} />;
};

export const getStaticProps = async () => {
  const query = `*[_type=="author"]{
  _id,
  name,
  bio,
  image {
    asset {
      _ref,
    },
  }, 
}`;

  const authors = await client.fetch(query);

  return {
    props: {
      authors,
    },
  };
};

export default signUpPage;
