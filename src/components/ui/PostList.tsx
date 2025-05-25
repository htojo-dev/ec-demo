import { Post } from "@/lib/types";
import Link from "next/link";

type Props = {
  posts: Post[];
};

const PostList = ({ posts }: Props) => {
  return (
    <ul className="space-y-4">
      {posts.map((post: Post) => (
        <li key={post.id} className="border p-4 rounded shadow">
          <Link href={`/blog/${post.id}`}>
            <h2
              className="text-xl font-semibold"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            ></h2>
            <p className="text-gray-600">{post.date}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
