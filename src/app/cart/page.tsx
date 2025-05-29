"use client";

import { useCartStore } from "@/lib/store/cartStore";
import Image from "next/image";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  console.log("カートページの中身", items); // ← ここを確認
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div>
      <h1>カート</h1>

      {items.length === 0 ? (
        <p>カートは空です。</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {/* <img src={item.image} alt="" /> */}
                <Image
                  src={item.image}
                  alt={item.name}
                  width={500}
                  height={300}
                  priority={true}
                />
                <div>
                  <h2>{item.name}</h2>
                  <p>¥{item.price.toLocaleString()}</p>
                  <p>数量: {item.quantity}</p>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  <button
                    onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id)}
                  >-</button>
                  <button onClick={() => removeItem(item.id)}>削除</button>
                </div>
              </li>
            ))}
          </ul>

          <div>
            <p>合計金額: ¥{totalPrice.toLocaleString()}</p>
            <button onClick={clearCart}>カートを空にする</button>
          </div>
        </>
      )}
    </div>
  );
}
