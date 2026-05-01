const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (userId) => {
    const url = userId ? `${BASE_URL}/posts?userId=${userId}` : `${BASE_URL}/posts`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
};

export const createPost = async (post) => {
    const res = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
    });
    if (!res.ok) throw new Error("Failed to create post");
    return res.json();
};

export const updatePost = async ({ id, title, body, userId }) => {
    const res = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, body, userId }),
    });
    if (!res.ok) throw new Error("Failed to update post");
    return res.json();
};

export const patchPost = async ({ id, title }) => {
    const res = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error("Failed to patch post");
    return res.json();
};

export const deletePost = async (id) => {
    const res = await fetch(`${BASE_URL}/posts/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete post");
    return res.json();
};