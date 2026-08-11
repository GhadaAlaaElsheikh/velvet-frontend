const API_URL = "https://velvet-backend-production.up.railway.app";

export async function getProducts() {
  const url = `${API_URL}/products?page=1&limit=100`;

  console.log("🔵 FETCH PRODUCTS:", url);

  try {
    const res = await fetch(url, {
      cache: "no-store",
    });

    console.log("🟢 PRODUCTS STATUS:", res.status);

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();

    console.log("🟢 PRODUCTS COUNT:", data.products?.length);

    return{
      ...data,
    products: data.products.map((product: any) => ({
      _id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      rating: product.rating,
      images: product.images,
      detailsImage:
        product.detailsImage || product.images?.[0] || "",
      category: product.category?.name || "",
      gender: product.gender,
      badge: product.badge,
      stock: product.stock,
      reviews: product.reviews || 0,
      burnType: product.burnType || "",
      sizes: product.sizes || [],
    }))
  }
  } catch (error) {
    console.error("❌ GET PRODUCTS ERROR:", error);
    throw error;
  }
}

export async function getProductById(id: string) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  const product = await res.json();

  return {
    _id: product._id,
    name: product.name,
    description: product.description,
    price: product.price,
    rating: product.rating,
    images: product.images,
    detailsImage:
      product.detailsImage || product.images?.[0] || "",
    category: product.category?.name || "",
    gender: product.gender,
    badge: product.badge,
    stock: product.stock,
    reviews: product.reviews || 0,
    burnType: product.burnType || "",
    sizes: product.sizes || [],
  };
}