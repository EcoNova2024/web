"use server";

import { createSession } from "@/lib/session";
import { login } from "@/lib/api/user"
import { LoginParams } from "@/lib/api/user/models";

export async function logIn(params: LoginParams) {
  try {
    const loginInResponse = await login(params);
    if (loginInResponse.error) {
      return loginInResponse.error.message;
    }
    if(loginInResponse.body)
    await createSession(loginInResponse.body.token);
    return loginInResponse;
  } catch (error) {
    return error;
  }
}
