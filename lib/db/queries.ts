import sql from "./client";

// Function to add a comment
export async function addComment(comment: string) {
    return await sql`INSERT INTO comments (comment) VALUES (${comment})`;
}

// Function to fetch all comments
export async function getComments() {
    return await sql`SELECT * FROM comments ORDER BY created_at DESC`;
}
