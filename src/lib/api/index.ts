// API İLE YAPILACAK HTTP REQUEST TRAFİĞİ YÖNETİLİR
import { verifyAndGetSession } from "../session";
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
  map(arg0: (item: any) => { id: any; name: any; price: any; isNew: any; isDamaged: any; image: any; }): import("./products/models").ProductResponse[] | PromiseLike<import("./products/models").ProductResponse[]>;
  body: T;
  message?: string;
  error?: { code: number; message: string };
};

export async function apiFetch<T>({
  // TODO: Response Handler yazılacak
  method,
  endpoint,
  payload,
  contentType = "application/json",
  cache = "force-cache",
  tags,
}: APIParams): Promise<APIResponse<T>> {
  try {
    const session = await verifyAndGetSession();

    const headers: HeadersInit = {
      ...(contentType && { "Content-Type": contentType }),
      Authorization: session ? `Bearer ${session}` : "",
    };

    const options: RequestInit = {
      method,
      headers,
      cache,
      ...(tags && { next: { tags } }),
    };

    if (payload) {
      let body = null;
      if (contentType == "application/json") {
        body = JSON.stringify(payload);
      } else {
        body = payload as FormData;
      }
      options.body = body;
    }

    console.debug(options);
    const response = await fetch(`${process.env.API_URL}/${endpoint}`, options);
    const data = await handleResponse(response);
    console.debug(
      "Response Data => " +
        JSON.stringify({ method, url: response.url, ...data }, null, 2)
    );
    return data;
  } catch (error) {
    // Client tarafından request işlemi yapılırken gerçekleşen hatalar

    console.debug("Response error: " + error);
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
