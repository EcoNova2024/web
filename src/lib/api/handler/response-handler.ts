import { getErrorMessage } from "./error-message";

const handleResponse = async (response: Response) => {
  let body = null;
  if (response.headers.get("content-type") == "application/json") {
    body = await response.json();
  } else {
    // this block for text/plain etc.
    body = await response.text();
  }

  const responseMessage = getErrorMessage(body.message, "tr");
  const data = {
    body: body.data,
    ...(body.message == 0 && { message: responseMessage }),
    ...(body.message != 0 && {
      error: { code: body.message, message: responseMessage },
    }),
  };

  return data;
};

export default handleResponse;
