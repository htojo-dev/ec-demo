"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";

export default function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log(`商品ID: ${product.id}を${quantity}個追加`);
  }

  try {
    return (
      <div>
        <div>
          <h1>{product.name}</h1>
          <Image
            src={product.images[0].src}
            alt={product.name}
            width={500} // 適切な幅を指定してください
            height={300} // 適切な高さを指定してください
            priority={true} // すぐ表示したいなら true に
          />

          <p dangerouslySetInnerHTML={{ __html: product.description }}></p>

          <div className="mt-4 text-xl">
            {product.sale_price ? (
              <>
                <span className="line-through text-gray-500 mr-2">
                  ¥{Number(product.regular_price).toLocaleString()}
                </span>
                <span className="text-red-600 font-bold">
                  ¥{Number(product.sale_price).toLocaleString()}
                </span>
              </>
            ) : (
              <span className="font-bold">
                ¥{Number(product.regular_price).toLocaleString()}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="">数量:</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <button onClick={handleAddToCart}>カートに追加</button>
        </div>

        <Link href="/products">一覧へ戻る</Link>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>商品が見つかりませんでした。</div>;
  }
}
