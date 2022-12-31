import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';

interface SignUpForm {
  name: string;
  email: string;
  bio: string;
  tempSlug: string;
  profileImage: string;
}

const SignUp = () => {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
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

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    if (imagesAssets) {
      setProfileError(false);
      const formData = new FormData();
      formData.append('file', imageTarget);
      formData.append('upload_preset', 'profile-images');
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
          tempSlug: data.name.toLowerCase().replaceAll(' ', '-'),
          profileImage: imageData.secure_url,
        };
        await fetch('/api/createAuthor', {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();

  return (
    <>
      {submitted ? (
        <div className="flex flex-col justify-center bg-yellow-500 max-w-2xl  mx-auto py-10 px-5 my-10  space-y-3 text-white">
          <h3 className="text-3xl font-bold">Thank you for applying!</h3>
          <p> Don't hesitate to post your creative ideas!</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-5 max-w-2xl mx-auto my-10 shadow shadow-yellow-500 hover:shadow-md hover:shadow-yellow-500  transition-shadow duration-200 ease-in-out"
        >
          <h4 className="text-3xl font-bold">
            Sign up and Share your Thoughts!
          </h4>
          <hr className="py-3 mt-2" />

          {imagesAssets ? (
            <div className="flex justify-center space-x-3 items-center h-44 w-full mb-10">
              <img
                src={imagesAssets}
                alt="uploaded_image"
                className="h-40 w-40 object-cover rounded-full border shadow"
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
            <span className="text-gray-700">Full Name</span>
            <input
              {...register('name', { required: true })}
              name="name"
              type="text"
              placeholder="Enter your full name"
              className="shadow border rounded form-input mt-1  block w-full py-2 px-3  outline-none ring-yellow-500 focus:ring-1"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Email</span>
            <input
              {...register('email', { required: true })}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="shadow border rounded form-input mt-1  block w-full py-2 px-3  outline-none ring-yellow-500 focus:ring-1"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Bio</span>
            <textarea
              {...register('bio', { required: true })}
              placeholder="Write your Bio!"
              rows={8}
              className="shadow border rounded form-textarea mt-1  block w-full py-2 px-3  outline-none ring-yellow-500 focus:ring-1"
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
            {errors.name && (
              <span className="text-red-500">- The Name Field is required</span>
            )}
            {errors.email && (
              <span className="text-red-500">
                - The Email Field is required
              </span>
            )}
          </div>

          <input
            type="submit"
            value="Register"
            className="bg-yellow-500 text-white font-bold w-full mx-auto py-2 px-3 rounded cursor-pointer hover:bg-yellow-400 focus:shadow  focus:outline-none transition-colors duration-200 ease-in-out"
          />
        </form>
      )}
    </>
  );
};

export default SignUp;
