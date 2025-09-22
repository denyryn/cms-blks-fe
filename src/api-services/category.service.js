import Fetcher from "@/lib/fetcher";

export async function getCategories({}) {
  return Fetcher.fetch("/categories", {
    method: "GET",
  });
}

export async function getCategory(id) {
  return Fetcher.fetch(`/categories/${id}`, {
    method: "GET",
  });
}

export async function getProductsByCategory(id) {
  return Fetcher.fetch(`/categories/${id}/products`, {
    method: "GET",
  });
}

export async function createCategory({ name }) {
  // Get CSRF cookie
  await Fetcher.csrf();
  return Fetcher.fetch("/admin/categories", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}

export async function updateCategory({ id, name }) {
  // Get CSRF cookie
  await Fetcher.csrf();
  return Fetcher.fetch(`/admin/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name }),
  });
}

export async function deleteCategory(id) {
  return Fetcher.fetch(`/admin/categories/${id}`, {
    method: "DELETE",
  });
}
