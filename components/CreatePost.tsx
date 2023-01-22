import { Author } from '../typings';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { urlFor } from '../sanity';
import { UserIcon } from '@heroicons/react/24/outline';

interface Props {
  author: Author;
}

interface PostForm {
  title: string;
  desc: string;
  postBody: string;
  tempSlug: string;
  authorId: string;
  postImage: string;
}

const CreatePost = ({ author }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostForm>();
  const [isLoading, setIsLoading] = useState(false);
  const [imagesAssets, setImagesAssets] = useState<any>();
  const [imageTarget, setImageTarget] = useState<any>();
  const [profileError, setProfileError] = useState(false);
  const [wrongTypeofImage, setWrongTypeofImage] = useState(false);

  const uploadImage = (e: any) => {
    if (
      e.target.files[0].type === 'image/png' ||
      e.target.files[0].type === 'image/svg' ||
      e.target.files[0].type === 'image/jpeg' ||
      e.target.files[0].type === 'image/tiff'
    ) {
      setWrongTypeofImage(false);
      const reader = new FileReader();
      reader.onload = (onloadEvent) => {
        setImagesAssets(onloadEvent.target?.result);
        setImageTarget(e.target.files[0]);
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      console.log('wrong type');

      setWrongTypeofImage(true);
    }
  };

  const onSubmit: SubmitHandler<PostForm> = async (data) => {
    setIsLoading(true);
    if (imagesAssets) {
      setProfileError(false);
      const formData = new FormData();
      formData.append('file', imageTarget);
      formData.append('upload_preset', 'post-images');
      const imageData: any = await fetch(
        'https://api.cloudinary.com/v1_1/dkbhs7fva/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      )
        .then((r) => r.json())
        .catch((err) => console.log(err));

      if (imageData.secure_url) {
        data = {
          ...data,
          authorId: author._id,
          tempSlug:
            data.title
              .toLowerCase()
              .replaceAll(' ', '-')
              .replaceAll('@', '-')
              .replaceAll('.', '-')
              .replaceAll('_', '-') +
            '-' +
            Math.random().toString().slice(2),
          postImage: imageData.secure_url,
        };

        await fetch('/api/createPost', {
          method: 'POST',
          body: JSON.stringify(data),
        })
          .then(() => {
            setSubmitted(true);
            setTimeout(() => {
              router.push('/');
            }, 5000);
          })
          .catch((err) => {
            setSubmitted(false);
            console.log(err);
          });
      }
    } else {
      setProfileError(true);
    }
    setIsLoading(false);
  };

  return (
    <>
      {submitted ? (
        <div className="flex flex-col justify-center bg-yellow-500 max-w-2xl  mx-auto py-10 px-5 my-10  space-y-3 text-white">
          <h3 className="text-2xl sm:text-3xl font-bold">
            Thank You For Sharing Your Thoughts!
          </h3>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col px-5 py-10 max-w-2xl mx-auto my-10 shadow shadow-yellow-500 hover:shadow-md hover:shadow-yellow-500  transition-shadow duration-200 ease-in-out"
        >
          <h4 className="text-2xl sm:text-3xl font-bold">
            Share Your Thoughts!
          </h4>
          <hr className="py-3 mt-2" />

          {imagesAssets ? (
            <div className="flex justify-center space-x-3 items-center h-44 w-full mb-10">
              <div className="relative h-full w-full border shadow">
                <Image
                  fill
                  src={imagesAssets}
                  alt="uploaded_image"
                  className=" object-cover "
                />
              </div>
              <button
                type="button"
                className="rounded-full h-fit py-2 px-4  text-red-700 font-bold text-xl cursor-pointer outline-none hover:bg-red-700 hover:text-white  transition-all duration-200 ease-in-out"
                onClick={() => setImagesAssets('')}
              >
                X
              </button>
            </div>
          ) : (
            <label className="cursor-pointer mb-5 self-center w-full">
              <div className="flex-col shadow-md h-44 w-full rounded">
                <div className="flex flex-col h-full justify-center items-center">
                  <p className="text-md sm:text-lg font-semibold m-10">
                    Click To Upload Your Post Picture
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  name="upload-image"
                  onChange={uploadImage}
                  className="hidden"
                />
              </div>
            </label>
          )}

          <label className="block mb-5">
            <span className="text-gray-700">Title</span>
            <input
              {...register('title', { required: true })}
              type="text"
              placeholder="Post Title"
              className="block w-full border py-2 px-3 mt-1 rounded form-input shadow outline-none ring-yellow-500 focus:ring-1"
            />
          </label>

          <label className="block mb-5">
            <span className="text-gray-700">Description</span>
            <input
              {...register('desc', { required: true })}
              type="text"
              placeholder="Post Description"
              className="block w-full border py-2 px-3 mt-1 rounded form-input shadow outline-none ring-yellow-500 focus:ring-1"
            />
          </label>

          <label className="block mb-5">
            <span className="text-gray-700">Author</span>
            <div className="flex items-center space-x-4 w-full border shadow py-2 px-3 mt-1 rounded capitalize">
              {session ? (
                <>
                  <div className="relative h-11 w-11">
                    <Image
                      fill
                      src={
                        author.image
                          ? urlFor(author.image).url()
                          : author.profileImage
                      }
                      alt="author pic"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <p className="font-medium">{author.name}</p>
                </>
              ) : (
                <>
                  <div className="bg-gray-300 text-gray-900 p-2 rounded-full">
                    <UserIcon className="h-6" />
                  </div>
                  <p>-- Sign in and become an Author --</p>
                </>
              )}
            </div>
          </label>

          <label className="block mb-5">
            <span className="text-gray-700">Post</span>
            <textarea
              {...register('postBody', { required: true })}
              placeholder="Write your Post"
              rows={8}
              className="block w-full border py-2 px-3 mt-1 rounded form-textarea shadow outline-none ring-yellow-500 focus:ring-1"
            />
          </label>

          <div className="flex flex-col p-5">
            {profileError && (
              <span className="text-red-500">
                - Your Profile Picture is required
              </span>
            )}
            {wrongTypeofImage && (
              <span className="text-red-500">
                - Wrong Type of Profile Imnage
              </span>
            )}
            {errors.title && (
              <span className="text-red-500">
                - The Title Field is required
              </span>
            )}
            {errors.desc && (
              <span className="text-red-500">
                - The Description Field is required
              </span>
            )}

            {errors.postBody && (
              <span className="text-red-500">- The Post Field is required</span>
            )}
          </div>

          <input
            type="submit"
            value={`${isLoading ? 'Loading...' : 'Share Post'}`}
            className={` tracking-[3px]
            bg-yellow-500 text-white font-bold w-full mx-auto py-2 px-3 rounded   focus:shadow  focus:outline-none transition-colors duration-200 ease-in-out ${
              isLoading
                ? 'cursor-default'
                : 'cursor-pointer hover:bg-yellow-400'
            }`}
            disabled={isLoading}
          />
        </form>
      )}
    </>
  );
};

export default CreatePost;
