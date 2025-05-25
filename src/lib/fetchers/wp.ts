import { REVALIDATE_LIMIT } from "@/contents";
import { Post } from "../types";

// 記事一覧取得
export const getPosts = async () => {
  const res = await fetch(
    `${process.env.END_POINT}`,
    {
      next: { revalidate: REVALIDATE_LIMIT },
    }
  );

  if (!res.ok) {
    throw new Error("データ取得に失敗しました。");
  }

  return res.json();
};


// 個別記事取得
export const getPostDetail = async (id: string): Promise<Post | null> => {
  const res = await fetch(
    `${process.env.END_POINT}/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("データ取得に失敗しました。");
  }

  return res.json();
}