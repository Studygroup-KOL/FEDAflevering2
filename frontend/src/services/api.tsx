const API_BASE = "http://localhost:8080/api";

function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };
}

export async function get(path: string) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: getHeaders(),
  });
  return res.json();
}

export async function post(path: string, data: any) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function put(path: string, data: any) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function del(path: string) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return res.json();
}

export function parseJwt(token: string): any {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}
