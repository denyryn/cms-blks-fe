import Fetcher from "@/lib/fetcher";

export async function getProducts({ page = 1, perPage = 10 }) {
  return Fetcher.fetch(`/api/products?page=${page}&per_page=${perPage}`, {
    method: "GET",
  });
}

export async function getProduct(id) {
  return Fetcher.fetch(`/api/products/${id}`, {
    method: "GET",
  });
}

export async function createProduct({
  category_id,
  name,
  description,
  image_url,
  price,
}) {
  // Get CSRF cookie
  await Fetcher.csrf();
  return Fetcher.fetch("/api/admin/products", {
    method: "POST",
    body: JSON.stringify({ category_id, name, description, image_url, price }),
  });
}

export async function updateProduct({
  id,
  category_id,
  name,
  description,
  image_url,
  price,
}) {
  // Get CSRF cookie
  await Fetcher.csrf();
  return Fetcher.fetch(`/api/admin/products/${id}`, {
    method: "PUT",
    body: JSON.stringify({ category_id, name, description, image_url, price }),
  });
}

export async function deleteProduct(id) {
  return Fetcher.fetch(`/api/admin/products/${id}`, {
    method: "DELETE",
  });
}
