import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
      <div className="flex flex-1  items-center space-x-5">
        <Link href="/">
          <img
            src="/medium_logo.png"
            alt="medium logo"
            className="w-44 object-contain cursor-pointer"
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

      <div className="flex flex-1 justify-end items-center space-x-5 text-green-600">
        <h3 className="hidden md:inline-flex cursor-pointer">Sign In</h3>
        <Link href="/create-post">
          <h3 className="cursor-pointer">Create Post</h3>
        </Link>
        <Link href="/sign-up">
          <h3 className="border-2 border-green-600 rounded-full px-4 py-1 cursor-pointer">
            Get Started
          </h3>
        </Link>
      </div>
      <div></div>
    </header>
  );
};

export default Header;
