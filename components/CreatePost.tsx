import { Author } from '../typings';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import PortableText from 'react-portable-text';

interface Props {
  authors: Author[];
}

interface PostForm {
  title: string;
  desc: string;
  postBody: string;
  tempSlug: string;
  authorId: string;
  postImage: string;
}

const CreatePost = ({ authors }: Props) => {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostForm>();

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
          tempSlug: data.title.toLowerCase().replaceAll(' ', '-'),
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
  };

  return (
    <>
      {submitted ? (
        <div className="flex flex-col justify-center bg-yellow-500 max-w-2xl  mx-auto py-10 px-5 my-10  space-y-3 text-white">
          <h3 className="text-3xl font-bold">
            Thank you for Sharing your Thoughts!
          </h3>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col px-5 py-10 max-w-2xl mx-auto my-10 shadow shadow-yellow-500 hover:shadow-md hover:shadow-yellow-500  transition-shadow duration-200 ease-in-out"
        >
          <h4 className="text-3xl font-bold">Share your Thoughts!</h4>
          <hr className="py-3 mt-2" />

          {imagesAssets ? (
            <div className="flex justify-center space-x-3 items-center h-44 w-full mb-10">
              <img
                src={imagesAssets}
                alt="uploaded_image"
                className="h-full w-full object-cover  border shadow"
              />
              <button
                type="button"
                className="rounded-full h-fit py-2 px-4  text-red-700 font-bold text-xl cursor-pointer outline-none hover:bg-red-700 hover:text-white  transition-all duration-200 ease-in-out"
                onClick={() => setImagesAssets('')}
              >
                X
              </button>
            </div>
          ) : (
            <label className="cursor-pointer mb-5 self-center">
              <div className="flex-col shadow-lg h-44 w-full rounded">
                <div className="flex flex-col h-full justify-center items-center">
                  <p className="text-lg font-semibold m-10">
                    Click to upload your Profile Picture
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
            <select
              {...register('authorId', { required: true })}
              className="block w-full border shadow py-2 px-3 mt-1 rounded form-select outline-none ring-yellow-500 focus:ring-1 capitalize"
              defaultValue=""
            >
              <option disabled selected value="">
                -- Select Author --
              </option>
              {authors.map((author) => (
                <option key={author._id} value={author._id}>
                  {author.name}
                </option>
              ))}
            </select>
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
            {errors.authorId && (
              <span className="text-red-500">- Select the Author of Post</span>
            )}
            {errors.postBody && (
              <span className="text-red-500">- The Post Field is required</span>
            )}
          </div>

          <input
            type="submit"
            value="Share Post"
            className="bg-yellow-500 text-white font-bold w-full mx-auto py-2 px-3 rounded cursor-pointer hover:bg-yellow-400 focus:shadow  focus:outline-none transition-colors duration-200 ease-in-out"
          />
        </form>
      )}
    </>
  );
};

export default CreatePost;
