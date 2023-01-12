import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();
  console.log(session?.user);

  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
      <div className="flex flex-1  items-center space-x-5">
        <Link href="/">
          <img
            src="/medium_logo.png"
            alt="medium logo"
            className="w-40 sm:w-44 object-contain cursor-pointer"
          />
        </Link>
        <div className="hidden md:inline-flex space-x-5 items-center">
          <h3 className="cursor-pointer">About</h3>
          <h3 className="cursor-pointer">Contact</h3>
          <h3 className="bg-green-600 text-white px-4 py-1 rounded-full cursor-pointer">
            Follow
          </h3>
        </div>
      </div>

      <div className="flex flex-1 justify-end items-center space-x-2 sm:space-x-5 text-green-600">
        <Link href="/create-post">
          <h3 className="cursor-pointer text-sm sm:text-base">Create Post</h3>
        </Link>
        {/* <Link href="/sign-up"> */}
        <h3
          onClick={() => signIn()}
          className="border-2 border-green-600 text-sm sm:text-base rounded-full px-3 py-1 cursor-pointer"
        >
          Sign in
        </h3>
        {/* </Link> */}
      </div>
      <div></div>
    </header>
  );
};

export default Header;
