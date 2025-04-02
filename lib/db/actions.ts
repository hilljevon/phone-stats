"use server";

import { addComment } from "./queries";

export async function createComment(formData: FormData) {
    const comment = formData.get("comment") as string;
    if (!comment) throw new Error("Comment cannot be empty");

    await addComment(comment);
}
