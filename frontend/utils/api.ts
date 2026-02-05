export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

export async function fetchTenantInfo(hostname: string) {
  // In dev, we might need to mock or pass a header if we can't easily subdomaining
  // For now, let's assume we pass a header or the backend infers from Host
  const res = await fetch(`${API_URL}/api/tenant/`, {
    headers: {
      'X-Tenant-Host': hostname // We might need to handle this in backend if Host header isn't enough in Docker
    }
  });
  if (!res.ok) throw new Error('Failed to fetch tenant info');
  return res.json();
}

export async function fetchMenu(hostname: string) {
  const res = await fetch(`${API_URL}/api/menu/`, {
    headers: {
      'X-Tenant-Host': hostname
    }
  });
  if (!res.ok) throw new Error('Failed to fetch menu');
  return res.json();
}
