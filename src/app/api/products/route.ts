import { api } from "@/lib/woocommerce";

export async function GET() {
  try {
    const res = await api.get("products");
    const data = res.data;
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response("Failed to fetch products", { status: 500 });
  }
}