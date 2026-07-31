import { proxyDjangoRequest } from "@/lib/django-proxy";

export async function GET(_request, { params }) {
  const { student_id } = await params;
  return proxyDjangoRequest(`/api/my-children-assessments/${student_id}/`);
}
