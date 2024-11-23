import { apiFetch } from "..";
import { ProductResponse, DetailedProductResponse, ProductRequest, Products } from "./models";

const BASE_END_POINT = "products";

export async function getProduct(productId: string) {
  return await apiFetch<DetailedProductResponse>({
    method: "GET",
    endpoint: `${BASE_END_POINT}?id=${productId}`,
    headers: { accept: "application/json" },
  });
}

export async function createProduct(data: ProductRequest) {
  return await apiFetch<ProductResponse>({
    method: "POST",
    endpoint: BASE_END_POINT,
    payload: data,
    headers: { "Content-Type": "application/json", accept: "application/json" },
  });
}

export async function getCollaborativeRecommendation() {
  return await apiFetch<Products>({
    method: "GET",
    endpoint: `${BASE_END_POINT}/collaborative`,
    headers: { accept: "application/json" },
  });
}

export async function getContentBasedRecommendation(imageUrl: string) {
  return await apiFetch<Products>({
    method: "GET",
    endpoint: `${BASE_END_POINT}/content-based?image_url=${imageUrl}`,
    headers: { accept: "application/json" },
  });
}

export async function getRandomProducts() {
  return await apiFetch<Products>({
    method: "GET",
    endpoint: `${BASE_END_POINT}/random`,
    headers: { accept: "application/json" },
  });
}

export async function getRandomPaginatedProducts(count: string, page: string) {
  return await apiFetch<Products>({
    method: "GET",
    endpoint: `${BASE_END_POINT}/random/paginated?count=${count}&page=${page}`,
    headers: { accept: "application/json" },
  });
}

export async function getRatedProducts(userId: string) {
  return await apiFetch<Products>({
    method: "GET",
    endpoint: `${BASE_END_POINT}/rated?user_id=${userId}`,
    headers: { accept: "application/json" },
  });
}

export async function getProductsByStatus(status: string, limit: string, page: string) {
  return await apiFetch<Products>({
    method: "GET",
    endpoint: `${BASE_END_POINT}/status?status=${status}&limit=${limit}&page=${page}`,
    headers: { accept: "application/json" },
  });
}

export async function getProductsOfUser(userId: string, count: string, page: string) {
  return await apiFetch<Products>({
    method: "GET",
    endpoint: `${BASE_END_POINT}/user?user_id=${userId}&count=${count}&page=${page}`,
    headers: { accept: "application/json" },
  });
}
