import { proxyDjangoRequest } from "@/lib/django-proxy";

export async function POST(request) {
  return proxyDjangoRequest("/api/instructor/assessment-results/practical/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(await request.json()),
  });
}

export const PATCH = POST;
