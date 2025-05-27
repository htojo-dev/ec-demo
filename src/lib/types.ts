export type Post = {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  slug: string
  date: string
}

export type Product = {
  id: number;
  name: string;
  price: string;
  description: string;
  images: { src: string }[];
};