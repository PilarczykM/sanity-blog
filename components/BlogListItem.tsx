import Image from "next/image";
import urlFor from "../lib/urlFor";
import { Post } from "../typings";

interface Props {
  post: Post;
}

function BlogListItem({ post }: Props) {
  return (
    <div className="flex flex-col cursor-pointer group">
      <div className="relative w-full h-80 drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out">
        <Image
          className="object-cover object-left lg:object-center"
          src={urlFor(post.mainImage).url()}
          alt={post.author.name}
          fill
        />
        <div className="absolute bottom-0 w-full bg-opacity-20 bg-black backdrop-blur-lg rounded drop-shadow-lg text-white p-5 flex justify-between">
          <div>
            <p className="font-bold">{post.title}</p>
            <p>
              {new Date(post._createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-2 items-center">
            {post.categories.map((category) => (
              <div
                key={category._id}
                className="bg-[#F7AB0A] text-center to-black px-3 py-1 rounded-full text-sm font-semibold"
              >
                <p>{category.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5 flex-1">
        <p className="underline text-lg font-bold">{post.title}</p>
        <p className="line-clamp-2 text-gray-500">{post.description}</p>
      </div>
      <p>Read Posts</p>
    </div>
  );
}

export default BlogListItem;
