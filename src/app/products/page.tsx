import Image from "next/image";
import { Product } from "@/lib/types";
import Link from "next/link";


const Products = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });

  const products = await res.json();
  // console.log(products);

  return (
    <div>
      {products.map((p: Product) => (
        <div key={p.id}>
          <Image
            src={p.images[0].src}
            alt={p.name}
            width={500} // 適切な幅を指定してください
            height={300} // 適切な高さを指定してください
            // className="w-full h-auto"
            priority={true} // すぐ表示したいなら true に
          />
          <h2>{p.name}</h2>
          <p>{p.price}円</p>
          <Link href={`/products/${p.id}`}>詳細へ</Link>
        </div>
      ))}
    </div>
  );
};

export default Products;
