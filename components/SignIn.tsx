import { Provider } from '../typings';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

interface SignUpForm {
  name: string;
  email: string;
  bio: string;
  tempSlug: string;
  profileImage: string;
}

interface Props {
  providers: [Provider];
}

const SignIn = ({ providers }: Props) => {
  // if (session) {
  //   router.replace({
  //     pathname: '/',
  //   });
  // }
  return (
    <div className="grid place-items-center my-20 space-y-10">
      <h1 className="font-bold text-4xl">Log in to Medium</h1>
      {providers &&
        Object.values(providers).map((provider) => (
          <div
            key={provider.name}
            onClick={() => {
              signIn(provider.id);
            }}
            className="flex space-x-5 items-center py-3 px-10 cursor-pointer border-2 border-green-600 rounded-lg text-green-600 hover:text-green-500 hover:border-green-500  active:bg-green-700 active:text-white transition-colors duration-200 ease-in-out"
          >
            <Image
              alt="google logo"
              height={40}
              width={40}
              src="/google_logo.png"
            />
            <h1 className="font-bold text-lg">Sign in with {provider.name}</h1>
          </div>
        ))}
    </div>
  );
};

export default SignIn;
