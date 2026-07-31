import { proxyDjangoRequest } from "@/lib/django-proxy";

export async function POST(request, { params }) {
  const { student_id, id } = await params;
  return proxyDjangoRequest(`/api/my-children-assessments/${student_id}/${id}/submit/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(await request.json()),
  });
}
