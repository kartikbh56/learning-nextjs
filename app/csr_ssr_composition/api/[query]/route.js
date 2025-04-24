export async function GET(request, { params }) {
  const { query } = await params;
  const res = await fetch(`https://api.github.com/users/${query}`);
  const data = await res.json();
  return Response.json({ data });
}
