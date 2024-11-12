import "server-only";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(process.env.JWT_SECRET);

const cookie = {
  name: "session",
  options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
  duration: 3 * 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("3day")
    .sign(key);
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getJWTPayload() {
  const _cookie = cookies().get(cookie?.name)?.value;
  if (!_cookie) return false;
  const payload = await decrypt(_cookie);
  return payload
}

export async function createSession(token:string) {
  if (!token){
    throw new Error("There must be a TOKEN")
  }
  const expires = new Date(Date.now() + cookie.duration);
  cookies().set({
    name: cookie.name,
    value: token,
    httpOnly: true,
    // secure: true, //TODO: activate when activate SSL(https)
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

export async function updateSession() {
  const session = cookies().get(cookie?.name)?.value;
  if (!session) redirect("/login");

  const payload = await decrypt(session);

  if (!payload) {
    return null;
  }

  const expires = new Date(Date.now() + cookie.duration);
  cookies().set(cookie.name, session, { ...cookie, expires: expires });
}

export async function verifyAndGetSession() {
  const _cookie = cookies().get(cookie?.name)?.value;
  if (!_cookie) return false;
  const payload = await decrypt(_cookie);
  if (!payload?.user_id && !payload?.user_role_id) return false
  return _cookie;
}

export async function deleteSession() {
  cookies().delete(cookie.name);
}
