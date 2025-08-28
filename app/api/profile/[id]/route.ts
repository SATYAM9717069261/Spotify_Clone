import { type NextRequest } from "next/server";
export function GET(req: NextRequest, { params }: { params: { id: string } }) {
  console.log(" DEtails => ", req, params);
  return Response.json({ message: "Hello, Next.js!" + params.id });
}
