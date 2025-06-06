export function getAuthHeaders(token: string | null) {
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}
