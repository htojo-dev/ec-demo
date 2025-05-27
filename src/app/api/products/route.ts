import { NextResponse } from "next/server";
import OAuth from "oauth-1.0a";
import crypto from "crypto";

const siteUrl = process.env.WP_SITE_URL!;
const consumerKey = process.env.CONSUMER_KEY!;
const consumerSecret = process.env.CONSUMER_SECRET_KEY!;

const oauth = new OAuth({
  consumer: {
    key: consumerKey,
    secret: consumerSecret,
  },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return crypto.createHmac("sha1", key).update(base_string).digest("base64");
  },
});

export async function GET() {
  const url = `${siteUrl}/wp-json/wc/v3/products`;

  const reqData = {
    url,
    method: "GET",
  };

  const headers = oauth.toHeader(oauth.authorize(reqData)) as unknown as Record<
    string,
    string
  >;

  const res = await fetch(url, {
    method: "GET",
    headers,
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const error = await res.json();
    return NextResponse.json(error, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
