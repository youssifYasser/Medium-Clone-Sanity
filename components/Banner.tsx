const Banner = () => {
  return (
    <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
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
        <img src="/m_logo.png" alt="medium logo" />
      </div>
    </div>
  );
};

export default Banner;
