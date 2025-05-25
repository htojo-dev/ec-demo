import { getPostDetail } from "@/lib/fetchers/wp";

const page = async ({ params }: { params: { id: string } }) => {
  const _params = await params
  const post = await getPostDetail(_params.id);

  if (!post) {
    throw new Error("記事が存在しません");
  }

  return (
    <div className="p-6">
      <h1
        className="text-3xl font-bold mb-4"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      <p className="text-gray-500 mb-4">
        {new Date(post.date).toLocaleDateString()}
      </p>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </div>
  );
};

export default page;
