import { apiFetch } from "..";
import { UpdateUser, 
    UpdateEmailParams, 
    UpdatePasswordParams, 
    User, 
    LoginParams,
    VerificationParams,
    ResetPasswordParams,
    SignupParams
} from "./models";

const BASE_END_POINT = "users";

export async function getUser(userId: string) {
  return await apiFetch<User>({
    method: "GET",
    endpoint: `${BASE_END_POINT}/${userId}`,
  });
}

export async function updateUser(userId: string, data: UpdateUser) {
  return await apiFetch<User>({
    method: "PUT",
    endpoint: `${BASE_END_POINT}/${userId}`,
    payload: data,
  });
}

export async function updateEmail(data: UpdateEmailParams) {
  return await apiFetch<User>({
    method: "PUT",
    endpoint: `${BASE_END_POINT}/email`,
    payload: data,
  });
}

export async function updatePassword(token:string,data: UpdatePasswordParams) {
  return await apiFetch<User>({
    method: "PUT",
    endpoint: `${BASE_END_POINT}/password?token=${token}`,
    payload: data,
  });
}

export async function sendPasswordResetCode(data: ResetPasswordParams) {
  return await apiFetch<User>({
    method: "POST",
    endpoint: `${BASE_END_POINT}/password/reset`,
    payload: data,
  });
}

export async function login(data: LoginParams) {
  return await apiFetch<{ token: string }>({
    method: "POST",
    endpoint: `${BASE_END_POINT}/login`,
    payload: data,
  });
}

export async function sendVerification(data: VerificationParams) {
  return await apiFetch<User>({
    method: "POST",
    endpoint: `${BASE_END_POINT}/send-verification`,
    payload: data,
  });
}

export async function seachUsers(name: string) {
  return await apiFetch<User>({
    method: "GET",
    endpoint: `${BASE_END_POINT}/search?name=${name}`,
  });
}

export async function signup(data: SignupParams) {
  return await apiFetch<{ token: string }>({
    method: "POST",
    endpoint: `${BASE_END_POINT}/signup`,
    payload: data,
  });
}

export async function verifyUser(token: string) {
  return await apiFetch<User>({
    method: "POST",
    endpoint: `${BASE_END_POINT}/verify?token=${token}`,
  });
}

export async function getUserByEmail(email: string) {
  return await apiFetch<User>({
    method: "GET",
    endpoint: `${BASE_END_POINT}/email?email=${email}`,
  });
}