import Image from "next/image";
import urlFor from "../lib/urlFor";
import { Post } from "../typings";
import defaultAvatar from '../public/user.png'

interface Props {
  post: Post;
}

function PostBanner({ post }: Props) {
  return (
    <section className="space-y-2 border border-[#F7AB0A] text-white">
      <div className="relative min-h-[18rem] flex flex-col md:flex-row justify-between">
        <div className="absolute top-0 w-full h-full opacity-10 blur-sm">
          <Image
            className="object-cover object-center mx-auto"
            src={urlFor(post.mainImage).url()}
            alt={post.author.name}
            fill
          />
        </div>
        <section className="p-5 bg-[#F7AB0A] w-full">
          <div className="flex flex-col md:flex-row justify-between gap-y-5">
            <div>
              <h1 className="text-4xl font-extrabold">{post.title}</h1>
              <p>
                {new Date(post._createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="w-64 flex flex-col space-y-2">
              <div className="flex justify-start items-center space-x-2">
                <Image
                  className="rounded-full"
                  src={
                    post.author.image
                      ? urlFor(post.author.image).url()
                      : defaultAvatar
                  }
                  alt={post.author.name}
                  height={40}
                  width={40}
                />
                <h3 className="text-lg font-bold">{post.author.name}</h3>
              </div>
              <div>{post.author.bio[0].children[0].text}</div>
            </div>
          </div>
          <div>
            <h2 className="italic pt-10">
              {post.description ? post.description : "No description"}
            </h2>
            <div className="flex items-center justify-end mt-auto space-x-2">
              {post.categories.map((category) => (
                <p
                  key={category._id}
                  className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4"
                >
                  {category.title}
                </p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default PostBanner;
