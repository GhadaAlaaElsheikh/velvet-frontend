const BASE_URL = "http://localhost:3000";

export async function getProducts(query = "") {
  const res = await fetch(
    `${BASE_URL}/products${query}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}