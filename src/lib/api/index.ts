// API İLE YAPILACAK HTTP REQUEST TRAFİĞİ YÖNETİLİR
import handleResponse from "./handler/response-handler";

type APIParams = {
  method: string;
  endpoint: string;
  payload?: Record<string, unknown> | FormData | undefined;
  contentType?: "application/json" | "multipart/form-data" | "";
  cache?: RequestCache;
  tags?: string[];
};

type APIResponse<T> = {
  body: T;
  message?: string;
  error?: { code: number; message: string };
};

export async function apiFetch<T>({
  method,
  endpoint,
  payload,
  contentType = "application/json",
  cache = "force-cache",
  tags,
}: APIParams): Promise<APIResponse<T>> {
  try {
    // No JWT or session token
    const headers: HeadersInit = {
      ...(contentType && { "Content-Type": contentType }),
    };

    const options: RequestInit = {
      method,
      headers,
      cache,
      ...(tags && { next: { tags } }),
    };

    if (payload) {
      let body = null;
      if (contentType === "application/json") {
        body = JSON.stringify(payload);
      } else {
        body = payload as FormData;
      }
      options.body = body;
    }

    console.debug("Request options:", options);
    const response = await fetch(`http://13.61.9.142:3000/${endpoint}`, options);
    const data = await handleResponse(response);
    console.debug(
      "Response Data => " +
        JSON.stringify({ method, url: response.url, ...data }, null, 2)
    );
    return data;
  } catch (error) {
    // Handle client-side request errors
    console.error("Request error:", error);
    return {
      body: {} as T,
      error: {
        code: -1,
        message:
          "Şu anda işleminizi gerçekleştiremiyoruz. Lütfen sonra tekrar deneyiniz veya destek ekimizle iletişime geçin. (CODE: 1001)",
      },
    };
  }
}
