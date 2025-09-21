import { Fetcher } from "@/lib/fetcher";

export async function register({ email, password, password_confirmation }) {
  // Get CSRF cookie
  await Fetcher.csrf();

  // Register
  return Fetcher.fetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, password_confirmation }),
  });
}

export async function login({ email, password }) {
  // Get CSRF cookie
  await Fetcher.csrf();

  // Login
  return Fetcher.fetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
