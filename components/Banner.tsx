import Image from 'next/image';
import mediumLogo from '../public/m_logo.png';

const Banner = () => {
  return (
    <div className="flex justify-between items-center bg-yellow-400 border-b border-black py-10 lg:py-0">
      <div className="px-10 space-y-5">
        <h1 className="text-6xl max-w-lg font-serif md:max-w-xl">
          <span className="underline decoration-black decoration-4">
            Medium
          </span>{' '}
          is a place to write, read, and connect
        </h1>
        <h2>
          It's easy and free to post your thinking on any topic and connect with
          millions of readers
        </h2>
      </div>

      <div className="hidden md:inline-flex h-56 lg:h-full">
        <Image src={mediumLogo} alt="medium logo" className="object-cover" />
      </div>
    </div>
  );
};

export default Banner;
