import { addComment, getComments } from "@/lib/db/queries";
import { NextResponse } from "next/server";


export async function GET() {
    const comments = await getComments();
    return NextResponse.json(comments);
}

export async function POST(req: Request) {
    const { comment } = await req.json();
    if (!comment) return NextResponse.json({ error: "Comment is required" }, { status: 400 });

    await addComment(comment);
    return NextResponse.json({ message: "Comment added successfully" });
}
