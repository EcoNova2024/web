import { apiFetch } from "..";
import { Rating, AddRating } from "./models";

const BASE_END_POINT = "ratings";

export async function createRating(data: AddRating) {
  return await apiFetch<Rating>({
    method: "POST",
    endpoint: BASE_END_POINT,
    payload: data,
  });
}

export async function getAverageAndTotalRatingByProductId(productId: string) {
  return await apiFetch<Rating[]>({
    method: "GET",
    endpoint: `${BASE_END_POINT}/${productId}/average`,
  });
}

export async function getRatingsByUser(userId: string) {
  return await apiFetch<Rating[]>({
    method: "GET",
    endpoint: `${BASE_END_POINT}/user/${userId}`,
  });
}

export async function deleteRating(ratingId: string) {
  return await apiFetch<void>({
    method: "DELETE",
    endpoint: `${BASE_END_POINT}/${ratingId}`,
  });
}
