const API_URL = "http://localhost:3000";

export async function getCategories() {
const res = await fetch(`${API_URL}/categories`, {
cache: "no-store",
});

if (!res.ok) {
throw new Error("Failed to fetch categories");
}

return res.json();
}
