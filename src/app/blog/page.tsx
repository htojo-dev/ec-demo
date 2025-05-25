import { getPosts } from "@/lib/fetchers/wp";
import PostList from "../../components/ui/PostList";

async function BlogList() {
  const posts = await getPosts();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">ブログ一覧</h1>
      <PostList posts={posts} />
    </div>
  );
}

export default BlogList;
