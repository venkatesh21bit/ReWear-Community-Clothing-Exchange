// Simple API utility for authentication endpoints
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://rewear-community-clothing-exchange-production.up.railway.app/api";

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error((await res.json()).detail || "Login failed");
  return res.json();
}

export async function signupUser(data: { firstName: string; lastName: string; email: string; password: string; confirmPassword?: string }) {
  const res = await fetch(`${API_BASE_URL}/auth/signup/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      password_confirm: data.confirmPassword ?? data.password // send confirm password if available
    })
  });
  let errorText = "Signup failed";
  let json;
  try {
    json = await res.json();
  } catch (e) {
    // If response is not JSON (e.g. HTML error page), throw a generic error
    throw new Error(errorText + ": Invalid server response");
  }
  if (!res.ok) throw new Error(json.detail || json.message || JSON.stringify(json.errors) || errorText);
  return json;
}
