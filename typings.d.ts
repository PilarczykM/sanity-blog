import { Image } from "sanity";

type Base = {
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAd: string;
}

interface Post extends Base {
    author: Author;
    body: Block[];
    categories: Category[];
    mainImage: Imagee;
    slug: Slug;
    title: string;
    description: string;
}

interface Author extends Base {
    bio: Block[];
    image: Image;
    name: string;
    slub: Slug;
}

interface Image {
    _type: "image";
    asset: Reference;
}

interface Reference {
    _ref: string;
    _type: "reference"
}

interface Slug {
    _type: 'slug'
    current: string;
}

interface Block {
    _key: string;
    _type: "block";
    children: Span[];
    markDefers: any[];
    style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote"
}

interface Category extends Base {
    description: string;
    title: string;
}

interface MainImage {
    _type: "image";
    assets: Reference;
}

interface Title {
    _type: "string";
    current: string;
}