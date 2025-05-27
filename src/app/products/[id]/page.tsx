import ProductDetail from "@/components/ui/ProductDetail";
import { api } from "@/lib/woocommerce";

type Params = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: Params) {
  const _params = await params;
  const id = _params.id;

  try {
    const { data: product } = await api.get(`products/${id}`);
    return <ProductDetail product={product} />;
  } catch (err) {
    console.error(err);
    return <div>商品が見つかりません</div>;
  }
}
