import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';
import {
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-opacity-50 backdrop-blur-xl flex justify-between p-5 max-w-7xl mx-auto shadow-md lg:shadow-none">
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
        {session ? (
          <Link href="/create-post">
            <h3 className="text-center bg-green-600 text-white active:bg-green-700  rounded-full px-5 py-1 cursor-pointer whitespace-nowrap font-semibold">
              Create Post
            </h3>
          </Link>
        ) : (
          <Link href="/sign-in">
            <h3 className="text-center bg-green-600 text-white active:bg-green-700  rounded-full px-5 py-1 cursor-pointer whitespace-nowrap font-semibold">
              Sign in
            </h3>
          </Link>
        )}

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button
              className={`flex rounded-full ${
                session
                  ? 'cursor-pointer active:scale-95 filter active:brightness-75 transition-all duration-150'
                  : 'cursor-default'
              }`}
            >
              {session?.user ? (
                <div className="flex items-center space-x-1">
                  <Image
                    alt="profile-pic"
                    width="40"
                    height="40"
                    src={session.user.image}
                    className="rounded-full object-cover"
                  />
                  <ChevronDownIcon className="hidden sm:inline-flex w-4 text-black" />
                </div>
              ) : (
                <div className="bg-gray-300 text-gray-900 p-2 rounded-full">
                  <UserIcon className="h-6" />
                </div>
              )}
            </Menu.Button>
          </div>
          {session && (
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-15 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="border-b border-gray-200">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${
                          active && 'bg-gray-100 rounded-t-lg text-gray-900'
                        } flex items-center space-x-3 p-2 cursor-default`}
                      >
                        <Image
                          alt="profile-pic"
                          width="40"
                          height="40"
                          src={session.user?.image}
                          className="rounded-full"
                        />
                        <p className="whitespace-nowrap font-semibold lg:text-base">
                          {session.user?.name}
                        </p>
                      </div>
                    )}
                  </Menu.Item>
                </div>

                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`${
                        active && 'bg-gray-100 rounded-b-lg'
                      } text-gray-900 flex items-center space-x-3 p-2 cursor-pointer`}
                      onClick={() => signOut()}
                    >
                      <div
                        className={`${
                          active ? 'bg-gray-300' : 'bg-gray-200'
                        } p-2 rounded-full`}
                      >
                        <ArrowRightOnRectangleIcon className="h-6" />
                      </div>
                      <p className="whitespace-nowrap font-semibold lg:text-base">
                        Log Out
                      </p>
                    </div>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          )}
        </Menu>
      </div>
    </header>
  );
};

export default Header;
