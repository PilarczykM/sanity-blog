import { groq } from "next-sanity";
import { client } from "../../../../lib/sanity.client";
import { Post } from "../../../../typings";

import PostBanner from "../../../../components/PostBanner";
import { PortableText } from "@portabletext/react"
import { RichTextComponents } from "../../../../components/RichTextComponents";

interface Props {
  params: {
    slug: string;
  };
}

export const revalidate = 60 // Revalidate pages every 10 min

// Create SSG pages passing slugs to NextJS passing it to params. 
export async function generateStaticParams() {
    const query = groq`
      *[_type=='post']
      {
        slug
      }
    `;

  const posts: Post[] = await client.fetch(query);
  const slugRoutes = posts.map(post => post.slug.current)

  return slugRoutes.map(slug => ({
    slug: slug
  }))
}

async function Post({ params: { slug } }: Props) {
  const query = groq`
    *[_type=='post' && slug.current == $slug][0]
    {
        ...,
        author->,
        categories[]->
    }
    `;

  const post: Post = await client.fetch(query, { slug });

  return (
    <article className="px-10 pb-28">
      <PostBanner post={post} />
      <PortableText value={post.body} components={RichTextComponents} />
    </article>
  );
}

export default Post;
