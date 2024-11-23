import { apiFetch } from "..";
import { Comment, Comments, AddComment } from "./models";

const BASE_END_POINT = "comments";

export async function createComment(data: AddComment) {
  return await apiFetch<Comment>({
    method: "POST",
    endpoint: BASE_END_POINT,
    payload: data,
  });
}

export async function getCommentsByProduct(productId: string) {
  return await apiFetch<Comments>({
    method: "GET",
    endpoint: `${BASE_END_POINT}/product/${productId}`,
  });
}

export async function deleteComment(commentId: string) {
  return await apiFetch<void>({
    method: "DELETE",
    endpoint: `${BASE_END_POINT}/${commentId}`,
  });
}
