type APIParams = {
  method: string // HTTP method (GET, POST, etc.)
  endpoint: string // API endpoint
  payload?: Record<string, unknown> | FormData // Request payload (optional)
  contentType?: "application/json" | "multipart/form-data" | "" // Content type
  cache?: RequestCache // Cache strategy (default: force-cache)
  tags?: string[] // Additional options for future integrations (optional)
  headers?: HeadersInit // Optional custom headers
}

type APIResponse<T> = {
  body: T | null // Allow null as a valid value for body
  message?: string // Optional message for UI use
  error?: { code: number; message: string } // Error information
}

export async function apiFetch<T>({
  method,
  endpoint,
  payload,
  contentType = "application/json", // Default content type
  cache = "force-cache",
  tags,
  headers = {},
}: APIParams): Promise<APIResponse<T>> {
  try {
    // Prepare headers (internal)
    const defaultHeaders = new Headers({
      accept: "application/json", // Default accept header
      ...headers, // Allow custom headers to be passed
    })

    // Add Content-Type to headers if specified
    if (contentType) {
      defaultHeaders.set("Content-Type", contentType) // Add Content-Type if specified
    }

    // Prepare request options
    const option: RequestInit = {
      method,
      headers: defaultHeaders, // Add headers to internal RequestInit
      cache,
      ...(tags && { next: { tags } }), // Add optional tags for caching or tracking
    }

    // Add payload to non-GET requests
    if (payload && method !== "GET") {
      option.body =
        contentType === "application/json"
          ? JSON.stringify(payload) // Convert JSON payload to string
          : (payload as FormData) // Use FormData directly
    }

    console.debug("Request options:", option)

    // Make the API request
    const response = await fetch(`http://13.60.12.193:3000/${endpoint}`, option)
    // Handle the response (inline)
    let body: any = null

    // Check for JSON content type (supports charset variations)
    const responseContentType = response.headers.get("content-type") // Renamed to avoid conflict
    if (responseContentType?.includes("application/json")) {
      try {
        body = await response.json()
      } catch (error) {
        console.error("Failed to parse JSON:", error)
        body = null
      }
    } else {
      // Handle non-JSON responses
      body = await response.text()
    }

    // Handle HTTP errors (non-2xx status codes)
    if (!response.ok) {
      console.error("API error:", response.status, response.statusText)
      console.debug("Response Body:", body)

      const errorMessage = `Error occurred: ${response.statusText}`
      return {
        body: null,
        error: {
          code: response.status,
          message: errorMessage,
        },
      }
    }

    // Handle the response body and return the formatted data
    const responseMessage = body?.message || "Success"
    const isError = body?.message && body.message !== 0

    return {
      body: body?.data || body, // Default to body if no 'data' field
      ...(isError && {
        error: { code: body?.message || -1, message: responseMessage },
      }),
      // If there's no error, use the success message
      ...(isError || { message: responseMessage }),
    }
  } catch (error) {
    // Handle request errors
    console.error("Request error:", error)
    return {
      body: null,
      error: {
        code: -1,
        message:
          "Şu anda işleminizi gerçekleştiremiyoruz. Lütfen sonra tekrar deneyiniz veya destek ekimizle iletişime geçin. (CODE: 1001)",
      },
    }
  }
}
