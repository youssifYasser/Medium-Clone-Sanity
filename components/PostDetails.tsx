import { urlFor } from '../sanity';
import { Post } from '../typings';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

interface FormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}
interface Props {
  post: Post;
}
const PostDetails = ({ post }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [creationDate, setCreationDate] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    setCreationDate(new Date(post._createdAt).toLocaleString());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => {
        setSubmitted(false);
        console.log(err);
      });
  };

  return (
    <main>
      <div className="relative h-80 w-full">
        <Image
          fill
          src={post.mainImage ? urlFor(post.mainImage).url() : post.postImage}
          alt="post thumbnail"
          className="object-cover"
        />
      </div>
      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl font-semibold mt-10 mb-3">{post.title}</h1>
        <h2 className="text-lg font-light text-gray-700 mb-3">
          {post.description}
        </h2>

        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10">
            <Image
              fill
              src={
                post.author.image
                  ? urlFor(post.author.image).url()
                  : post.author.profileImage
              }
              alt="author profile picture"
              className=" rounded-full object-cover"
            />
          </div>
          <p className="text-sm font-extralight">
            Blog Post By <span className="font-bold">{post.author.name}</span> -
            Published At {creationDate}
          </p>
        </div>

        <div className="mt-10">
          <p className="whitespace-pre-line text-xl">{post.body}</p>
        </div>
      </article>

      <hr className="max-w-xl my-5 mx-auto border border-yellow-500" />

      {session && (
        <div>
          {submitted ? (
            <div className="flex flex-col justify-center bg-yellow-500 max-w-2xl mx-auto py-10 px-5  my-10 text-white">
              <h3 className="text-3xl font-bold">
                Thank you for submitting your Comment!
              </h3>
              <p>Once it has been approved, it will appear below</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
            >
              <h3 className="text-yellow-500 text-sm">Enjoyed this article?</h3>
              <h4 className="text-3xl font-bold">Leave a comment below!</h4>
              <hr className="py-3 mt-2" />

              <input
                {...register('_id')}
                type="hidden"
                name="_id"
                value={post._id}
              />
              <input
                {...register('name')}
                type="hidden"
                name="name"
                value={session.user.name}
              />
              <input
                {...register('email')}
                type="hidden"
                name="email"
                value={session.user.email}
              />

              <label className="block mb-5">
                <span className="text-gray-700">Comment</span>
                <textarea
                  {...register('comment', { required: true })}
                  placeholder="Write your comment"
                  rows={8}
                  className="shadow border rounded form-textarea mt-1  block w-full py-2 px-3  outline-none ring-yellow-500 focus:ring-1"
                />
              </label>

              <div className="flex flex-col p-5">
                {errors.comment && (
                  <span className="text-red-500">
                    - The Comment Field is required
                  </span>
                )}
              </div>

              <input
                type="submit"
                value="Submit"
                className="bg-yellow-500 text-white font-bold w-full py-2 px-3 rounded cursor-pointer hover:bg-yellow-400 focus:shadow  focus:outline-none"
              />
            </form>
          )}
        </div>
      )}

      {/* Comments */}
      <div className="flex flex-col space-y-2 shadow shadow-yellow-400 p-10 max-w-2xl mx-auto my-10">
        <h3 className="text-4xl font-semibold">Comments</h3>
        <hr className="pb-2" />
        {post.comments.map((comment) => (
          <div key={comment._id}>
            <p className="whitespace-pre-line">
              <span className="text-yellow-500">{comment.name}: </span>
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default PostDetails;
