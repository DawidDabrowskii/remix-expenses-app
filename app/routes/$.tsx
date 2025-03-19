export function loader({ params }: { params: { id: string } }) {
  console.log("params", params);

  throw new Response("Not Found", { status: 404 });
}
