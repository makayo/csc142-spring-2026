import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPosts, createPost, updatePost, patchPost, deletePost } from "../api/posts";

export const usePosts = (userId) =>
    useQuery({
        queryKey: ["posts", userId],
        queryFn: () => fetchPosts(userId),
        staleTime: 1000 * 60 * 2,
    });

export const useCreatePost = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: createPost,
        onSuccess: (newPost) => {
            qc.setQueryData(["posts", undefined], (old) =>
                old ? [newPost, ...old] : [newPost]
            );
        },
    });
};

export const useUpdatePost = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: updatePost,
        onSuccess: (updated) => {
            qc.setQueryData(["posts", undefined], (old) =>
                old ? old.map((p) => (p.id === updated.id ? updated : p)) : [updated]
            );
        },
    });
};

export const usePatchPost = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: patchPost,
        onSuccess: (patched) => {
            qc.setQueryData(["posts", undefined], (old) =>
                old ? old.map((p) => p.id === patched.id ? { ...p, title: patched.title } : p) : old
            );
        },
    });
};

export const useDeletePost = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: deletePost,
        onMutate: async (id) => {
            await qc.cancelQueries({ queryKey: ["posts"] });
            const previous = qc.getQueryData(["posts", undefined]);
            qc.setQueryData(["posts", undefined], (old) =>
                old ? old.filter((p) => p.id !== id) : old
            );
            return { previous };
        },
        onError: (_err, _id, ctx) => {
            if (ctx?.previous) qc.setQueryData(["posts", undefined], ctx.previous);
        },
    });
};